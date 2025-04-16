import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async (_, { rejectWithValue }) => {
    console.log("fetching ingredients");
    try {
      const ingredientsCollection = collection(db, "ingredients");
      const querySnapshot = await getDocs(ingredientsCollection);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: {
    ingredients: [],
    error: null,
    fetched: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.fetched = true;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default ingredientsSlice.reducer;
