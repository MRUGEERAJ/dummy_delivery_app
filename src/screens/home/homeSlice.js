import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  item:{},
  cartItems:[]
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setItem(state, action) {
      state.item = action.payload;
    },
    setCartItems(state, action) {
      state.cartItems = action.payload;
    },
  },
});

export const { setItem, setCartItems } = homeSlice.actions;

export default homeSlice.reducer;

export const getItems = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products');
    return response.json();
  } catch (err) {
    console.log("get items error", err);
  }
};
