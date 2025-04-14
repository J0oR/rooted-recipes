import React from "react";
import style from "./cardsContainer.module.scss";
import RecipeCard from "./RecipeCard";
import { useSelector } from "react-redux";

function CardsContainer({recipes, loading}) {



  return (
    <div>
      {loading ? (
        <span className={style.loader}></span>
      ) : (
        <div className={style.cardsContainer}>
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CardsContainer;
