// src/store/ingredientsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export const fetchTitles = createAsyncThunk(
  "ingredients/fetchTitles",
  async (_, { rejectWithValue }) => {
    console.log("fetching titles");
    try {
      const titlesCollection = collection(db, "recipes");
      const querySnapshot = await getDocs(titlesCollection);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title || "",
      }));
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const titlesSlice = createSlice({
  name: "titles",
  initialState: {
    titles: [],
    error: null,
    titlesFetched: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTitles.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchTitles.fulfilled, (state, action) => {
        state.titles = action.payload;
        state.titlesFetched = true;
      })
      .addCase(fetchTitles.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default titlesSlice.reducer;
