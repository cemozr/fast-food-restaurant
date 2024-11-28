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
};

const initialState: InitialState = {
  user: loadFromLocalStorage("user") || null,
  isRegistered: false,
  isLoggedIn: !!loadFromLocalStorage("user"),
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
  },
});

export default authSlice.reducer;

export const { setIsRegistered, setUser, setIsLoggedIn } = authSlice.actions;
