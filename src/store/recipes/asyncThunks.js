import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../config/firebase";
import { doc, getDoc, query, getDocs, collection, limit, where, startAfter } from "firebase/firestore";
import { setSearchMode, setLastDocId, addFetchedIds, setHasMore, resetData, resetFetchedIds } from "./recipesSlice";
import { setPrevSearchTerm, setPrevDishType } from "../searchSlice";


/*
* FUNCTION TO FETCH DOCUMENTS
*/
const fetchDocs = async (constraints, fetchedIds = [], remaining = 0) => {
  const snapshot = await getDocs(query(collection(db, "recipes"), ...constraints));
  const allDocs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  if (fetchedIds.length) {
    const filtered = allDocs.filter(doc => !fetchedIds.includes(doc.id)).slice(0, remaining);
    return filtered;
  }
  return allDocs;
};

/*
* FUNCTION TO BUILD QUERY CONSTRAINTS
*/
const buildQuery = async ({ searchTerm, searchMode, lastDocId, dishType }) => {
  const constraints = [];
  if (searchTerm) {
    constraints.push(where(searchMode === "title" ? "titleSplitted" : "ingredientsNames", "array-contains", searchTerm.toLowerCase()));
  }
  if (dishType && dishType !== "all") {
    constraints.push(
      where(`dishTypes.${dishType}`, "==", true)
    );
  }
  constraints.push(limit(10));

  if (lastDocId) {
    const lastDoc = await getDoc(doc(db, "recipes", lastDocId));
    constraints.push(startAfter(lastDoc));
  }
  return constraints;
};

/*
* FUNCTION TO FETCH RECIPES, BASED ON SEARCH TERM AND PAGINATION
* - if search term is empty, it fetches all recipes
* - if search term is not empty, it fetches by title match first, then by ingredients match
* - it halso handles pagination, by keeping track of lastDocId
*/
export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const { searchTerm, prevSearchTerm, dishType, prevDishType } = getState().search;

      if (searchTerm !== prevSearchTerm) {
        dispatch(setPrevSearchTerm(searchTerm));
      }

      if (dishType !== prevDishType) {
        dispatch(setPrevDishType(dishType));
      }

      if (searchTerm !== prevSearchTerm || dishType !== prevDishType) {
        dispatch(resetData());
        dispatch(resetFetchedIds());
        dispatch(setSearchMode("title"));
        dispatch(setLastDocId(null));
      }

      let { lastDocId, searchMode, fetchedIds } = getState().recipes;
      const results = [];
      let remaining = 10;

      // Title search (also works if search term is empty)
      if (searchMode === "title") {
        const titleConstraints = await buildQuery({ searchTerm, searchMode: "title", lastDocId, dishType });
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
        const ingredientConstraints = await buildQuery({ searchTerm, searchMode: "ingredient", lastDocId, dishType });
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
        hasMore: results.length === 10,
        searchMode: getState().recipes.searchMode,
        dishType: dishType
      };
    } catch (err) {
      console.error("fetchRecipes error:", err);
      return rejectWithValue(err.message || "Unknown error");
    }
  }
);
