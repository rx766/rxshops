import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log('🛒 Cart Reducer - addToCart called:', {
        host: typeof window !== 'undefined' ? window.location.hostname : 'server',
        payload: action.payload,
        currentCartSize: state.items.length
      });
      
      const { product, quantity = 1, size, color } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.product._id === product._id && 
                 item.size === size && 
                 item.color === color
      );

      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += quantity;
      } else {
        state.items.push({
          product,
          quantity,
          size,
          color,
          price: product.discountPrice || product.price,
        });
      }
      cartSlice.caseReducers.calculateTotals(state);
    },
    removeFromCart: (state, action) => {
      const { productId, size, color } = action.payload;
      state.items = state.items.filter(
        item => !(item.product._id === productId && 
                  item.size === size && 
                  item.color === color)
      );
      cartSlice.caseReducers.calculateTotals(state);
    },
    updateQuantity: (state, action) => {
      const { productId, size, color, quantity } = action.payload;
      const itemIndex = state.items.findIndex(
        item => item.product._id === productId && 
                item.size === size && 
                item.color === color
      );
      
      if (itemIndex !== -1) {
        if (quantity <= 0) {
          state.items.splice(itemIndex, 1);
        } else {
          state.items[itemIndex].quantity = quantity;
        }
        cartSlice.caseReducers.calculateTotals(state);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
    calculateTotals: (state) => {
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce(
        (total, item) => total + (item.price * item.quantity), 
        0
      );
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export const selectCart = (state) => state.cart;
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => state.cart.totalAmount;
export const selectCartQuantity = (state) => state.cart.totalQuantity;

export default cartSlice.reducer;