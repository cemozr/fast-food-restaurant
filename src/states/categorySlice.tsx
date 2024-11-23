import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  category: string;
};

const initialState: InitialState = {
  category: "Hepsi",
};

const CategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    filter: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
  },
});

export default CategorySlice.reducer;
export const { filter } = CategorySlice.actions;
