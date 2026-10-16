import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const calculateCartTotals = (cart) => {
  const cartTotal = cart.cartItems.reduce(
    (total, item) => total + item.price * item.amount,
    0,
  );
  const numItemsInCart = cart.cartItems.reduce(
    (total, item) => total + item.amount,
    0,
  );
  const tax = 0.1 * cartTotal;
  const orderTotal = cartTotal + cart.shipping + tax;

  return {
    ...cart,
    cartTotal,
    numItemsInCart,
    tax,
    orderTotal,
  };
};

const getCartFromLocalStorage = () => {
  // we parse cause we have it as a string
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart) return defaultState;
  // rebuild totals from items (fixes old/corrupt saved totals)
  return calculateCartTotals(cart);
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload;
      const item = state.cartItems.find((i) => i.cartID === product.cartID);
      if (item) {
        item.amount += product.amount;
      } else {
        state.cartItems.push(product);
      }
      cartSlice.caseReducers.calculateTotals(state);
      toast.success("Item added to cart");
    },
    clearCart: (state) => {
      localStorage.setItem("cart", JSON.stringify(defaultState));
      return defaultState;
    },
    removeItem: (state, action) => {
      const { cartID } = action.payload;
      state.cartItems = state.cartItems.filter((i) => i.cartID !== cartID);
      cartSlice.caseReducers.calculateTotals(state);
      toast.error("Item removed from cart");
    },
    editItem: (state, action) => {
      const { cartID, amount } = action.payload;
      const item = state.cartItems.find((i) => i.cartID === cartID);
      item.amount = amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.success("Cart updated");
    },
    calculateTotals: (state) => {
      state.cartTotal = state.cartItems.reduce(
        (total, item) => total + item.price * item.amount,
        0,
      );
      state.numItemsInCart = state.cartItems.reduce(
        (total, item) => total + item.amount,
        0,
      );
      state.tax = 0.1 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions;
export default cartSlice.reducer;
