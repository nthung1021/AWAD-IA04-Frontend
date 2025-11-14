import axios, { AxiosError, type AxiosRequestConfig } from 'axios';
import { getAccessToken, setAccessToken, clearTokens, getRefreshToken } from './auth';
import Router from 'next/router';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

let isRefreshing = false;
let failedQueue: Array<{ resolve: (value: AxiosRequestConfig | PromiseLike<AxiosRequestConfig>) 
    => void; reject: (err: any) => void; config: AxiosRequestConfig }> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else {
      if (token && prom.config.headers) prom.config.headers['Authorization'] = `Bearer ${token}`;
      prom.resolve(prom.config);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use((config) => {
  const access = getAccessToken();
  if (access && config.headers) {
    config.headers['Authorization'] = `Bearer ${access}`;
  }
  return config;
});

// Response interceptor to handle 401
api.interceptors.response.use(
  res => res,
  async (err: AxiosError) => {
    const originalConfig = err.config as AxiosRequestConfig & { _retry?: boolean };
    if (!originalConfig) return Promise.reject(err);

    if (err.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      if (isRefreshing) {
        // queue requests while refreshing
        return new Promise<AxiosRequestConfig>((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalConfig });
        }).then((conf) => api.request(conf));
      }

      isRefreshing = true;
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        clearTokens();
        Router.push('/login');
        return Promise.reject(err);
      }

      try {
        const response = await api.post('/users/refresh', { refreshToken });
        const { accessToken, refreshToken: newRefresh } = response.data;
        setAccessToken(accessToken);
        localStorage.setItem('refreshToken', newRefresh);

        processQueue(null, accessToken);

        // set header and retry original
        if (originalConfig.headers) originalConfig.headers['Authorization'] = `Bearer ${accessToken}`;
        return api.request(originalConfig);
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearTokens();
        Router.push('/login');
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  },
);

export default api;
