import axios from "axios";
import { useEffect, useState } from "react";
import style from "./home.module.scss";
import CardsContainer from "../components/home/recipes/CardsContainer";
import FilteringContainer from "../components/home/search/FilteringContainer";
import { saveRecipesToFirebase } from "../utils/saveRecipesToFirebase";
import { saveIngredientsToFirebase } from "../utils/saveIngredientsToFirebase";
import localData from "../assets/localData";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients } from "../store/ingredientsSlice";
import { fetchTitles } from "../store/titlesSlice";
import { db, auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { fetchFavourites } from "../store/favouriteSlice";

function Home() {
  //const [data, setData] = useState([]);
  //const [ingredients, setIngredients] = useState([]);
  const {data, loading} = useSelector((state) => state.recipes);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const [user] = useAuthState(auth);
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  const fetchAndSaveData = async () => {
    try {
      const url = `${baseURL}?apiKey=${apiKey}&instructionsRequired=true&number=30&diet=vegetarian&sort=random&fillIngredients=true&addRecipeInformation=true&addRecipeInstructions=true`;
      /*  
      */
     const response = await axios.get(url);
     if (response.status === 200) {
       const recipes = response.data.results; 
       saveRecipesToFirebase(recipes);
       saveIngredientsToFirebase(recipes);
     }
  
      /* 
      setData(localData);
      saveIngredientsToFirebase(localData);
      saveRecipesToFirebase(localData); 
      */

      setError(null);
    } catch (error) {
      console.error("Error fetching data from API:", error);
      setError(error);
    }
  };

  // fetch ingredients once, only when the component mounts
  useEffect(() => {
    if (user) {
      dispatch(fetchFavourites(user.uid));
    }
    fetchAndSaveData();
    dispatch(fetchTitles());
    dispatch(fetchIngredients());
  }, [user, dispatch]);

  //if (error) return <p>Error: {error.message}</p>;
  return (
    <div className={style.container}>
      <FilteringContainer/>
      <CardsContainer recipes={data} loading={loading}/>
    </div>
  );
}

export default Home;
