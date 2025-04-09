import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../config/firebase";
import { query, getDocs, collection, limit, where } from "firebase/firestore";
import { act } from "react";

export const fetchRecipes = createAsyncThunk("recipes/fetchRecipes" ,
  async ({ clickedSearchTerm, dishType }, { rejectWithValue }) => {
    try {
      let q;
      if (clickedSearchTerm && dishType) {
        q = query(collection(db, "recipes"), where("ingredientsNames", "array-contains", clickedSearchTerm.toLowerCase()));
      } else if (!clickedSearchTerm && dishType) {
        q = query(collection(db, "recipes"), where("dishTypes", "array-contains", dishType), limit(30));
      } else if (!clickedSearchTerm && !dishType){
        q = query(collection(db, "recipes"), limit(30));
      }

      const querySnapshot = await getDocs(q);
      let recipes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (clickedSearchTerm && dishType) {
        recipes = recipes.filter((r) => r.dishTypes.includes(dishType.toLowerCase()));
      }
      return recipes;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const recipeSlice = createSlice({
  name: "recipes",
  initialState: {
    searchTerm: "",
    clickedSearchTerm: "",
    dishType: "",
    suggestions: [],
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setClickedSearchTerm: (state, action) => {
      state.clickedSearchTerm = action.payload;
    },
    setDishType: (state, action) => {
      state.dishType = action.payload;
      console.log(action);
    },
    setSuggestions: (state, action) => {
      state.suggestions = action.payload;
    },
    clearSuggestions: (state) => {
      state.suggestions = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        console.log(action.payload);
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const {
  setSearchTerm,
  setClickedSearchTerm,
  setDishType,
  setSuggestions,
  clearSuggestions,
} = recipeSlice.actions;

export default recipeSlice.reducer;
