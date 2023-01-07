import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth/auth";
import { quizReducer } from "./slices/quiz/quiz";
import { testsReducer } from "./slices/tests/tests";

export const store = configureStore({
  reducer: {
    tests: testsReducer,
    quiz: quizReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
