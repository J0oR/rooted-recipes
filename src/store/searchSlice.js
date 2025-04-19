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
      console.log(action);
    },
    setSuggestions: (state, action) => {
      state.suggestions = action.payload;
    },
  }
});

export const {
  setSearchTerm,
  setDishType,
  setSuggestions,
  clearSuggestions,
} = searchSlice.actions;

export default searchSlice.reducer;
