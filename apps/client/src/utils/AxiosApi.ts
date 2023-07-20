import axios, { AxiosRequestConfig, AxiosResponse, CancelTokenSource, AxiosError } from "axios";
type METHODS = "POST" | "GET" | "PUT" | "DELETE";

const GLOBAL_URL: string = "http://localhost:3000/api";

const axiosInstance = axios.create({
  baseURL: GLOBAL_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const AxiosAPI = async <T>(
  url: string,
  method: METHODS,
  data?: any,
  cancelToken?: CancelTokenSource
): Promise<T&AxiosError&any> => {
  try {
    const config: AxiosRequestConfig = {
      url: url,
      method: method,
      data: data,
      cancelToken: cancelToken?.token
    };

    const response: AxiosResponse<T> = await axiosInstance(config);
    return response.data;
  } catch (error:any) {
    return  error;
  }
};
