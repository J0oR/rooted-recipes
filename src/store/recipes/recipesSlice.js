import { createSlice } from "@reduxjs/toolkit";
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
    fetchedIds: [],

  },
  reducers: {
    addFetchedIds: (state, action) => {
      state.fetchedIds.push(...action.payload);
    },
    resetFetchedIds: (state) => {
      state.fetchedIds = [];
    },
    setSearchMode: (state, action) => {
      state.searchMode = action.payload;
    },
    setLastDocId: (state, action) => {
      state.lastDocId = action.payload;
    },
    resetData: (state, action) => {
      state.data = [];
      state.backupData = [];
    },
    filterDataByDishType: (state, action) => {
      if (action.payload !== "all") {
        state.data = state.backupData.filter((r) =>
          r.dishTypes.includes(action.payload.toLowerCase())
        );
      }
      else {
        state.data = state.backupData;
      }
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        const { recipes, lastDocId, hasMore, searchMode, dishType } = action.payload;

        const newData = state.lastDocId ? [...state.data, ...recipes] : recipes;
        state.data = newData;
        state.backupData = newData;

        state.lastDocId = lastDocId;
        state.searchMode = searchMode;
        state.hasMore = hasMore;
        state.loading = false;
        /* if (dishType && dishType !== "all") {
            state.data = state.backupData.filter((r) =>
              r.dishTypes.dishType === true
            );
          } */
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { filterDataByDishType, setSearchMode, setLastDocId, addFetchedIds, setHasMore, resetData, resetFetchedIds } = recipeSlice.actions;

export default recipeSlice.reducer;
