import { EventEmitter } from 'events';
import { URLSearchParams } from 'url';

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface HttpOptions {
  emitter: EventEmitter;
  timeout?: number;
}

export interface HttpRequest {
  api: string;
  endpoint: string;
  method: string;
  params: string;
}

export interface HttpResponse {
  status: number;
}

export const axiosInstance = (options: HttpOptions): AxiosInstance => {
  const instance = axios.create({
    timeout: options?.timeout || 5_000,
  });

  instance.interceptors.request.use(async (request) => {
    options.emitter.emit('HttpRequest', httpRequest(request));
    return request;
  });

  instance.interceptors.response.use(
    async (response) => {
      options.emitter.emit('HttpResponse', httpRequest(response.config), httpResponse(response));
      return response;
    },
    async (error) => {
      if (axios.isAxiosError(error)) {
        options.emitter.emit('HttpResponse', httpRequest(error.config), error.response ? httpResponse(error.response) : undefined);
      }
      return Promise.reject(error);
    },
  );

  return instance;
};

const httpRequest = (request: AxiosRequestConfig): HttpRequest => {
  const urlParts = request.url!.split('?');

  return {
    api: request.baseURL!,
    endpoint: urlParts[0],
    method: request.method!,
    params: urlParts[1],
  };
};

const httpResponse = (response: AxiosResponse): HttpResponse => {
  return {
    status: response.status,
  };
};

export const getQueryConfig = (apiUrl: string, apiKey?: string): AxiosRequestConfig => {
  return {
    baseURL: apiUrl,
    headers: apiKey ? { 'X-MBX-APIKEY': apiKey } : undefined,
  };
};

export const getQueryParameters = (data: any, timestamp: boolean): string => {
  const parameters = new URLSearchParams();

  if (data) {
    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (value !== undefined && value !== null) {
        parameters.append(key, value);
      }
    });
  }

  if (timestamp) {
    parameters.append('timestamp', new Date().valueOf().toString());
  }

  return parameters.toString();
};
