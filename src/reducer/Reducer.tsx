// src/reducer/Reducer.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface gCartState {
  items: { id: number; quantity: number }[];
}

const initialState: gCartState = {
  items: [],
};

const gcartSlice = createSlice({
  name: 'gcart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<number>) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ id: action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = gcartSlice.actions;
export const gcart = gcartSlice.reducer;

export default gcart;
