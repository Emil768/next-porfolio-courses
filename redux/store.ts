import { configureStore } from "@reduxjs/toolkit";
import { quizReducer, authReducer, testsReducer } from "./slices";

import { createWrapper } from "next-redux-wrapper";

const makeStore = () =>
  configureStore({
    reducer: {
      tests: testsReducer,
      quiz: quizReducer,
      auth: authReducer,
    },
    devTools: true,
  });

export const store = makeStore();

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore["getState"]>;
export type AppDispatch = typeof store.dispatch;
export const wrapper = createWrapper<RootStore>(makeStore);
