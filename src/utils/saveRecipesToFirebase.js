import { db } from "../config/firebase";
import { doc, writeBatch } from "firebase/firestore";

const saveRecipesToFirebase = async (recipes) => {
    console.log("YO", recipes)
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
          ingredientsNames: recipe.extendedIngredients?.map((ing) => ing.nameClean.toLowerCase()) || [],
          ingredients: recipe.extendedIngredients?.map((ing) => ({
            nameClean: ing.nameClean.toLowerCase(),
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
        batch.set(recipeRef, recipeData, { merge: true });
      });
  
      await batch.commit();
    }
    catch (error) {
      console.error("Error saving to Firebase:", error);
    }
  };

  export {saveRecipesToFirebase};