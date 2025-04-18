import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../config/firebase";
import { doc, getDoc, query, getDocs, collection, limit, where, startAfter, orderBy } from "firebase/firestore";


export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async ({ searchTerm, titles, suggestions, lastDocId, searchTermChange }, { rejectWithValue }) => {
    
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

      // Aggiungi la paginazione con startAfter se lastDoc è disponibile
      if (lastDocId) {
        const lastDocRef = doc(db, "recipes", lastDocId); // ✅ create a doc reference
        const lastDoc = await getDoc(lastDocRef);         // ✅ get the snapshot
        q = query(q, startAfter(lastDoc));
      }
      

      const snapshot = await getDocs(q);
      let recipes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));



      // Restituisci le ricette e l'ultimo documento per la paginazione
      // Serialize the lastDoc as just its document ID or other serializable data
      const newLastDoc = snapshot.docs[snapshot.docs.length - 1];
      const newLastDocId = newLastDoc ? newLastDoc.id : null;
      return { recipes, lastDocId: newLastDocId }; // Only return the lastDocId as serializable data

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
    lastDocId: null, // Store only the last document's ID (serializable)

  },
  reducers: {
    filterDataByDishType: (state, action) => {
      if (action.payload !== "all") {
        state.data = state.backupData.filter((r) =>
          r.dishTypes.includes(action.payload.toLowerCase())
        );
      }
      else {
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
        // Aggiungi le nuove ricette a quelle esistenti
        state.data = [...state.data, ...action.payload.recipes];
        state.backupData = state.data;
        state.lastDocId = action.payload.lastDocId; // Store the document ID
        state.loading = false;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { filterDataByDishType } = recipeSlice.actions;

export default recipeSlice.reducer;
