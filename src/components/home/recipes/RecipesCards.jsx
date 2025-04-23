import React from "react";
import RecipeCard from "./RecipeCard";
import styled from "styled-components";

export default function RecipesCards({ recipes }) {

  return (
    <CardsContainer>
      {recipes.map((recipe, index) => (
        <RecipeCard key={`${recipe.id}-${index}`} recipe={recipe} index={index}/>
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
  gap: 50px;
  max-width: 600px;
  padding: 50px;
`;