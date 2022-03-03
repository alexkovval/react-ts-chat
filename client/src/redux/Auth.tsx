import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../models/User";
import { RootState } from "./store";

type authState = {
  isLoggedIn: boolean;
  user: IUser;
  token: string;
};

const initialState: authState = {
  isLoggedIn: false,
  user: {},
  token: "",
};

export const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    getUsers: (state, action) => {
      state.user = action.payload;
    },
    token: (state, action) => {
      state.token = action.payload;
    },
    register: (state, action) => {
      state.user = action.payload;
    },
    changeIsLogged: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    login: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { getUsers, token, register, login, changeIsLogged } =
  AuthSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectToken = (state: RootState) => state.user.token;

export default AuthSlice.reducer;
