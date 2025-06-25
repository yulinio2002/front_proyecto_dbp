import axios from 'axios';
import { getAuthToken } from '../utils/authHelpers';
import { externalLogout } from '../contexts/AuthContext';
import { NavigateFunction } from 'react-router-dom';

export const axiosInstance = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

export function attachInterceptors(navigate?: NavigateFunction) {
  axiosInstance.interceptors.request.use(cfg => {
    const token = getAuthToken();
    if (token) cfg.headers!['Authorization'] = `Bearer ${token}`;
    return cfg;
  });

  axiosInstance.interceptors.response.use(
    r => r,
    err => {
      if (err.response?.status === 401) {
        externalLogout();
        navigate?.('/login');
      }
      return Promise.reject(err);
    },
  );
}
