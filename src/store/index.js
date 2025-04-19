// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./ingredientsSlice";
import recipesReducer from "./recipes/recipesSlice";
import titlesReducer from "./titlesSlice";
import searchReducer from "./searchSlice";
import favouritesReducer from "./favouriteSlice";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    titles: titlesReducer,
    recipes: recipesReducer,
    search: searchReducer,
    favourites: favouritesReducer
  },
});
