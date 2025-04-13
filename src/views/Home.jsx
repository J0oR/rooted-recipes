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

function Home() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  //const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

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
       setData(recipes); 
     }
  
      /* 
      setData(localData);
      saveIngredientsToFirebase(localData);
      saveRecipesToFirebase(localData); 
      */

      setLoading(false);
      setError(null);
    } catch (error) {
      console.error("Error fetching data from API:", error);
      setError(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // fetch ingredients once, only when the component mounts
  useEffect(() => {
    //fetchAndSaveData();
    dispatch(fetchTitles());
    dispatch(fetchIngredients());
  }, []);

  //if (error) return <p>Error: {error.message}</p>;
  return (
    <div className={style.container}>
      <FilteringContainer/>
      <CardsContainer/>
    </div>
  );
}

export default Home;
