import styled from "styled-components";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useEffect, useState } from "react";
import { db, auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { setDoc, deleteDoc, doc, getDoc } from "firebase/firestore"; // aggiungi questo in cima
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { addToFavourites, removeFromFavourites } from "../../store/favouriteSlice";
import Button from "../common/Button";

export default function HeartButton({ recipeId, className }) {
  const [isSaved, setIsSaved] = useState(false);
  const [user] = useAuthState(auth);
  const { recipes, recipeIds } = useSelector((state) => state.favourites);
  const recipeRef = useMemo(() => doc(db, "heartedRecipes", recipeId.toString()), [recipeId]);
  const dispatch = useDispatch();

  const toggleSave = async (event) => {
    event.stopPropagation();
    if (!user) return;

    const newSavedState = !isSaved;
    setIsSaved(newSavedState);

    try {
      if (newSavedState) {
        await setDoc(recipeRef, {
          uid: user.uid,
          recipeId: recipeId,
        });
        const recipeSnap = await getDoc(doc(db, "recipes", recipeId.toString()));
        if (recipeSnap.exists()) {
          const savedRecipe = { id: recipeSnap.id, ...recipeSnap.data() };
          dispatch(addToFavourites({ recipeId, savedRecipe }));
        }
      } else {
        deleteDoc(recipeRef);
        dispatch(removeFromFavourites({recipeId}));
      }
    } catch (error) {
      console.error("Firestore error:", error);
      setIsSaved(!newSavedState);
    }
  };

  useEffect(() => {
    if (recipes.length > 0) {
      setIsSaved(recipes.some((r) => r.id === recipeId));
    }
  }, [recipes, recipeId]);

  if (!user) return null;

  return (
    <StyledButton onClick={toggleSave} $isSaved={isSaved} className={className}>
      {isSaved ? <AiFillHeart size={25} className="icon" /> : <AiOutlineHeart size={25} className="icon" />}
    </StyledButton>
  );
}

const StyledButton = styled(Button)`
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  position: absolute;
  left: 40px;
  bottom: 10px;
  background: #f3f3f3;
  border: none;
  width: 50px;
  height: 30px;
  border-radius: 25px;

  &:hover {
    transform: scale(1.1);

    .icon {
      color: #DA604E;
    }
  }

  .icon {
    border-radius: 100%;
    font-weight: 800px;
    color: ${({ $isSaved }) => ($isSaved ? "#DA604E" : "#337179")};
  }
`;
