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
  gap: 50px;
  margin-top: 20px;
  overflow-y: scroll;
  height: calc(100vh - 220px);
  width: 100vw;
  padding: 50px;
  background-color: #fbf5ec;
`;