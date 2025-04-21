import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../config/firebase";
import { doc, getDoc, query, getDocs, collection, limit, where, startAfter } from "firebase/firestore";
import { setSearchMode, setLastDocId, addFetchedIds } from "./recipesSlice";


const fetchDocs = async (constraints, fetchedIds = [], remaining = 0) => {
  const snapshot = await getDocs(query(collection(db, "recipes"), ...constraints));
  if (fetchedIds.length) {
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(doc => !fetchedIds.includes(doc.id))
      .slice(0, remaining);
  }
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Function to build query constraints
const buildQuery = async ({
  searchTerm,
  searchMode,
  lastDocId
}) => {
  const constraints = [];

  if (searchMode === "title") {
    constraints.push(where("titleSplitted", "array-contains", searchTerm.toLowerCase()));
  } else if (searchMode === "ingredient") {
    constraints.push(where("ingredientsNames", "array-contains", searchTerm.toLowerCase()));
  }
  constraints.push(limit(10)); // Limit to 10 results per query 


  if (lastDocId) {
    const lastDocRef = doc(db, "recipes", lastDocId);
    const lastDoc = await getDoc(lastDocRef);
    constraints.push(startAfter(lastDoc));
  }

  return constraints;
};

// Create the fetchRecipes async thunk
export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const { searchTerm } = getState().search;
      const { lastDocId, searchMode, fetchedIds } = getState().recipes;

      console.log((searchMode));

      const results = [];
      let remaining = 10;
      let constraints = [];

      console.log("Before entering step 1/2", searchMode, searchTerm, lastDocId);

      if (searchMode === "title" && searchTerm === "") {
        constraints = await buildQuery({ searchTerm, searchMode: "none", lastDocId });
      }

      if (searchMode === "title" && searchTerm !== "") {
        constraints = await buildQuery({ searchTerm, searchMode: "title", lastDocId });

        // Fetch title-based results
        const docs = await fetchDocs(constraints);

        // Filter out already fetched IDs, and add them to the results
        /* const filtered = docs.filter(doc => !fetchedIds.includes(doc.id));
        results.push(...filtered); */
        results.push(...docs);
        remaining = 10 - docs.length;

        if (remaining > 0) {
          // Switch search mode to ingredients
          dispatch(setSearchMode("ingredient")); // action nello slice
        }

        // Save lastDocId from this round if there are still docs
        if (docs.length) {
          dispatch(setLastDocId(docs[docs.length - 1].id));
        }
        // Update fetchedIds in store
        dispatch(addFetchedIds(results.map(r => r.id)));
      }

      // Step 2 – fill remaining with ingredient-based search
      if (remaining > 0) {
        constraints = await buildQuery({ searchTerm, searchMode: "ingredient", lastDocId: lastDocId });

        const docsIng = await fetchDocs(constraints, fetchedIds, remaining);
        results.push(...docsIng);

        // Save lastDocId if there are still docs
        if (docsIng.length) {
          dispatch(setLastDocId(docsIng[docsIng.length - 1].id));
        }
      }

      // Update fetchedIds in store
      dispatch(addFetchedIds(results.map(r => r.id)));

      return {
        recipes: results,
        lastDocId: results.length ? results[results.length - 1].id : null,
        hasMore: results.length === 10,
        searchMode: getState().recipes.searchMode,
      };



    } catch (err) {
      console.error("🔥 fetchRecipes error:", err);
      return rejectWithValue(err.message || "Unknown error");
    }
  }
);
