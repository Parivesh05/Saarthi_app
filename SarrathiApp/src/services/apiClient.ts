import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { AppConfig } from 'src/config/env.config';

/**
 * Global Axios instance with interceptors for request/response handling.
 */
const apiClient = axios.create({
  baseURL: AppConfig.API_BASE_URL,
  timeout: AppConfig.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/**
 * Request interceptor — attach auth token if available.
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

/**
 * Response interceptor — normalize responses and handle global errors.
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response;

      switch (status) {
        case 401:
          // Handle unauthorized — e.g. clear token, redirect to login
          break;
        case 403:
          // Handle forbidden
          break;
        case 500:
          // Handle server error
          break;
      }
    } else if (error.request) {
      // Network error — no response received
      console.warn('Network error:', error.message);
    }

    return Promise.reject(error);
  },
);

/**
 * Helper to set the auth token on the global instance.
 */
export const setAuthToken = (token: string | null) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

export default apiClient;
