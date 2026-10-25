import { useState, useEffect } from 'react';
import { useCoarsePointer } from './useCoarsePointer';

export const HARDWARE_CONCURRENCY_THRESHOLD = 4;
export const DEVICE_MEMORY_THRESHOLD = 4;
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function checkLowPowerHardware(): boolean {
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

export function useLowPower(): boolean {
  const isCoarse = useCoarsePointer();

  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia(REDUCED_MOTION_QUERY).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mql = window.matchMedia(REDUCED_MOTION_QUERY);
    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    if (mql.addEventListener) {
      mql.addEventListener('change', handler);
      return () => mql.removeEventListener('change', handler);
    }
    mql.addListener(handler);
    return () => mql.removeListener(handler);
  }, []);

  const isLowPowerHardware = checkLowPowerHardware();

  return isCoarse || prefersReducedMotion || isLowPowerHardware;
}

export default useLowPower;
