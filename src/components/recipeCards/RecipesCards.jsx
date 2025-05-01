import React, { use, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import styled from "styled-components";

export default function RecipesCards({ recipes }) {
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
  margin-top: 100px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 450px));
  grid-gap: 50px 120px;
  justify-content: center;
  justify-items: center;

 

  @media screen and (max-width: 768px) {
    padding: 0px;
  }

  
`;
