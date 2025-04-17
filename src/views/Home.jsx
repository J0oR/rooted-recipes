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



export default function Home() {
  const { data, loading } = useSelector((state) => state.recipes);
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const titles = useSelector((state) => state.titles.titles);
  const favourites = useSelector((state) => state.favourites.recipes);

  useEffect(() => {
    //apiFetchDbSave();
    //clearDB();
    
    if (!ingredients.length) {
      console.log("fetching ingredients once");
      dispatch(fetchIngredients());
    }
    if (!titles.length) {
      console.log("fetching titles once");
      dispatch(fetchTitles());
    }
  }, []);

  useEffect(() => {
    if (user && !favourites.length) {
      console.log("fetching favourites once");
      dispatch(fetchFavourites(user.uid));
    }
  }, [user, dispatch]);

  //if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <FilteringContainer>
        <SearchInput />
        <DishTypes />
      </FilteringContainer>
      <RecipesCards recipes={data} loading={loading} />
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