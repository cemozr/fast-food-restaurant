import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import bookingReducer from "./bookingSlice";

export const store = configureStore({
  reducer: { cartReducer, authReducer, productReducer, bookingReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
