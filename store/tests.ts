import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { TestStateProps } from "./types";

const useTestsStore = create<TestStateProps>()(
  devtools(
    (set) => ({
      tests: [],
      status: "loading",
      fetchTests: (data) => {
        set({ status: "loading" });
        set({ tests: data, status: "loaded" });
      },
    }),
    { name: "tests" }
  )
);

export default useTestsStore;
