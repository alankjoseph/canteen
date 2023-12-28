import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  cartStore: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
       
      const cart = {
        id: nanoid(),
        item: action.payload,
      };
      state.cartStore.push(cart);
    },
    removeItem: (state, action) => {
      state.cartStore = state.cartStore.filter((cart) => {
        cart.id !== action.payload;
      });
    },
  },
});
export const { addItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer
