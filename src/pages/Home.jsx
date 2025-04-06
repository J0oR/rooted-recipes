  import axios from "axios";
  import { useEffect, useState } from "react";
  import RecipeCard from "../components/RecipeCard";
  import style from "./home.module.scss";
  import { db } from "../config/firebase";
  import { query, getDocs, collection, limit, where } from "firebase/firestore";
  import { saveRecipesToFirebase, data as utilsData } from "../utils";
  import { useDebounce } from "use-debounce";

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
    const [error, setError] = useState(null);
    const [apiCap, setApiCap] = useState(false);
    const [apiCallsCount, setApiCallsCount] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm] = useDebounce(searchTerm, 500);


    const baseURL = "https://api.spoonacular.com/recipes/complexSearch";
    const apiKey = "8ac55c02087541fc933666159f8e896a";

    const fetchData = async () => {
      try {
        const url = `${baseURL}?apiKey=${apiKey}&instructionsRequired=true&number=100&diet=vegetarian&sort=random&fillIngredients=true&addRecipeInformation=true&addRecipeInstructions=true`;
        /* const response = await axios.get(url);
        const data = response.data.results;

        setData(data);
        if (data.length === 0) {
          return;
        }

        saveRecipesToFirebase(data); */
        saveRecipesToFirebase(utilsData);

        setLoading(false);
        setError(null);
        setApiCallsCount((prev) => prev + 1);
      } catch (error) {
        setError(error);
        setLoading(false);
        //fetchFirebaseData();
      } finally {
        setLoading(false);
      }
    };

    const fetchFirebaseData = async () => {
      try {
        const recipesCollection = collection(db, "recipes");
        const q = query(recipesCollection, limit(50));
        const querySnapshot = await getDocs(q);
        const recipes = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Optionally include the doc ID if you need it
          ...doc.data(), // Extract the data from the document
        }));
        setData(recipes);
        setLoading(false);
        setError(null);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };

    const fetchFilteredData = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "recipes"), where("ingredientsNames", "array-contains", debouncedSearchTerm.toLowerCase()));
        
        const querySnapshot = await getDocs(q);
        const recipes = querySnapshot.docs
          .map((doc) => ({
            id: doc.id, // Optionally include the doc ID if you need it
            ...doc.data(), // Extract the data from the document
          }));
        setData(recipes);
        setLoading(false);
        setError(null);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };

    const handleInputChange = (e) => {
      setSearchTerm(e.target.value);
      setLoading(true);
    };


    useEffect(() => {
      //fetchData();
      if (debouncedSearchTerm === "") {
        fetchFirebaseData();
      } else {
        fetchFilteredData();
      }
    }, [debouncedSearchTerm]);

    //if (error) return <p>Error: {error.message}</p>;
    return (
      <div className={style.container}>
        <div className={style.searchContainer}>
          <input type="text" placeholder="search for a recipe" value={searchTerm} onChange={(e) => handleInputChange(e)} className={style.searchInput} />
        </div>

        {loading ? (
          <span className={style.loader}></span>
        ) : (
          <div className={style.cardsContainer}>
            {data.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    );
  }

  export default Home;
