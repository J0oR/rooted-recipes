import { db } from "../config/firebase";
import { doc, writeBatch } from "firebase/firestore";

const saveIngredientsToFirebase = async (recipes) => {

    try {
        const batch = writeBatch(db);

        recipes.forEach((recipe) => {

            recipe.extendedIngredients?.map((ing) => {

                const ingredientsRef = doc(db, "ingredients", ing.id.toString());
                const ingredient = {
                    id: ing.id,
                    name: ing.name,
                    nameClean: ing.nameClean
                }
                batch.set(ingredientsRef, ingredient, { merge: true });
            });
        });

        await batch.commit();
    } catch (error) {
        console.error("Error saving ingredients to Firebase:", error);
    }
};

export { saveIngredientsToFirebase };