// src/redux/slices/favouritesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../config/firebase";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";

// Async thunk: fetch favourite recipes
export const fetchFavourites = createAsyncThunk(
  "favourites/fetchFavourites",
  async (uid) => {
    const heartedQuery = query(collection(db, "heartedRecipes"), where("uid", "==", uid));
    const heartedSnap = await getDocs(heartedQuery);
    const recipeIds = heartedSnap.docs.map((doc) => doc.data().recipeId);

    const recipePromises = recipeIds.map(async (id) => {
      const recipeRef = doc(db, "recipes", id.toString());
      const recipeSnap = await getDoc(recipeRef);
      return recipeSnap.exists() ? { id, ...recipeSnap.data() } : null;
    });

    const fetchedRecipes = await Promise.all(recipePromises);
    return {
      ids: recipeIds,
      recipes: fetchedRecipes.filter((r) => r !== null),
    };
  }
);

const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    recipeIds: [],
    recipes: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearFavourites: (state) => {
      state.recipeIds = [];
      state.recipes = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavourites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavourites.fulfilled, (state, action) => {
        state.loading = false;
        state.recipeIds = action.payload.ids;
        state.recipes = action.payload.recipes;
      })
      .addCase(fetchFavourites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearFavourites } = favouritesSlice.actions;
export default favouritesSlice.reducer;
