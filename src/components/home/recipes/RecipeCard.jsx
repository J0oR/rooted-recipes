import style from "./recipeCard.module.scss";
import { useNavigate } from "react-router-dom";
import { FaClock } from "react-icons/fa";
import { MdFormatListNumbered } from "react-icons/md"; // List for amounts/ingredients
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useEffect, useState } from "react";
import { db, auth } from "../../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { setDoc, deleteDoc, doc } from "firebase/firestore"; // aggiungi questo in cima
import { useSelector } from "react-redux";

function RecipeCard({ recipe }) {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [user] = useAuthState(auth);
  const { recipes } = useSelector((state) => state.favourites);
  const recipeRef = doc(db, "heartedRecipes", recipe.id.toString());

  const handleClick = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  const toggleSave = (event) => {
    event.stopPropagation();

    const newSavedState = !isSaved;
    setIsSaved(newSavedState);

    if (newSavedState) {
      setDoc(recipeRef, {
        uid: user.uid,
        recipeId: recipe.id,
      });
    } else {
      deleteDoc(recipeRef);
    }
  };

  useEffect(() => {
    if (recipes.length > 0) {
      setIsSaved(recipes.some((r) => r.id === recipe.id));
    }
  }, [recipes, recipe.id]);

  return (
    <>
      {recipe && (
        <div className={style.card} onClick={handleClick}>
          <img src={recipe.image} alt={recipe.title} />
          <div className={style.details}>
            <span className={style.title}>{recipe.title}</span>
            <div className={style.info}>
              <span>

              <MdFormatListNumbered className={style.icon} />
              {recipe.ingredientsNames && <span>{recipe.ingredientsNames.length} ingredients</span>}
              </span>
              {/* <span>•</span> */}
              <span>
              <FaClock className={style.icon} />
              <span>{recipe.readyInMinutes} minutes</span>
              </span>
              
            </div>
            {user && (
              <button
                onClick={(e) => {
                  toggleSave(e);
                }}>
                {isSaved ? <AiFillHeart size={24} color="red" /> : <AiOutlineHeart size={24} color="gray" />}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default RecipeCard;
