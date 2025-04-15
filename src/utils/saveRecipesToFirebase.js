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
          image: recipe.image || "No image",
          readyInMinutes: recipe.readyInMinutes || 0,
          servings: recipe.servings || 0,
          ingredientsNames: recipe.extendedIngredients?.map((ing) => ing.nameClean?.toLowerCase()) || [],
          ingredients: recipe.extendedIngredients?.map((ing) => ({
            nameClean: ing.nameClean?.toLowerCase() || '',
            amount: ing.amount, 
            unit: ing.unit
          })) || [],
          dishTypes: recipe.dishTypes?.map((type) => type) || [],
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
      console.log(error);
      console.error("Error saving to Firebase:", error);
    }
  };

  export {saveRecipesToFirebase};