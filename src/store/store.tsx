// src/store.tsx
import { configureStore } from "@reduxjs/toolkit";

import { gcart } from "../reducer/Reducer";

const store = configureStore({
  reducer: {
    gcart: gcart,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
