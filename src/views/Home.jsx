import axios from "axios";
import { useEffect, useState } from "react";
import style from "./home.module.scss";
import CardsContainer from "../components/home/CardsContainer";
import IngredientInput from "../components/home/ingredientInput";
import { saveRecipesToFirebase } from "../utils/saveRecipesToFirebase";
import { saveIngredientsToFirebase } from "../utils/saveIngredientsToFirebase";
import localData from "../assets/localData";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients } from "../store/ingredientsSlice";

function Home() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  //const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const fetched = useSelector((state) => state.ingredients.fetched);

  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  const fetchData = async () => {
    try {
      const url = `${baseURL}?apiKey=${apiKey}&instructionsRequired=true&number=100&diet=vegetarian&sort=random&fillIngredients=true&addRecipeInformation=true&addRecipeInstructions=true`;
      /*  
      const response = await axios.get(url);
      const recipes = response.data.results; 
      saveRecipesToFirebase(recipes);
      saveIngredientsToFirebase(recipes);
      setData(recipes); 
      */
      setData(localData);
      setLoading(false);
      setError(null);
    } catch (error) {
      setError(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // fetch ingredients once, only when the component mounts
  useEffect(() => {
    fetchData();
    //fetchIngredients();
  }, []);

  // only fetch once
useEffect(() => {
  if (!fetched) dispatch(fetchIngredients());
}, [fetched, dispatch]);

  //if (error) return <p>Error: {error.message}</p>;
  return (
    <div className={style.container}>
      <IngredientInput ingredients={ingredients} setLoading={setLoading} setData={setData} setError={setError} />
      <CardsContainer loading={loading} data={data} />
    </div>
  );
}

export default Home;
