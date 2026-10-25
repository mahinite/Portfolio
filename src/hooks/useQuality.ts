import { useSyncExternalStore } from 'react';

export type QualityTier = 'full' | 'lite' | 'minimal';

export const HARDWARE_CONCURRENCY_THRESHOLD = 4;
export const DEVICE_MEMORY_THRESHOLD = 4;

export const PROBE_DELAY_MS = 1500;
export const PROBE_DURATION_MS = 1500;
export const PROBE_WARMUP_MS = 300;
export const FPS_MINIMAL_BELOW = 28;
export const FPS_LITE_BELOW = 45;

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const COARSE_POINTER_QUERY = '(hover: none) and (pointer: coarse)';

function readUrlOverride(): QualityTier | null {
  if (typeof window === 'undefined') return null;
  try {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('quality');
    if (q === 'full' || q === 'lite' || q === 'minimal') {
      return q;
    }
  } catch {
    // Ignore URL parsing errors
  }
  return null;
}

const urlOverride: QualityTier | null = readUrlOverride();

export function isLowPowerHardware(): boolean {
  if (typeof window === 'undefined') return false;
  if (typeof navigator !== 'undefined') {
    if (
      typeof navigator.hardwareConcurrency === 'number' &&
      navigator.hardwareConcurrency <= HARDWARE_CONCURRENCY_THRESHOLD
    ) {
      return true;
    }
    const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory;
    if (typeof mem === 'number' && mem <= DEVICE_MEMORY_THRESHOLD) {
      return true;
    }
  }
  return false;
}

export function isCoarsePointerMatch(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia(COARSE_POINTER_QUERY).matches;
}

export function getSpecTier(): QualityTier {
  if (isCoarsePointerMatch() || isLowPowerHardware()) {
    return 'lite';
  }
  return 'full';
}

function getPrefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

let isReducedMotion = getPrefersReducedMotion();
let probeDowngradeTier: 'lite' | 'minimal' | null = null;

function computeCurrentTier(): QualityTier {
  // 1. URL param override (highest priority)
  if (urlOverride !== null) {
    return urlOverride;
  }
  // 2. Reduced motion
  if (isReducedMotion) {
    return 'minimal';
  }
  // 3. Probe downgrade or spec tier
  const spec = getSpecTier();
  if (probeDowngradeTier === 'minimal') {
    return 'minimal';
  }
  if (probeDowngradeTier === 'lite' || spec === 'lite') {
    return 'lite';
  }
  return 'full';
}

type Listener = () => void;
const listeners = new Set<Listener>();

function notifyListeners() {
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

let currentTier: QualityTier = computeCurrentTier();

function syncDomQuality(tier: QualityTier) {
  if (typeof document !== 'undefined' && document.documentElement) {
    document.documentElement.dataset.quality = tier;
  }
}

// Initial sync
syncDomQuality(currentTier);

function setTier(newTier: QualityTier) {
  if (currentTier !== newTier) {
    currentTier = newTier;
    syncDomQuality(newTier);
    notifyListeners();
  }
}

function recomputeAndSetTier() {
  const next = computeCurrentTier();
  setTier(next);
}

function getSnapshot(): QualityTier {
  return currentTier;
}

function getServerSnapshot(): QualityTier {
  return 'full';
}

export function useQuality(): QualityTier {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

// Subscribe to reduced-motion changes
if (typeof window !== 'undefined' && window.matchMedia) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  const handleReducedMotionChange = (e: MediaQueryListEvent) => {
    isReducedMotion = e.matches;
    recomputeAndSetTier();
  };
  if (mql.addEventListener) {
    mql.addEventListener('change', handleReducedMotionChange);
  } else if (mql.addListener) {
    mql.addListener(handleReducedMotionChange);
  }
}

// FPS Probe (downgrade only)
let probeHasRunOrStarted = false;
let restartCount = 0;
const MAX_RESTARTS = 3;

function startProbe() {
  if (urlOverride !== null || currentTier === 'minimal') {
    return;
  }

  let rafId = 0;
  let probeStartTime = 0;
  let sampleStartTime: number | null = null;
  let sampleEndTime = 0;
  let frameCount = 0;

  const cleanup = () => {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }
    document.removeEventListener('visibilitychange', onVisibilityChange);
  };

  const restart = () => {
    cleanup();
    if (restartCount < MAX_RESTARTS) {
      restartCount++;
      if (document.hidden) {
        const onVisible = () => {
          if (!document.hidden) {
            document.removeEventListener('visibilitychange', onVisible);
            window.setTimeout(startProbe, PROBE_WARMUP_MS);
          }
        };
        document.addEventListener('visibilitychange', onVisible);
      } else {
        window.setTimeout(startProbe, PROBE_WARMUP_MS);
      }
    }
  };

  const onVisibilityChange = () => {
    if (document.hidden) {
      restart();
    }
  };

  document.addEventListener('visibilitychange', onVisibilityChange);

  if (document.hidden) {
    restart();
    return;
  }

  probeStartTime = performance.now();

  const tick = (now: DOMHighResTimeStamp) => {
    if (document.hidden) {
      restart();
      return;
    }

    const elapsed = now - probeStartTime;

    if (elapsed < PROBE_WARMUP_MS) {
      rafId = requestAnimationFrame(tick);
      return;
    }

    if (sampleStartTime === null) {
      sampleStartTime = now;
      frameCount = 0;
    } else {
      frameCount++;
      sampleEndTime = now;
    }

    if (elapsed >= PROBE_DURATION_MS) {
      cleanup();
      if (sampleStartTime !== null && sampleEndTime > sampleStartTime && frameCount > 0) {
        const durationSeconds = (sampleEndTime - sampleStartTime) / 1000;
        const fps = frameCount / durationSeconds;

        if (fps < FPS_MINIMAL_BELOW) {
          probeDowngradeTier = 'minimal';
        } else if (fps < FPS_LITE_BELOW) {
          probeDowngradeTier = 'lite';
        }
        recomputeAndSetTier();
      }
      return;
    }

    rafId = requestAnimationFrame(tick);
  };

  rafId = requestAnimationFrame(tick);
}

function initFpsProbe() {
  if (typeof window === 'undefined') return;
  if (probeHasRunOrStarted) return;
  if (urlOverride !== null || currentTier === 'minimal') {
    return;
  }
  probeHasRunOrStarted = true;

  const scheduleStart = () => {
    window.setTimeout(() => {
      startProbe();
    }, PROBE_DELAY_MS);
  };

  if (document.readyState === 'complete') {
    scheduleStart();
  } else {
    window.addEventListener('load', scheduleStart, { once: true });
  }
}

if (typeof window !== 'undefined') {
  initFpsProbe();
}

export default useQuality;
