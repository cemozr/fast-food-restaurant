import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./orderSlice";
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import bookingReducer from "./bookingSlice";

export const store = configureStore({
  reducer: { orderReducer, authReducer, productReducer, bookingReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
