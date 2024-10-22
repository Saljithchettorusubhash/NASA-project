import axios, { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import rateLimiter from '../utils/rateLimiter';
import requestQueue from '../utils/requestQueue'; // The request queue
import { fetchRetry } from '../utils/fetchRetry'; // Retry function with backoff

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL?.trim() || 'https://nasa-project-9618.onrender.com',
  timeout: 120000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Type assertion to cast AxiosRequestConfig to InternalAxiosRequestConfig
apiClient.interceptors.request.use(
  async (config: AxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    await rateLimiter.acquireToken(); // Acquire token before making the request
    console.log(`Request made to ${config.url}`);
    return config as InternalAxiosRequestConfig; // Cast to InternalAxiosRequestConfig
  },
  (error: AxiosError) => {
    console.error('Request Error:', error.message);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(`Response received from ${response.config.url}`);
    return response;
  },
  async (error: AxiosError) => {
    const config = error.config as InternalAxiosRequestConfig | undefined; // Cast to InternalAxiosRequestConfig
    
    if (error.response?.status === 429 && config) {
      console.warn(`Too Many Requests for ${config.url}. Retrying...`);
      
      // Use fetchRetry to retry the request with exponential backoff
      return fetchRetry(() => apiClient.request(config));
    }

    return Promise.reject(error);
  }
);

// Use the request queue to add the API request
const enqueueRequest = (requestFn: () => Promise<any>) => {
  requestQueue.addRequest(() => requestFn());
};

export { apiClient, enqueueRequest };
