import { createSlice } from "@reduxjs/toolkit";
import { db } from "../../config/firebase";
import { doc, getDoc, query, getDocs, collection, limit, where, startAfter } from "firebase/firestore";
import { fetchRecipes } from "./asyncThunks";

const recipeSlice = createSlice({
  name: "recipes",
  initialState: {
    data: [],
    backupData: [],
    loading: false,
    error: null,
    lastDocId: null,
    hasMore: true,
    searchMode: "title",
    fetchedIds: [], // 👈 aggiungi questo

  },
  reducers: {
    addFetchedIds: (state, action) => {
      state.fetchedIds.push(...action.payload);
    },
    setSearchMode: (state, action) => {
      console.log("setSearchMode", action.payload);
      state.searchMode = action.payload;
    },
    setLastDocId: (state, action) => {
      state.lastDocId = action.payload;
    },
    filterDataByDishType: (state, action) => {
      if (action.payload !== "all") {
        state.data = state.backupData.filter((r) =>
          r.dishTypes.includes(action.payload.toLowerCase())
        );
      } else {
        state.data = state.backupData;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        const { recipes, lastDocId, hasMore, searchMode } = action.payload;

        state.data = state.lastDocId ? [...state.data, ...recipes] : recipes;
        state.backupData = state.data;
        state.lastDocId = lastDocId;
        state.searchMode = searchMode;
        state.hasMore = hasMore;
        state.loading = false;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { filterDataByDishType, setSearchMode, setLastDocId, addFetchedIds } = recipeSlice.actions;

export default recipeSlice.reducer;
