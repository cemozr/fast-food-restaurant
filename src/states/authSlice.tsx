import { createSlice } from "@reduxjs/toolkit";

type User = {
  name: string;
  email: string;
  password: string;
};

type InitialState = {
  userList: User[];
  isRegistered: boolean;
  isLoginSuccess: boolean | null;
};

const initialState: InitialState = {
  userList: [],
  isRegistered: false,
  isLoginSuccess: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: () => {},
    login: () => {},
    setIsRegistered: (state) => {
      state.isRegistered = !state.isRegistered;
    },
  },
});

export default authSlice.reducer;

export const { register, login, setIsRegistered } = authSlice.actions;
