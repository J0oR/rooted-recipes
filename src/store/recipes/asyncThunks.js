import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../config/firebase";
import { doc, getDoc, query, getDocs, collection, limit, where, startAfter } from "firebase/firestore";
import { setSearchMode, setLastDocId, addFetchedIds, setHasMore, resetData, resetFetchedIds } from "./recipesSlice";
import { setPrevSearchTerm } from "../searchSlice";


const fetchDocs = async (constraints, fetchedIds = [], remaining = 0) => {
  const snapshot = await getDocs(query(collection(db, "recipes"), ...constraints));
  const allDocs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  if (fetchedIds.length) {
    const filtered = allDocs.filter(doc => !fetchedIds.includes(doc.id)).slice(0, remaining);
    return filtered;
  }
  return allDocs;
};

// Function to build query constraints
const buildQuery = async ({ searchTerm, searchMode, lastDocId }) => {
  const constraints = [];
  if (searchTerm) {
    const fieldRef = searchMode === "title" ? "titleSplitted" : "ingredientsNames";
    constraints.push(where(fieldRef, "array-contains", searchTerm.toLowerCase()));
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
      const { searchTerm, prevSearchTerm } = getState().search;

      if (searchTerm !== prevSearchTerm) {
        dispatch(setPrevSearchTerm(searchTerm));
        dispatch(resetData());
        dispatch(resetFetchedIds());
      }

      let { lastDocId, searchMode, fetchedIds } = getState().recipes;
      const results = [];
      let remaining = 10;

      if (searchMode === "title") {
        const titleConstraints = await buildQuery({ searchTerm, searchMode: "title", lastDocId });
        const titleFiltered = await fetchDocs(titleConstraints, fetchedIds, remaining);

        results.push(...titleFiltered);
        remaining -= titleFiltered.length;

        fetchedIds = [...fetchedIds, ...titleFiltered.map(d => d.id)];

        if (titleFiltered.length) {
          dispatch(setLastDocId(titleFiltered[titleFiltered.length - 1].id));
        }

        if (remaining > 0) {
          dispatch(setSearchMode("ingredient"));
          searchMode = "ingredient";
        }
      }

      // Ingredient search (either from start or after switch)
      if (searchMode === "ingredient" && remaining > 0) {
        const ingredientConstraints = await buildQuery({ searchTerm, searchMode: "ingredient", lastDocId });
        const ingFiltered = await fetchDocs(ingredientConstraints, fetchedIds, remaining);

        results.push(...ingFiltered);

        fetchedIds = [...fetchedIds, ...ingFiltered.map(d => d.id)];

        if (ingFiltered.length) {
          dispatch(setLastDocId(ingFiltered[ingFiltered.length - 1].id));
        }
        else {
          dispatch(setHasMore(false));
        }

        
        dispatch(addFetchedIds(results.map(r => r.id)));


      }
      return {
        recipes: results,
        lastDocId: results.length ? results[results.length - 1].id : null,
        hasMore: results.length === 10, // or > 0 if you want infinite scroll style
        searchMode: getState().recipes.searchMode,
      };
    } catch (err) {
      console.error("🔥 fetchRecipes error:", err);
      return rejectWithValue(err.message || "Unknown error");
    }
  }
);
