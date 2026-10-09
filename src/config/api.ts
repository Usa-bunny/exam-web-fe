import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { error } from "console";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api: AxiosInstance = axios.create({ baseURL: API_URL });

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    const isLoginRequest = response.config?.url?.includes("/auth/login");
    const message = response.data?.message?.toLowerCase();
    const isTokenInvalidMessage = [
      "token tidak valid",
      "token tidak ada",
      "token expired",
      "jwt expired",
    ].includes(message);

    if (!isLoginRequest && isTokenInvalidMessage) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return response;
  },
  (error: AxiosError) => {
    const isLoginRequest = error.config?.url?.includes("/auth/login");
    if (!isLoginRequest && error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error)
  },
);

export default api;
