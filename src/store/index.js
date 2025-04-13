// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./ingredientsSlice";
import recipesReducer from "./recipesSlice";
import titlesReducer from "./titlesSlice";
import searchReducer from "./searchSlice";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    titles: titlesReducer,
    recipes: recipesReducer,
    search: searchReducer
  },
});
