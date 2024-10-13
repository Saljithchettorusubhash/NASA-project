export const debounce = (func: (...args: any[]) => void, wait: number) => {
    let timeout: NodeJS.Timeout | null = null;
  
    const debouncedFunction = (...args: any[]) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  
    // Add the cancel method for cleanup
    debouncedFunction.cancel = () => {
      if (timeout) clearTimeout(timeout);
    };
  
    return debouncedFunction;
  };
  