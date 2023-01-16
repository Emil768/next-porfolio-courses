import axios from "utils/axios";
import { UserProps } from "propTypes";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { AuthStateProps } from "./types";

const useAuthStore = create<AuthStateProps>()(
  devtools(
    (set) => ({
      data: null,
      status: "loading",
      fetchAuth: async (values) => {
        try {
          const { data } = await axios.post<UserProps>("/auth/login", values);
          set({ data, status: "loaded" });
          return data;
        } catch (err) {
          set({ status: "error" });
          return Promise.reject(err);
        }
      },
      fetchAuthRegister: async (values) => {
        const { data } = await axios.post<UserProps>("/auth/register", values);
        set({ data, status: "loaded" });
        return data;
      },
      fethAuthMe: async () => {
        try {
          const { data } = await axios.get<UserProps>("/auth/me");
          set({ data, status: "loaded" });
          return data;
        } catch (err) {
          set({ data: null, status: "error" });
        }
      },
      logout: () => {
        set({ data: null, status: "loading" });
      },
    }),
    { name: "auth" }
  )
);

export default useAuthStore;
