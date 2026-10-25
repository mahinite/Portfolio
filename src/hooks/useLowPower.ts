import { useQuality, HARDWARE_CONCURRENCY_THRESHOLD, DEVICE_MEMORY_THRESHOLD } from './useQuality';

export { HARDWARE_CONCURRENCY_THRESHOLD, DEVICE_MEMORY_THRESHOLD };

export function useLowPower(): boolean {
  return useQuality() !== 'full';
}

export default useLowPower;
