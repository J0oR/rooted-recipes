import React from "react";
import RecipeCard from "./RecipeCard";
import styled from "styled-components";

export default function RecipesCards({ recipes, loading }) {

  return (
    <CardsContainer>
      {recipes.map((recipe, index) => (
        <RecipeCard key={`${recipe.id}-${index}`} recipe={recipe} />
      ))}
    </CardsContainer>
  );
}

const CardsContainer = styled.div`
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: fit-content;
  width: 100vw;
  padding: 75px 10vw;
  gap: 30px 50px;
`;