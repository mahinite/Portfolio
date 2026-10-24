import { useState, useEffect } from 'react';

const QUERY = '(hover: none) and (pointer: coarse)';

export function useCoarsePointer(): boolean {
  const [isCoarse, setIsCoarse] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return false;
    }
    return window.matchMedia(QUERY).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return undefined;
    }
    const mql = window.matchMedia(QUERY);
    const handler = (e: MediaQueryListEvent) => {
      setIsCoarse(e.matches);
    };

    if (mql.addEventListener) {
      mql.addEventListener('change', handler);
      return () => mql.removeEventListener('change', handler);
    }
    mql.addListener(handler);
    return () => mql.removeListener(handler);
  }, []);

  return isCoarse;
}

export default useCoarsePointer;
