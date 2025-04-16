import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../config/firebase";
import { doc, getDoc, query, getDocs, collection, limit, where } from "firebase/firestore";


export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async ({ clickedSuggestion, dishType, debouncedSearchTerm, titles }, { rejectWithValue }) => {
    try {
      const baseQuery = collection(db, "recipes");
      let q;

      // 1. Filter by ingredient suggestion
      if (clickedSuggestion) {
        console.log("a");
        q = query(baseQuery, where("ingredientsNames", "array-contains", clickedSuggestion.toLowerCase()));
      }
      // 2. Filter by debounced search term
      else if (debouncedSearchTerm) {
        console.log("b");
        const matchingIds = titles.filter((item) => item.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())).slice(0, 10).map((m) => m.id);

        if (!matchingIds.length) return []; // No matches = early return
        if (matchingIds.length > 10) {
          matchingIds.length = 10; // Truncate to 10 max
        }

        q = query(baseQuery, where("__name__", "in", matchingIds));
      }
      // 3. Filter by dish type only
      else if (dishType) {
        console.log("c");
        q = query(baseQuery, where("dishTypes", "array-contains", dishType.toLowerCase()), limit(30));
      }
      // 4. Default fallback (no filters)
      else {
        console.log("d");
        q = query(baseQuery, limit(30));
      }

      const snapshot = await getDocs(q);
      let recipes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // 5. In-memory filtering for combinations
      if ((clickedSuggestion || debouncedSearchTerm) && dishType) {
        recipes = recipes.filter((r) =>
          r.dishTypes.includes(dishType.toLowerCase())
        );
      }

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
    loading: false,
    error: null,
  },
  reducers: {
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
        state.loading = false;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});


export default recipeSlice.reducer;
