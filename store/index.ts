import axios from "utils/axios";
import { TestProps, UserProps } from "propTypes";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { AuthStateProps, QuizStateProps, TestStateProps } from "./types";

//Auth

export const useAuthStore = create<AuthStateProps>()(
  devtools(
    (set) => ({
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
    }),
    { name: "auth" }
  )
);

//Quiz

export const useQuizStore = create<QuizStateProps>()(
  devtools(
    (set) => ({
      quiz: {} as TestProps,
      currentQuesIndex: 0,
      currentAnswer: { index: 0, answer: "" },
      score: 0,
      showScore: false,
      status: "loading",
      fetchTest: (data) => {
        set({ status: "loading" });
        set({ quiz: data, status: "loaded" });
      },
      onNextQuestion: () =>
        set((state) => ({ currentQuesIndex: state.currentQuesIndex + 1 })),
    }),
    { name: "quiz" }
  )
);

//Tests

export const useTestsStore = create<TestStateProps>()(
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
