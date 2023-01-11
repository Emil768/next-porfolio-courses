import axios from "utils/axios";
import { TestProps } from "propTypes";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type AuthState = {
  tests: TestProps[];
  status: "loading" | "loaded" | "error";
  fetchTests: (data: TestProps[]) => void;
};

const useTestsStore = create(
  devtools<AuthState>((set) => ({
    tests: [],
    status: "loading",
    fetchTests: (data) => {
      set({ status: "loading" });
      set({ tests: data, status: "loaded" });
    },
  }))
);

export default useTestsStore;
