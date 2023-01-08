import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosHeaders,
} from "axios/index";

const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3001",
});

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers = { ...config.headers } as AxiosHeaders;
  config.headers.set("Authorization", window.localStorage.getItem("token"));

  return config;
});

export default instance;
