import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export interface IHttpClient {
  get<T = any>(url: string, config?: any): Promise<T>;
  post<T = any>(url: string, data?: any, config?: any): Promise<T>;
  put<T = any>(url: string, data?: any, config?: any): Promise<T>;
  patch<T = any>(url: string, data?: any, config?: any): Promise<T>;
  delete<T = any>(url: string, config?: any): Promise<T>;
}

// general idea is, class implementing IHttpClient should catch and re-throw a specific formatted HttpClientError,
// so that any class implementing the IHttpClient interface
// will throw the same error, so the consumer which eg the service will
// get the consistence error object that can be easily deconstruct and display on screen.
export interface HttpClientError {
  // somthing not sure yet, will think about this later. maybe can follow the backend error format
  status: string;
  message: string;
  errors: {
    path: string;
    message: string;
  }[];
}

export class AxiosHttpClient implements IHttpClient {
  private client: AxiosInstance;
  constructor(baseURL: string, config?: AxiosRequestConfig) {
    this.client = axios.create({
      baseURL,
      ...config,
    });
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return (await this.handleRequest(this.client.get(url, config))).data;
  }

  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return (await this.handleRequest(this.client.post(url, data, config))).data;
  }

  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return (await this.handleRequest(this.client.put(url, data, config))).data;
  }

  async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.handleRequest(this.client.patch(url, data, config));
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return (await this.handleRequest(this.client.delete(url, config))).data;
  }

  private async handleRequest<T>(request: Promise<T>): Promise<T> {
    try {
      return await request;
    } catch (error: any) {
      const formattedError: HttpClientError = {
        status: error?.response?.data?.status || "unknown",
        message: error?.response?.data?.message || error.message,
        errors: error?.response?.data?.errors || [
          { path: "unknown", message: error.message },
        ],
      };
      throw formattedError;
    }
  }
}
