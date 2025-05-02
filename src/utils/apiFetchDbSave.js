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
       console.log("Data fetched from API and saved to Firestore Database.");
     }
     else {
      // Log a warning instead of an error when the API request fails due to payment issue
      console.warn(`API fetch failed with status: ${response.status}`);
    }
    } catch (error) {
      if (error.response && error.response.status === 402) {
        console.warn("Payment required for API request.");
      } else {
        console.error("Error fetching data from API:", error.message);
      }
    }
  };

  export { apiFetchDbSave };