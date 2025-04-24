// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./ingredientsSlice";
import recipesReducer from "./recipes/recipesSlice";
import searchReducer from "./searchSlice";
import favouritesReducer from "./favouriteSlice";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    recipes: recipesReducer,
    search: searchReducer,
    favourites: favouritesReducer
  },
});
