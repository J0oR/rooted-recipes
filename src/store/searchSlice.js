import { createSlice } from "@reduxjs/toolkit";


const searchSlice = createSlice({
  name: "recipes",
  initialState: {
    searchTerm: "",
    suggestions: [],
    clickedSuggestion: "",
    dishType: "",
    loading: false,
    error: null,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setClickedSuggestion: (state, action) => {
      state.clickedSuggestion = action.payload;
    },
    setDishType: (state, action) => {
      state.dishType = action.payload;
      console.log(action);
    },
    setSuggestions: (state, action) => {
      state.suggestions = action.payload;
    },
   /*  clearSuggestions: (state) => {
      state.suggestions = [];
    }, */
  }
});

export const {
  setSearchTerm,
  setClickedSuggestion,
  setDishType,
  setSuggestions,
  clearSuggestions,
} = searchSlice.actions;

export default searchSlice.reducer;
