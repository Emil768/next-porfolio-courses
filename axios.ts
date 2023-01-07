import axios from "axios";

const instance: any = axios.create({
  baseURL: "http://localhost:3001",
});

instance.interceptors.request.use((config: any) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});

export default instance;
