import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Order = {
  id: string | number | undefined;
  name: string;
  image: string;
  price: number;
  count: number;
};
type InitialState = {
  // order: Order;
  orderList: Order[];
  totalPrice: number;
  isCartActive: boolean;
};

const initialState: InitialState = {
  // order: { id: 0, name: "", image: "", price: 0, count: 0 },
  orderList: [],
  totalPrice: 0,
  isCartActive: false,
};

const CartSlice = createSlice({
  name: "cart",
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
    removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
      state.orderList = state.orderList.filter((order) => {
        return order.id !== action.payload.id;
      });
    },
    increment: (state, action: PayloadAction<{ id: number }>) => {
      state.orderList.map((order) => {
        order.id === action.payload.id && order.count++;
      });
    },
    decrement: (state, action: PayloadAction<{ id: number }>) => {
      state.orderList.map((order) => {
        if (order.id === action.payload.id && order.count > 1) {
          order.count--;
        }
      });
    },
    calculateTotal: (state) => {
      const total: number[] = state.orderList.map((order) => {
        return order.price * order.count;
      });
      const sum = total.reduce((acc, num) => acc + num, 0);
      state.totalPrice = sum;
    },
    createOrder: () => {},
  },
});

export default CartSlice.reducer;

export const {
  addToCart,
  removeFromCart,
  increment,
  decrement,
  calculateTotal,
  createOrder,
  setIsCartActive,
} = CartSlice.actions;
