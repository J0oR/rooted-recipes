import { db } from "../config/firebase";
import { doc, writeBatch } from "firebase/firestore";

function cleanRecipeData(recipe) {
  return Object.fromEntries(
    Object.entries(recipe).filter(([_, value]) => value !== undefined)
  );
}

const saveRecipesToFirebase = async (recipes) => {
    try {
  
      if (!Array.isArray(recipes) || recipes.length === 0) {
        console.error("No valid recipes to save.");
        return;
      }
  
      const batch = writeBatch(db);
  
  
  
      recipes.forEach((recipe) => {
        if (!recipe.id) {
          console.warn("Skipping recipe with missing ID:", recipe);
          return;
        }
        const recipeRef = doc(db, "recipes", recipe.id.toString());
        const recipeData = {
          title: recipe.title || "No title",
          titleSplitted: recipe.title?.toLowerCase().split(" ") || [],
          image: recipe.image || "No image",
          readyInMinutes: recipe.readyInMinutes || 0,
          summary: recipe.summary || "No summary",
          spoonacularScore: recipe.spoonacularScore || 0,
          servings: recipe.servings || 0,
          ingredientsNames: recipe.extendedIngredients?.map((ing) => ing.nameClean?.toLowerCase()).filter(Boolean) || [],
          ingredients: recipe.extendedIngredients?.map((ing) => ({
            nameClean: ing.nameClean?.toLowerCase() || '',
            amount: ing.amount, 
            unit: ing.unit
          })) || [],
          dishTypes: {
            breakfast: recipe.dishTypes?.includes("breakfast") || false,
            appetizer: recipe.dishTypes?.includes("appetizer") || false,
            main: recipe.dishTypes?.includes("main course") || false,
            side: recipe.dishTypes?.includes("side dish") || false,
            dessert: recipe.dishTypes?.includes("dessert") || false,
            drink: recipe.dishTypes?.includes("drink") || false
            // aggiungi altri tipi che vuoi controllare
          },
          steps: recipe.analyzedInstructions?.flatMap((steps) => ({
            step: steps.name || '',
            instructions: steps.steps.map((step) => (
              step.step
            ))
          })) || [],
        };
          const cleaned = cleanRecipeData(recipeData);

        batch.set(recipeRef, cleaned, { merge: true });
      });
  
      await batch.commit();
    }
    catch (error) {
      console.error("Error saving to Firebase:", error);
    }
  };

  export {saveRecipesToFirebase};