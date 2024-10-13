import { useEffect } from 'react';
import { debounce } from '../utils/debounce';

export const useDebouncedEffect = (effect: () => void, deps: any[], delay: number) => {
  useEffect(() => {
    const handler = debounce(effect, delay);
    handler();

    return () => {
      if (typeof handler === 'function' && handler.cancel) {
        handler.cancel(); // If using libraries like Lodash, add cancel logic
      }
    };
  }, [delay, effect]);  // Spread dependencies array
};
