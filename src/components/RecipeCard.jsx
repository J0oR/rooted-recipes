import style from "./recipeCard.module.scss";
import { useNavigate } from 'react-router-dom';



function RecipeCard({ recipe }) {

    const navigate = useNavigate();


    const handleClick = () => {
        navigate(`/recipe/${recipe.id}`);
      };

    return (
        <div className={style.card} onClick={handleClick}>
            <h2>{recipe.title}</h2>
            <img src={recipe.image} alt={recipe.title} />
            <p>ID: {recipe.id}</p>
            {recipe.firebaseDocID && <p>Firebase Doc ID: {recipe.firebaseDocID}</p>}
        </div>
    );
}

export default RecipeCard;