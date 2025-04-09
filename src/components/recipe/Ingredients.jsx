import style from "./ingredients.module.scss";

function Ingredients({ ingredientsQuantity }) {
  const ingredients = Array.isArray(ingredientsQuantity) ? ingredientsQuantity : [];

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h2 className={style.title}>Ingredients</h2>
        <span>
          {ingredients.length} item{ingredients.length !== 1 ? "s" : ""}
        </span>
      </div>
      <ul className={style.list}>
        {ingredientsQuantity?.map((ingredient, index) => (
          <li key={index} className={style.ingredientRow}>
            <span>{ingredient.name}</span>
            <div className={style.amount}>
              <span >{ingredient.amount} </span>
              <span>{ingredient.unit}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Ingredients;
