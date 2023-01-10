import axios, { AxiosInstance, AxiosRequestConfig, AxiosHeaders } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3001",
});

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  (config.headers as AxiosHeaders).set(
    "Authorization",
    typeof window !== "undefined" && window.localStorage.getItem("token")
  );
  return config;
});

export default instance;
