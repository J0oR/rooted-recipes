import React from "react";
import RecipeCard from "./RecipeCard";
import styled from "styled-components";
import LoadingSpinner from "../../common/LoadingSpinner";

export default function RecipesCards({ recipes, loading }) {
  if (loading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <CardsContainer>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </CardsContainer>
  );
}

const CardsContainer = styled.div`
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow-y: scroll;
  height: 100vh;
  width: 100vw;
  padding: 75px 10vw;
  bottom: 0;
  gap: 50px;
`;