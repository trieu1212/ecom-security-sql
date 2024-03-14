import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    currentCart: [],
    isFetching: false,
    isError: false,
    isSuccess: false,
  },
  reducers: {
    //get user cart
    getUserCartStart: (state) => {
      state.isFetching = true;
    },
    getUserCartError: (state) => {
      state.isError = true;
      state.isFetching = false;
      state.isSuccess = false;
    },
    getUserCartSuccess: (state, action) => {
      state.currentCart = action.payload;
      state.isError = false;
      state.isFetching = false;
      state.isSuccess = true;
    },
    //clear user cart when logout
    clearUserCart(state) {
      state.currentCart = null;
    },
    //add user cart
    addUserCartStart: (state) => {
      state.isFetching = true;
    },
    addUserCartError: (state) => {
      state.isError = true;
      state.isFetching = false;
      state.isSuccess = false;
    },
    addUserCartSuccess: (state, action) => {
      state.currentCart.push(action.payload);
    },
    //update user cart
    updateUserCartStart: (state) => {
      state.isFetching = true;
    },
    updateUserCartError: (state) => {
      state.isError = true;
      state.isFetching = false;
      state.isSuccess = false;
    },
    updateUserCartSuccess: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingProduct = state.currentCart.find(
        (item) => item.productId === productId
      );
      if (existingProduct) {
        existingProduct.quantity += quantity;
      }
    },
    deleteProductFromCartSuccess: (state, action) => {
      state.currentCart = state.currentCart.filter(
        (item) => item.productId !== action.payload
      );
    },
    deleteProductFromCartStart: (state) => {
      state.isFetching = true;
    },
    deleteProductFromCartError: (state) => {
      state.isError = true;
      state.isFetching = false;
      state.isSuccess = false;
    },
  },
});

export const {
  getUserCartStart,
  getUserCartSuccess,
  getUserCartError,
  clearUserCart,
  addUserCartStart,
  addUserCartError,
  addUserCartSuccess,
  updateUserCartStart,
  updateUserCartSuccess,
  updateUserCartError,
  deleteProductFromCartStart,
  deleteProductFromCartSuccess,
  deleteProductFromCartError} = cartSlice.actions;

export default cartSlice.reducer;
