import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      state.items.push(newItem);
    },
    removeItemFromCart(state, action) {
      const { color, size } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.color === color && item.size === size)
      );
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
