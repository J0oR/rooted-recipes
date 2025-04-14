import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { fetchFavourites, clearFavourites } from "../store/favouriteSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import CardsContainer from "../components/home/recipes/CardsContainer";
import style from "./favourites.module.scss";
import { useNavigate } from "react-router-dom";



function Favourites() {
    const dispatch = useDispatch();
    const [user] = useAuthState(auth);
    const {loading} = useSelector((state) => state.favourites);
    const {recipes} = useSelector((state) => state.favourites);
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
      <div className={style.user}>
        <p>{user && user.displayName}</p>
        <p>{user && user.email}</p>
      </div>
      <CardsContainer recipes={recipes} loading={loading}/>
    </div>
  );
}

export default Favourites;
