import { TestProps } from "propTypes";
import axios from "utils/axios";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { TestStateProps } from "./types";

const useTestsStore = create<TestStateProps>()(
  devtools(
    (set) => ({
      tests: [],
      status: "loading",
      fetchTests: (data) => {
        set({ tests: data, status: "loaded" });
      },
      fetchAddLike: async (id) => {
        try {
          const { data } = await axios.patch<TestProps>("/like", {
            testId: id,
          });
          set((state) => ({
            tests: (state.tests = state.tests.map((item) =>
              item._id === data._id ? (item = data) : item
            )),
            status: "loaded",
          }));
        } catch (err) {
          set({ status: "error" });
        }
      },
      fetchRemoveLike: async (id) => {
        try {
          const { data } = await axios.patch<TestProps>("/unlike", {
            testId: id,
          });
          set((state) => ({
            tests: (state.tests = state.tests.map((item) =>
              item._id === data._id ? (item = data) : item
            )),
            status: "loaded",
          }));
        } catch (err) {
          set({ status: "error" });
        }
      },
    }),
    { name: "tests" }
  )
);

export default useTestsStore;
