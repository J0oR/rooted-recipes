import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { fetchFavourites, clearFavourites } from "../store/favouriteSlice";
import { useSelector, useDispatch } from "react-redux";
import RecipesCards from "../components/home/recipes/RecipesCards";
import { useNavigate } from "react-router-dom";


function Favourites() {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const { loading, recipes } = useSelector((state) => state.favourites);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      dispatch(fetchFavourites(user.uid));
    } else {
      dispatch(clearFavourites());
      navigate("/");
    }
  }, [user, dispatch, navigate]);

  return (
    <div>
      <RecipesCards recipes={recipes} />
    </div>
  );
}

export default Favourites;
