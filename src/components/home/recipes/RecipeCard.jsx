import style from "./recipeCard.module.scss";
import { useNavigate } from "react-router-dom";
import { FaClock } from "react-icons/fa";
import { MdFormatListNumbered } from "react-icons/md"; // List for amounts/ingredients

function RecipeCard({ recipe }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <>
      {recipe && (
        <div className={style.card} onClick={handleClick}>
          <img src={recipe.image} alt={recipe.title} />
          <span className={style.title}>{recipe.title}</span>
          <div className={style.info}>
            <MdFormatListNumbered className={style.icon} />
            {recipe.ingredientsNames && <span>{recipe.ingredientsNames.length} ingredients</span>}
            <span>•</span>
            <FaClock className={style.icon} />
            <span>{recipe.readyInMinutes} minutes</span>
          </div>
        </div>
      )}
    </>
  );
}

export default RecipeCard;
