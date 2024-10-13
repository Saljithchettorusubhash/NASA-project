export const fetchRetry = async (fetchFn: () => Promise<any>, retries = 3, delay = 2000) => {
    let attempt = 0;
  
    const executeFetch = async () => {
      try {
        return await fetchFn();
      } catch (error: any) {
        if (attempt < retries && error.response?.status === 429) {
          attempt++;
          const retryAfter = error.response.headers['retry-after'];
          const backoffDelay = retryAfter ? retryAfter * 1000 : delay * Math.pow(2, attempt); // Exponential backoff
  
          console.warn(`Attempt ${attempt}: Retrying after ${backoffDelay}ms due to 429 error`);
          await new Promise((resolve) => setTimeout(resolve, backoffDelay)); // Wait for backoff delay
          return executeFetch(); // Retry the fetch
        } else {
          console.error(`Max retries reached or non-429 error: ${error.message}`);
          throw error;
        }
      }
    };
  
    return executeFetch();
  };
  