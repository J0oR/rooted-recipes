import { useEffect, useState } from "react";
import RecipesCards from "../components/home/recipes/RecipesCards";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients } from "../store/ingredientsSlice";
import { fetchTitles } from "../store/titlesSlice";
import { db, auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { fetchFavourites } from "../store/favouriteSlice";
import { apiFetchDbSave } from "../utils/apiFetchDbSave";
import DishTypes from "../components/home/search/DishTypes";
import styled from "styled-components";
import SearchInput from "../components/home/search/SearchInput";
import Button from "../components/common/Button";
import { fetchRecipes } from "../store/recipesSlice";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  limit,
  startAfter,
} from "firebase/firestore";

async function clearDB() {
  const recipesRef = collection(db, "recipes");
  let lastDoc = null;
  let deletedCount = 0;
  let keepGoing = true;

  while (keepGoing) {
    let q = query(recipesRef, limit(100));
    if (lastDoc) {
      q = query(recipesRef, startAfter(lastDoc), limit(100));
    }

    const snapshot = await getDocs(q);
    if (snapshot.empty) break;

    const deletions = [];
    snapshot.docs.forEach((docSnap) => {
      const data = docSnap.data();
      if (!data.summary || data.summary.trim() === "") {
        deletions.push(deleteDoc(doc(db, "recipes", docSnap.id)));
        console.log(`Scheduled delete: ${docSnap.id}`);
      }
    });

    await Promise.all(deletions);
    deletedCount += deletions.length;
    console.log(`Deleted ${deletedCount} recipes so far...`);

    lastDoc = snapshot.docs[snapshot.docs.length - 1];
    keepGoing = snapshot.size === 100;
  }

  console.log(`✅ Cleanup finished. Total deleted: ${deletedCount}`);
}


export default function Home() {
  const { data, loading, lastDocId } = useSelector((state) => state.recipes);
  const {searchTerm, suggestions} = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const titles = useSelector((state) => state.titles.titles);
  const favourites = useSelector((state) => state.favourites.recipes);

  /* 
  * STARTUP TASKS: 
  * - fetch data from Api and save to DB
  * - fetch ingredients & titles for filtering, but also 
  * - clear database, if needed
  */
  useEffect(() => {
    //apiFetchDbSave();
    //clearDB();
    
    if (!ingredients.length) {
      console.log("fetching ingredients on Startup");
      dispatch(fetchIngredients());
    }
    if (!titles.length) {
      console.log("fetching titles on Startup");
      dispatch(fetchTitles());
    }
    
  }, [dispatch]);

  useEffect(() => {
    if (user && !favourites.length) {
      console.log("fetching favourites on Startup, if user is logged in");
      dispatch(fetchFavourites(user.uid));
    }
  }, [user, dispatch]);

  /*
  */
  const loadMoreRecipes = () => {
    console.log("loading more recipes");
    // Fetch altre ricette se c'è un lastDoc disponibile
    if (lastDocId) {
      dispatch(fetchRecipes({ searchTerm, titles, suggestions, lastDocId }));
    }
  };
 
  //if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <FilteringContainer>
        <SearchInput />
        <DishTypes />
      </FilteringContainer>
      <RecipesCards recipes={data} loading={loading} />
      <button onClick={loadMoreRecipes} disabled={loading}>Load more...</button>
    </>
  );
}



const FilteringContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  padding-bottom: 0;
  margin-top: 50px;
`;