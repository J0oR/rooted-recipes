import { saveRecipesToFirebase } from "../utils/saveRecipesToFirebase";
import { saveIngredientsToFirebase } from "../utils/saveIngredientsToFirebase";
import axios from "axios";

const apiFetchDbSave = async () => {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

    try {
      const url = `${baseURL}?apiKey=${apiKey}&instructionsRequired=true&number=30&diet=vegetarian&sort=random&fillIngredients=true&addRecipeInformation=true&addRecipeInstructions=true`;

     const response = await axios.get(url);
     if (response.status === 200) {
       const recipes = response.data.results; 
       await saveRecipesToFirebase(recipes);
       await saveIngredientsToFirebase(recipes);
       console.log("Data fetched from API and saved to Firebase.");
       console.log(recipes);
     }

    } catch (error) {
      console.log("Error fetching data from API:", error);
    }
  };

  export { apiFetchDbSave };