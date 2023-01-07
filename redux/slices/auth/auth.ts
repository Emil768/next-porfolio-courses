import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { UserProps } from "propTypes";

import axios from "axios";
import { AuthState } from "./types";
import { LoginProps } from "propTypes";

//login

export const fetchAuth = createAsyncThunk<
  UserProps,
  LoginProps,
  { rejectValue: UserProps }
>("auth/fetchAuth", async (params) => {
  const { data } = await axios.post("/auth/login", params);
  return data;
});

//Регистрация
export const fethAuthRegister = createAsyncThunk<
  UserProps,
  UserProps,
  { rejectValue: UserProps }
>("auth/fetchAuthRegister", async (params) => {
  const { data } = await axios.post("/auth/register", params);
  return data;
});

//Получение пользователя
export const fethAuthMe = createAsyncThunk<
  UserProps,
  void,
  { rejectValue: UserProps }
>("auth/fethAuthMe", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});

const initialState: AuthState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    //login

    builder
      .addCase(fetchAuth.pending, (state) => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.data = null;
        state.status = "error";
      })

      //register

      .addCase(fethAuthRegister.pending, (state) => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(fethAuthRegister.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(fethAuthRegister.rejected, (state) => {
        state.data = null;
        state.status = "error";
      })

      //fetchMe

      .addCase(fethAuthMe.pending, (state) => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(fethAuthMe.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(fethAuthMe.rejected, (state) => {
        state.data = null;
        state.status = "error";
      });
  },
});

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
