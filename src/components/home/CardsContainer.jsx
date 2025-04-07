import React from "react";
import style from "./cardsContainer.module.scss";
import RecipeCard from "./RecipeCard";

function CardsContainer({ loading, data }) {
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
