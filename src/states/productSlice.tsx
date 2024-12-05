import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";

//types
export type Product = {
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
  selectedProduct: Product;
};
//functions
export const uploadImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "myUploadPreset");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dylvgqmwy/image/upload",
      formData,
    );
    console.log("Image uploaded");
    return response.data.secure_url;
  } catch (err) {
    console.error("image couldn't uploaded", err);
  }
};

export const deleteProduct = async (id: string | undefined) => {
  const docRef = doc(db, "products", `${id}`);
  try {
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Doc couldn't delete", error);
  }
};

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (product: Omit<Product, "id">) => {
    const docRef = await addDoc(collection(db, "products"), product);
    return { id: docRef.id, ...product };
  },
);
export const updateProduct = async (productToUpdate: Product) => {
  const docRef = doc(db, "products", productToUpdate.id!);
  await updateDoc(docRef, {
    category: productToUpdate.category,
    description: productToUpdate.description,
    imageUrl: productToUpdate.imageUrl,
    name: productToUpdate.name,
    price: productToUpdate.price,
  });
};
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const docs = await getDocs(collection(db, "products"));
    const products: Product[] = [];
    docs.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() } as Product);
    });

    return products;
  },
);
//Initial state
const initialState: InitialState = {
  products: [],
  status: "idle",
  selectedProduct: {
    id: "",
    name: "",
    category: "",
    description: "",
    price: 0,
    imageUrl: "",
  },
};
//Slice
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload;
      console.log(state.selectedProduct);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        console.log("fetching");
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
        console.log("fetch failed");
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      });
  },
});

export default productSlice.reducer;

export const { setSelectedProduct } = productSlice.actions;
