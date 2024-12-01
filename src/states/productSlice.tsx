import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

//types
type Product = {
  id?: string;
  name: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string;
};

type InitialState = {
  products: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
};
//functions
export const uploadImage = async (file: File) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "myUploadPreset");

  const response = await axios.post(
    "https://api.cloudinary.com/v1_1/dylvgqmwy/image/upload",
    formData,
  );
  return response.data.secure_url;
};

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (product: Omit<Product, "id">) => {
    const docRef = await addDoc(collection(db, "products"), product);
    return { id: docRef.id, ...product };
  },
);

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const docs = await getDocs(collection(db, "products"));
    const products: Product[] = [];
    docs.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data } as Product);
    });
    return products;
  },
);
//Initial state
const initialState: InitialState = {
  products: [],
  status: "idle",
};
//Slice
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      });
  },
});

export default productSlice.reducer;

export const {} = productSlice.actions;
