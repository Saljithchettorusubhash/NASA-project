import { useEffect, useMemo } from 'react';
import { debounce } from '../utils/debounce';

export const useDebouncedEffect = (effect: () => void, deps: any[], delay: number) => {
  // Memoize the serialized dependencies to ensure stable comparison
  const serializedDeps = useMemo(() => JSON.stringify(deps), [deps]);

  useEffect(() => {
    const handler = debounce(effect, delay);
    handler();

    return () => {
      if (typeof handler === 'function' && handler.cancel) {
        handler.cancel(); // If using libraries like Lodash, add cancel logic
      }
    };
  }, [delay, effect, serializedDeps]);  // Use the memoized serializedDeps here
};
