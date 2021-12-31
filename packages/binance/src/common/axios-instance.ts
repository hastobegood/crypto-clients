import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { URLSearchParams } from 'url';

export const axiosInstance = axios.create({
  timeout: 5000,
});

export const isAxiosError = (error: any): error is AxiosError => axios.isAxiosError(error);

export const getQueryConfig = (apiUrl: string, apiKey?: string): AxiosRequestConfig => {
  return {
    baseURL: apiUrl,
    headers: apiKey ? { 'X-MBX-APIKEY': apiKey } : undefined,
  };
};

export const getQueryParameters = (data: any, timestamp: boolean): string => {
  const parameters = new URLSearchParams();

  Object.keys(data).forEach((key) => {
    const value = data[key];
    if (value !== undefined) {
      parameters.append(key, value);
    }
  });

  if (timestamp) {
    parameters.append('timestamp', new Date().valueOf().toString());
  }

  return parameters.toString();
};
