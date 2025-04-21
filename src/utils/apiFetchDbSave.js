import { saveRecipesToFirebase } from "../utils/saveRecipesToFirebase";
import { saveIngredientsToFirebase } from "../utils/saveIngredientsToFirebase";
import axios from "axios";
import localData from "../assets/localData";

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



  import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    query,
    limit,
    startAfter,
  } from "firebase/firestore";

  async function clearDB() {
    const recipesRef = collection(db, "recipes");
    let lastDoc = null;
    let deletedCount = 0;
    let keepGoing = true;
  
    while (keepGoing) {
      let q = query(recipesRef, limit(100));
      if (lastDoc) {
        q = query(recipesRef, startAfter(lastDoc), limit(100));
      }
  
      const snapshot = await getDocs(q);
      if (snapshot.empty) break;
  
      const deletions = [];
      snapshot.docs.forEach((docSnap) => {
        const data = docSnap.data();
        if (!data.summary || data.summary.trim() === "") {
          deletions.push(deleteDoc(doc(db, "recipes", docSnap.id)));
          console.log(`Scheduled delete: ${docSnap.id}`);
        }
      });
  
      await Promise.all(deletions);
      deletedCount += deletions.length;
      console.log(`Deleted ${deletedCount} recipes so far...`);
  
      lastDoc = snapshot.docs[snapshot.docs.length - 1];
      keepGoing = snapshot.size === 100;
    }
  
    console.log(`✅ Cleanup finished. Total deleted: ${deletedCount}`);
  }
  