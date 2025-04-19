import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../config/firebase";
import { doc, getDoc, query, getDocs, collection, limit, where, startAfter } from "firebase/firestore";

// Helper function to get title matches
const getTitleMatches = (titles, term) => {
  if (!Array.isArray(titles)) {
    console.error("Titles is not an array:", titles);
    return [];
  }

  return titles
    .filter(item => item && item.title && item.title.toLowerCase().includes(term.toLowerCase()))
    .slice(0, 10)
    .map(m => m.id);  // Returning the IDs of the matched titles
};

// Function to build query constraints
const buildQueryConstraints = async ({
  searchTerm,
  titles,
  lastDocId,
  prevMode,
  isTitleQuery,
  excludedIds = []
}) => {
  const constraints = [];
  let searchMode = prevMode;

  if (isTitleQuery) {
    // Title search: Fetch based on title matches
    const titleIds = getTitleMatches(titles, searchTerm);
    if (titleIds.length >= 2) {
      constraints.push(where("__name__", "in", titleIds)); // Query by the IDs of the matched titles
      searchMode = "title";
    } else {
      constraints.push(where("ingredientsNames", "array-contains", searchTerm.toLowerCase()));
      searchMode = "ingredient";
    }
  } else {
    // Ingredient search: Fetch based on ingredients
    constraints.push(where("ingredientsNames", "array-contains", searchTerm.toLowerCase()));
    if (excludedIds.length > 0) {
      constraints.push(where("__name__", "not-in", excludedIds)); // Exclude already fetched titles based on IDs
    }
    if (lastDocId) {
      const lastDocRef = doc(db, "recipes", lastDocId);
      const lastDoc = await getDoc(lastDocRef);
      constraints.push(startAfter(lastDoc)); // Paginate based on the last document
    }
    searchMode = "ingredient";
  }

  constraints.push(limit(10)); // Limit to 10 results per query
  return { constraints, searchMode };
};

// Create the fetchRecipes async thunk
export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { titles } = getState().titles; // Get the titles from the state
      const { searchTerm } = getState().search; // Get the search term from the state
      const { lastDocId, searchMode: prevMode } = getState().recipes; // Get the last doc ID and search mode from the state

      let titleResults = [];
      let ingredientResults = [];
      let titleIds = [];
      let newLastDocId = null;
      let hasMore = false;

      // First, we fetch title-based results
      const { constraints: titleConstraints, searchMode: titleSearchMode } = await buildQueryConstraints({
        searchTerm,
        titles,
        lastDocId,
        prevMode,
        isTitleQuery: true,
      });

      const titleSnapshot = await getDocs(query(collection(db, "recipes"), ...titleConstraints));
      const titleDocs = titleSnapshot.docs;
      titleResults = titleDocs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      titleIds = titleResults.map(doc => doc.id); // Store the IDs of fetched titles
      hasMore = titleDocs.length === 10; // Check if there are more title results
      newLastDocId = titleDocs.length ? titleDocs[titleDocs.length - 1].id : null;

      // Then, we fetch ingredient-based results, if there are more pages (pagination)
      const { constraints: ingredientConstraints, searchMode: ingredientSearchMode } = await buildQueryConstraints({
        searchTerm,
        titles,
        lastDocId: newLastDocId,
        prevMode: titleSearchMode,
        isTitleQuery: false,
        excludedIds: titleIds, // Exclude already fetched titles based on IDs
      });

      const ingredientSnapshot = await getDocs(query(collection(db, "recipes"), ...ingredientConstraints));
      const ingredientDocs = ingredientSnapshot.docs;
      ingredientResults = ingredientDocs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Set new last document ID for ingredient results
      newLastDocId = ingredientDocs.length ? ingredientDocs[ingredientDocs.length - 1].id : newLastDocId;

      const hasMoreIngredientResults = ingredientDocs.length === 10; // Check if there are more ingredient results
      hasMore = hasMore || hasMoreIngredientResults; // Combine title and ingredient pagination status

      // Combine title-based and ingredient-based results
      const allRecipes = [...titleResults, ...ingredientResults];

      return {
        recipes: allRecipes,
        lastDocId: newLastDocId, // Return the last document ID for pagination
        searchTerm,
        hasMore,
        searchMode: ingredientSearchMode,
      };
    } catch (err) {
      console.error("🔥 fetchRecipes error:", err);
      return rejectWithValue(err.message || "Unknown error");
    }
  }
);
