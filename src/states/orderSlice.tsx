import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  FieldValue,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";

export type Order = {
  id: string | number;
  name: string;
  image: string;
  price: number;
  count: number;
};
type UserInfo = {
  name: string;
  tel: string;
  address: string;
};
type ConfirmedOrderData = {
  id?: string;
  userId?: string;
  userInfo: UserInfo;
  items: Order[];
  totalPrice: number;
  createdAt?: string | FieldValue;
  status:
    | "Beklemede"
    | "Hazırlanıyor"
    | "Yola Çıktı"
    | "Teslim Edildi"
    | "İptal Edildi";
};
type InitialState = {
  confirmedOrderData: ConfirmedOrderData;
  orderList: Order[];
  totalPrice: number;
  isCartActive: boolean;
};

const initialState: InitialState = {
  confirmedOrderData: {
    id: "",
    userId: "",
    userInfo: {
      name: "",
      tel: "",
      address: "",
    },
    items: [],
    totalPrice: 0,
    createdAt: "",
    status: "Beklemede",
  },
  orderList: [],
  totalPrice: 0,
  isCartActive: false,
};

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (confirmedOrderData: ConfirmedOrderData) => {
    try {
      const docRef = await addDoc(collection(db, "orders"), {
        ...confirmedOrderData,
        createdAt: serverTimestamp(),
      });
      return { id: docRef.id, ...confirmedOrderData };
    } catch (error) {
      console.error("Sipariş oluşturulamadı", error);
    }
  },
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setIsCartActive: (state) => {
      state.isCartActive = !state.isCartActive;
    },
    addToCart: (state, action: PayloadAction<Order>) => {
      const itemIndex = state.orderList.findIndex(
        (order) => order.id === action.payload.id,
      );
      if (itemIndex >= 0) {
        state.orderList[itemIndex].count += 1;
      } else state.orderList.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<{ id: number | string }>) => {
      state.orderList = state.orderList.filter((order) => {
        return order.id !== action.payload.id;
      });
    },
    increment: (state, action: PayloadAction<{ id: number | string }>) => {
      state.orderList.map((order) => {
        order.id === action.payload.id && order.count++;
      });
    },
    decrement: (state, action: PayloadAction<{ id: number | string }>) => {
      state.orderList.map((order) => {
        if (order.id === action.payload.id && order.count > 1) {
          order.count--;
        }
      });
    },
    setConfirmedOrderData: (
      state,
      action: PayloadAction<ConfirmedOrderData>,
    ) => {
      state.confirmedOrderData = action.payload;
      console.log(state.confirmedOrderData);
    },
    calculateTotal: (state) => {
      const total: number[] = state.orderList.map((order) => {
        return order.price * order.count;
      });
      const sum = total.reduce((acc, num) => acc + num, 0);
      state.totalPrice = sum;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, () => {
        console.log("order pending");
      })
      .addCase(createOrder.fulfilled, (state) => {
        (state.orderList = []), (state.totalPrice = 0);
      })
      .addCase(createOrder.rejected, (error) => {
        console.error("Order failed", error);
      });
  },
});

export default orderSlice.reducer;

export const {
  addToCart,
  removeFromCart,
  increment,
  decrement,
  calculateTotal,
  setConfirmedOrderData,
  setIsCartActive,
} = orderSlice.actions;
