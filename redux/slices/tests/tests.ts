import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { TestProps } from "propTypes";
import { TestState } from "./types";

import axios from "axios";

//Получить тесты
export const fetchTests = createAsyncThunk<
  TestProps[],
  void,
  { rejectValue: TestProps }
>("tests/fetchTests", async () => {
  const { data } = await axios.get("/tests");
  console.log(data);
  return data;
});

//Получить категорию
export const fetchCategory = createAsyncThunk<
  TestProps[],
  string,
  { rejectValue: TestProps }
>("tests/fetchCategory", async (title) => {
  const { data } = await axios.get(`/category/${title}`);
  return data;
});

//Сортировка
export const fetchSortBy = createAsyncThunk<
  TestProps[],
  string,
  { rejectValue: TestProps }
>("tests/fetchSortBy", async (title) => {
  const { data } = await axios.get(`/sort/${title}`);
  return data;
});

//Поставть like
export const fetchAddLike = createAsyncThunk<
  TestProps,
  string,
  { rejectValue: TestProps }
>("tests/fetchAddLike", async (id) => {
  const { data } = await axios.patch("/like", { testId: id });
  return data;
});

//Убрать like
export const fetchRemoveLike = createAsyncThunk<
  TestProps,
  string,
  { rejectValue: TestProps }
>("tests/fetchRemoveLike", async (id) => {
  const { data } = await axios.patch("/unlike", { testId: id });
  return data;
});

const initialState: TestState = {
  tests: [],
  status: "loading",
};

const testSlice = createSlice({
  name: "tests",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      //Все тесты
      .addCase(fetchTests.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTests.fulfilled, (state, action) => {
        state.tests = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchTests.rejected, (state) => {
        state.tests = [];
        state.status = "error";
      })

      //Категории
      .addCase(fetchCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.tests = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchCategory.rejected, (state) => {
        state.tests = [];
        state.status = "error";
      })

      //Сортировка
      .addCase(fetchSortBy.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSortBy.fulfilled, (state, action) => {
        state.tests = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchSortBy.rejected, (state) => {
        state.tests = [];
        state.status = "error";
      })

      //Лайк
      .addCase(fetchAddLike.pending, (state) => {})
      .addCase(fetchAddLike.fulfilled, (state, action) => {
        state.tests = state.tests.map((item) =>
          item._id === action.payload._id ? (item = action.payload) : item
        );
        state.status = "loaded";
      })
      .addCase(fetchAddLike.rejected, (state) => {
        state.tests = [];
        state.status = "error";
      })

      //Дизлайк
      .addCase(fetchRemoveLike.pending, (state) => {})
      .addCase(fetchRemoveLike.fulfilled, (state, action) => {
        state.tests = state.tests.map((item) =>
          item._id === action.payload._id ? (item = action.payload) : item
        );
        state.status = "loaded";
      })
      .addCase(fetchRemoveLike.rejected, (state) => {
        state.tests = [];
        state.status = "error";
      });
  },
});

export const testsReducer = testSlice.reducer;
