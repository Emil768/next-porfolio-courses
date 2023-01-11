import axios from "utils/axios";
import { UserProps } from "propTypes";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { LoginProps } from "propTypes";

type AuthState = {
  user: UserProps;
  status: "loading" | "loaded" | "error";
  fetchAuth: (values: LoginProps) => Promise<UserProps>;
  fetchAuthRegister: (values: UserProps) => Promise<UserProps>;
  fethAuthMe: () => void;
  logout: () => void;
};

const useAuthStore = create(
  devtools<AuthState>((set) => ({
    user: {} as UserProps,
    status: "loading",
    fetchAuth: async (values) => {
      set({ status: "loading" });
      const { data } = await axios.post<UserProps>("/auth/login", values);
      set({ user: data, status: "loaded" });
      return data;
    },
    fetchAuthRegister: async (values) => {
      set({ status: "loading" });
      const { data } = await axios.post<UserProps>("/auth/register", values);
      set({ user: data, status: "loaded" });
      return data;
    },
    fethAuthMe: async () => {
      set({ status: "loading" });
      try {
        const { data } = await axios.get<UserProps>("/auth/me");
        set({ user: data, status: "loaded" });
        return data;
      } catch (err) {
        set({ user: {} as UserProps, status: "error" });
      }
    },
    logout: () => {
      set({ user: {} as UserProps, status: "loading" });
    },
  }))
);

export default useAuthStore;
