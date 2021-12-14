import axios, { AxiosError } from 'axios';

export const axiosInstance = axios.create({
  timeout: 5000,
});

export const isAxiosError = (error: any): error is AxiosError => axios.isAxiosError(error);
