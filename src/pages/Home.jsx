import axios from "axios";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { query, collection, getDocs } from "firebase/firestore";
import style from "./home.module.scss";
import CardsContainer from "../components/home/CardsContainer";
import IngredientInput from "../components/home/ingredientInput";
import { saveRecipesToFirebase, saveIngredientsToFirebase } from "../utils";

// Import the use-debounce hook
//import IngredientSearch from "../components/IngredientSearch";

/*
  1. on loanding, the app retrives 20 random detailed recipes each time and saves them to firebase. 
  The purpose is that, during developing and testing, a firebase database is build. 
  This will avoid incurring into the api cap 

  2. if we reach api cap, we start fetching from firebase

  3. upon arriving on the recipe page, we fetch directly from firebase using the provided ID

  Features:
  - in the home there will be an input filter:
  - meals type (main course, second, ecc.)
  - ingredient
  - recipe name
  - sorting?
  */

function Home() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState(null);

  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  const fetchData = async () => {
    try {
      const url = `${baseURL}?apiKey=${apiKey}&instructionsRequired=true&number=100&diet=vegetarian&sort=random&fillIngredients=true&addRecipeInformation=true&addRecipeInstructions=true`;
      const response = await axios.get(url);
      const results = response.data.results;

      saveRecipesToFirebase(results);
      saveIngredientsToFirebase(results);
      /* saveRecipesToFirebase(utilsData);
      saveIngredientsToFirebase(utilsData); 
      */
      console.log(results);

      setLoading(false);
      setError(null);
    } catch (error) {
      setError(error);
      setLoading(false);
      console.error("Error fetching data: ", error);
      //fetchFirebaseData();
    } finally {
      setLoading(false);
    }
  };

  const fetchIngredients = async () => {
    console.log("fetching ingredients in the Home page");
    try {
      const ingredientsCollection = collection(db, "ingredients");
      const q = query(ingredientsCollection);
      const querySnapshot = await getDocs(q);
      const ingredients = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Optionally include the doc ID if you need it
        ...doc.data(), // Extract the data from the document
      }));
      setIngredients(ingredients);
      setError(null);
    } catch (error) {
      console.error("Error fetching ingredients: ", error);
    }
  };

  
  // fetch ingredients once, only when the component mounts
  useEffect(() => {
    /* fetchData(); */
    fetchIngredients(); 
  }, []);

  //if (error) return <p>Error: {error.message}</p>;
  return (
    <div className={style.container}>
      <IngredientInput ingredients={ingredients} setLoading={setLoading} setData={setData} setError={setError} />
      <CardsContainer loading={loading} data={data} />
    </div>
  );
}

export default Home;
