import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../config/firebase";
import { doc, getDoc, query, getDocs, collection, limit, where, startAfter } from "firebase/firestore";
import { setSearchMode, setLastDocId, addFetchedIds } from "./recipesSlice";

// Helper function to get title matches
/* const getTitleMatches = (titles, term) => {
  if (!Array.isArray(titles)) {
    console.error("Titles is not an array:", titles);
    return [];
  }

  return titles
    .filter(item => item && item.title && item.title.toLowerCase().includes(term.toLowerCase()))
    .slice(0, 10)
    .map(m => m.id);  // Returning the IDs of the matched titles
};
 */
// Function to build query constraints
const buildQueryConstraints = async ({
  searchTerm,
  searchMode,
  lastDocId
}) => {
  const constraints = [];

  if (searchMode === "title") {
    constraints.push(where("titleSplitted", "array-contains", searchTerm.toLowerCase()));
  } else {
    constraints.push(where("ingredientsNames", "array-contains", searchTerm.toLowerCase()));
  }
  constraints.push(limit(10)); // Limit to 10 results per query 


  if (lastDocId) {
    const lastDocRef = doc(db, "recipes", lastDocId);
    const lastDoc = await getDoc(lastDocRef);
    constraints.push(startAfter(lastDoc)); // Paginate based on the last document
  }


  return constraints;
};

// Create the fetchRecipes async thunk
export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const { searchTerm, dishType } = getState().search;
      const { lastDocId, searchMode, fetchedIds } = getState().recipes;

      const results = [];
      let remaining = 10;

      console.log("Before entering step 1/2", searchMode, searchTerm, lastDocId);

      // Step 1 – fetch from titleSplitted
      if (searchMode === "title") {

        // First, we fetch title-based results
        const constraints = await buildQueryConstraints({
          searchTerm,
          searchMode: "title",
          lastDocId,
          dishType
        });

        console.log("Constraints:", constraints);

        // Fetch title-based results
        const snapshot = await getDocs(query(collection(db, "recipes"), ...constraints));
        const docs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        console.log(snapshot);

        // Filter out already fetched IDs, and add them to the results
        const filtered = docs.filter(doc => !fetchedIds.includes(doc.id));
        results.push(...filtered);
        remaining = 10 - results.length;

        if (remaining > 0) {
          // Switch search mode to ingredients
          dispatch(setSearchMode("ingredient")); // action nello slice
        }

        // Save lastDocId from this round if there are still docs
        if (snapshot.docs.length) {
          dispatch(setLastDocId(snapshot.docs[snapshot.docs.length - 1].id));
        }
      }
      // Step 2 – fill remaining with ingredient-based search
      if (remaining > 0) {
        const constraints = await buildQueryConstraints({
          searchTerm,
          searchMode: "ingredient",
          lastDocId: null, // start fresh
          dishType,
        });

        const snapshot = await getDocs(query(collection(db, "recipes"), ...constraints));
        const docs = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(doc => !fetchedIds.includes(doc.id))
          .slice(0, remaining); // Only take what you need

        results.push(...docs);

        // Save lastDocId if there are still docs
        if (snapshot.docs.length) {
          dispatch(setLastDocId(snapshot.docs[snapshot.docs.length - 1].id));
        }
      }


      dispatch(addFetchedIds(results.map(r => r.id))); // Update fetchedIds in store

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
