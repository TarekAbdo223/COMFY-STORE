import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice"; // ← this is line 27

export const store = configureStore({
  reducer: {
    cartState: cartReducer,
  },
});
