import { createSlice } from "@reduxjs/toolkit";


const searchSlice = createSlice({
  name: "recipes",
  initialState: {
    searchTerm: "",
    suggestions: [],
    dishType: "all",
    loading: false,
    error: null,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setDishType: (state, action) => {
      state.dishType = action.payload;
    },
    setSuggestions: (state, action) => {
      state.suggestions = action.payload;
    },
    clearSuggestions: (state) => {
      state.suggestions = [];
    },
    filterSuggestions: (state, action) => {
      const { displayTerm, ingredients } = action.payload;
      if (displayTerm) {
        const matches = ingredients.filter((ing) =>
          ing.nameClean && ing.nameClean.toLowerCase().includes(displayTerm.toLowerCase())
        );
        state.suggestions = matches.slice(0, 10);
      } else {
        state.suggestions = [];
      }
    },
  }
});

export const {
  setSearchTerm,
  setDishType,
  setSuggestions,
  clearSuggestions,
  filterSuggestions
} = searchSlice.actions;

export default searchSlice.reducer;
