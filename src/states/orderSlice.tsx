import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { toast } from "react-toastify";

export type Order = {
  id?: string;
  name: string;
  image: string;
  price: number;
  count: number;
};
export type OrderStatus =
  | "Beklemede"
  | "Hazırlanıyor"
  | "Yola Çıktı"
  | "Teslim Edildi"
  | "İptal Edildi";
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
  createdAt?: string | null;
  status: OrderStatus;
};
type ConfirmedOrders = ConfirmedOrderData[];
type InitialState = {
  confirmedOrderData: ConfirmedOrderData;
  confirmedOrders: ConfirmedOrders;
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
    createdAt: null,
    status: "Beklemede",
  },
  confirmedOrders: [],
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

export const fetchOrders = createAsyncThunk("order/fetchOrders", async () => {
  const userId = auth.currentUser?.uid;

  const ordersQuery = query(
    collection(db, "orders"),
    where("userId", "==", userId),
  );
  const querySnapshot = await getDocs(ordersQuery);
  const orders: ConfirmedOrders = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      id: doc.id,
      createdAt:
        data.createdAt instanceof Timestamp
          ? data.createdAt.toDate().toISOString()
          : null,
    } as ConfirmedOrderData;
  });
  return orders;
});

export const fetchAllOrders = createAsyncThunk(
  "order/fetchAllOrders",
  async () => {
    const docs = await getDocs(collection(db, "orders"));
    const orders: ConfirmedOrders = [];

    docs.forEach((doc) => {
      const data = doc.data();
      orders.push({
        id: doc.id,
        ...data,
        createdAt:
          data.createdAt instanceof Timestamp
            ? data.createdAt.toDate().toISOString()
            : null,
      } as ConfirmedOrderData);
    });
    return orders;
  },
);

export const cancelOrder = async (orderId: string) => {
  const docRef = doc(db, "orders", orderId);
  await updateDoc(docRef, {
    status: "İptal Edildi",
  });

  toast.error("Sipariş İptal edildi.", {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export const updateOrderStatus = async (
  orderId: string,
  newStatus: OrderStatus,
) => {
  const docRef = doc(db, "orders", orderId);
  await updateDoc(docRef, {
    status: newStatus,
  });
  toast.success("Sipariş Durumu Güncellendi.", {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

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
    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      state.orderList = state.orderList.filter((order) => {
        return order.id !== action.payload.id;
      });
    },
    increment: (state, action: PayloadAction<{ id: string }>) => {
      state.orderList.map((order) => {
        order.id === action.payload.id && order.count++;
      });
    },
    decrement: (state, action: PayloadAction<{ id: string }>) => {
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
      })
      .addCase(fetchOrders.pending, () => {
        console.log("Orders fetching");
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.confirmedOrders = action.payload;
      })
      .addCase(fetchOrders.rejected, (_, action) => {
        console.error("Orders couldn't fetch", action.error.message);
      })
      .addCase(fetchAllOrders.pending, () => {
        console.log("orders fetching");
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.confirmedOrders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (_, action) => {
        console.error("Orders couldn't fetch", action.error.message);
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
