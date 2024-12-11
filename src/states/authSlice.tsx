import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../utils/localStorage";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { signOut } from "firebase/auth";

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

export const fetchUserRole = createAsyncThunk(
  "auth/fetchUserRole",
  async (uid: string) => {
    const userDoc = await getDoc(doc(db, "users", uid));
    return userDoc.exists() ? userDoc.data().role : "user";
  },
);

export const logout = createAsyncThunk("auth/logout", () => {
  signOut(auth).catch((error) => {
    console.error("Çıkış yaparken bir hata oluştu: ", error);
  });
  localStorage.clear();
});

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserRole.fulfilled, (state, action) => {
        state.role = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUserRole.rejected, (state) => {
        state.role = null;
        state.isLoading = false;
      })
      .addCase(logout.pending, () => {
        console.log("logging out");
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = null;
        state.role = null;
        console.log(state.isLoading, state.user, state.role);
      })
      .addCase(logout.rejected, (_, action) => {
        console.error("logout failed", action.error.message);
      });
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
