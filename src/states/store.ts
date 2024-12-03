import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import productReducer from "./productSlice";

export const store = configureStore({
  reducer: { categoryReducer, cartReducer, authReducer, productReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
