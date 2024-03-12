import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: Array.from(JSON.parse(localStorage.getItem("cart"))) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      state.items.push(action.payload);
    },
    removeItemFromCart(state, action) {
      const { color, size, id } = action.payload;
      state.items = state.items.filter(
        (item) =>
          !(item.color === color && item.size === size && item.id === id)
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
