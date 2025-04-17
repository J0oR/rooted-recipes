import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../config/firebase";
import { doc, getDoc, query, getDocs, collection, limit, where } from "firebase/firestore";


export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async ({ searchTerm, titles, suggestions }, { rejectWithValue }) => {
    try {
      const baseQuery = collection(db, "recipes");
      let q;

      if (searchTerm) {
        const matchingIds = titles.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 10).map((m) => m.id);


        console.log(matchingIds.length, suggestions.length);
        if (!matchingIds.length && !suggestions.length) return []; // No matches = early return

        if (matchingIds.length) {
          if (matchingIds.length > 10) matchingIds.length = 10;
          q = query(baseQuery, where("__name__", "in", matchingIds), limit(10));
        }
        else if (suggestions.length) {
          q = query(baseQuery, where("ingredientsNames", "array-contains", searchTerm.toLowerCase()), limit(10));
        }
      }
      else {
        q = query(baseQuery, limit(10));
      }
      // 3. Filter by dish type only
      /* else if (dishType) {
        console.log("c");
        q = query(baseQuery, where("dishTypes", "array-contains", dishType.toLowerCase()), limit(30));
      } */
      // 4. Default fallback (no filters)
      /* else {
        console.log("d");
        q = query(baseQuery, limit(30));
      } */

      const snapshot = await getDocs(q);
      let recipes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      

      return recipes;
    } catch (err) {
      console.error("🔥 fetchRecipes error:", err);
      return rejectWithValue(err.message || "Unknown error");
    }
  }
);


const recipeSlice = createSlice({
  name: "recipes",
  initialState: {
    data: [],
    backupData: [],
    loading: false,
    error: null,
  },
  reducers: {
    filterDataByDishType: (state, action) => {
      if (action.payload !== "all"){
        state.data = state.backupData.filter((r) =>
          r.dishTypes.includes(action.payload.toLowerCase())
        );
      }
      else
      {
        console.log("resetting");
        state.data = state.backupData;
      }
      
    }
    /* setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setClickedSuggestion: (state, action) => {
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
    }, */
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.data = action.payload;
        state.backupData = action.payload;
        state.loading = false;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const {filterDataByDishType} = recipeSlice.actions;

export default recipeSlice.reducer;
