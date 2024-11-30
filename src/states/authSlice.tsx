import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../utils/localStorage";

export type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
};

type InitialState = {
  user: User | null;
  isRegistered: boolean;
  isLoggedIn: boolean;
  isLoading: boolean | null;
  role: string | null;
};

const initialState: InitialState = {
  user: loadFromLocalStorage("user") || null,
  isRegistered: false,
  isLoggedIn: !!loadFromLocalStorage("user"),
  isLoading: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsRegistered: (state) => {
      state.isRegistered = !state.isRegistered;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isLoggedIn = action.payload !== null;
      saveToLocalStorage("user", action.payload);
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setisLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setRole: (state, action: PayloadAction<string | null>) => {
      state.role = action.payload;
    },
  },
});

export default authSlice.reducer;

export const {
  setIsRegistered,
  setUser,
  setIsLoggedIn,
  setisLoading,
  setRole,
} = authSlice.actions;
