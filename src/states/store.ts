import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: { categoryReducer, cartReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
