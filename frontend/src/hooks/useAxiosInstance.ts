import axios, { CreateAxiosDefaults } from 'axios';
import { API_BASE } from '../constants';

export const useAxiosInstance = (config?: CreateAxiosDefaults) => {
  const apiBase = axios.create({
    baseURL: API_BASE,
    headers: {
      'Content-Type': 'application/json',
      ...config?.headers,
    },
    ...config,
  });

  return {
    apiBase,
  };
};
