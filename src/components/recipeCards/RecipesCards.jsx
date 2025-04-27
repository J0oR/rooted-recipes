import React, { use, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import styled from "styled-components";

export default function RecipesCards({ recipes}) {

  
  return (
    <CardsContainer>
      {recipes.map((recipe, index) => (
        <RecipeCard key={`${recipe.id}-${index}`} recipe={recipe} $index={index} />
      ))}
    </CardsContainer>
  );
}

const CardsContainer = styled.div`
width: 100%;
  margin: auto;
  padding: 50px;
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  grid-gap: 50px;
  justify-items: center;
  
`;

