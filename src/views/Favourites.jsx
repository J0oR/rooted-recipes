import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { fetchFavourites, clearFavourites } from "../store/favouriteSlice";
import { useSelector, useDispatch } from "react-redux";
import RecipesCards from "../components/recipeCards/RecipesCards";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoadingSpinner from "../components/common/LoadingSpinner";


export default function Favourites() {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const {recipes, loading } = useSelector((state) => state.favourites);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      //dispatch(fetchFavourites(user.uid));
      console.log(recipes);
    } else {
      dispatch(clearFavourites());
      navigate("/");
    }
  }, [user, dispatch, navigate]);


  if (recipes.length === 0 && !loading)
    return <EmptyContainer>No recipes found</EmptyContainer>

  return (
    <div>
      <RecipesCards recipes={recipes} />
      {loading && <LoadingSpinner />}
    </div>
  );
}

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  padding-bottom: 0;
  margin-top: 100px;
  font-size: 1.2rem;
`;