// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./ingredientsSlice";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
  },
});
