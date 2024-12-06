import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../config/firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
//types
export type Booking = {
  id?: string;
  name: string;
  tel: string;
  email: string;
  count: number;
  date: string;
  status: "Beklemede" | "Onaylandı" | "Reddedildi";
};

type InitialState = {
  bookings: Booking[];
  status: "idle" | "loading" | "succeeded" | "failed";
};

//functions
export const addBooking = createAsyncThunk(
  "booking/addBooking",
  async (bookingData: Omit<Booking, "id">) => {
    const docRef = await addDoc(collection(db, "bookings"), bookingData);
    return { id: docRef.id, ...bookingData };
  },
);
export const fetchBookings = createAsyncThunk(
  "booking/fetchBookings",
  async () => {
    const docs = await getDocs(collection(db, "bookings"));
    const bookings: Booking[] = [];
    docs.forEach((doc) => {
      bookings.push({ id: doc.id, ...doc.data() } as Booking);
    });

    return bookings;
  },
);

export const updateBookingStatus = async (id: string, status: string) => {
  const docRef = doc(db, "bookings", id);
  await updateDoc(docRef, {
    status: status,
  });
};

const initialState: InitialState = {
  bookings: [],
  status: "idle",
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addBooking.fulfilled, (state, action) => {
        state.bookings.push(action.payload);
      })
      .addCase(fetchBookings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookings = action.payload;
        console.log(state.status);
      })
      .addCase(fetchBookings.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default bookingSlice.reducer;
export const {} = bookingSlice.actions;
