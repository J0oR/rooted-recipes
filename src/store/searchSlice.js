import { createSlice } from "@reduxjs/toolkit";


const searchSlice = createSlice({
  name: "recipes",
  initialState: {
    searchTerm: "",
    prevSearchTerm: "",
    suggestions: [],
    dishType: "all",
    prevDishType: "all",
    error: null,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setPrevSearchTerm: (state, action) => {
      state.prevSearchTerm = action.payload;
    },
    setDishType: (state, action) => {
      state.dishType = action.payload;
    },
    setPrevDishType: (state, action) => {
      state.prevDishType = action.payload;
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
  setPrevDishType,
  setSuggestions,
  clearSuggestions,
  filterSuggestions,
  setPrevSearchTerm
} = searchSlice.actions;

export default searchSlice.reducer;
