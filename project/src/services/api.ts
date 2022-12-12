import axios, {AxiosInstance, AxiosError, AxiosRequestConfig} from 'axios';
import {getToken} from './token';
import handlerError from '../hooks/handler-error/handler-error';

const BACKEND_URL = 'https://11.react.pages.academy/six-cities-simple';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{error: string}>) => {
      handlerError(error);
      throw error;
    }
  );

  return api;
};
