import React from "react";
import style from "./cardsContainer.module.scss";
import RecipeCard from "./RecipeCard";
import { useSelector } from "react-redux";

function CardsContainer() {

  const {data, loading} = useSelector((state) => state.recipes);

  return (
    <div>
      {loading ? (
        <span className={style.loader}></span>
      ) : (
        <div className={style.cardsContainer}>
          {data.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CardsContainer;
