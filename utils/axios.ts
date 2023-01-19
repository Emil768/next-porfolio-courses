import axios, { AxiosInstance, AxiosRequestConfig, AxiosHeaders } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  (config.headers as AxiosHeaders).set(
    "Authorization",
    typeof window !== "undefined" && window.localStorage.getItem("token")
  );
  return config;
});

export default instance;
