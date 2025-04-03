import React, { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

const IngredientSearch = ({ data, setData }) => {
  const [input, setInput] = useState("");

  const [debouncedInput] = useDebounce(input, 500); // Debounced input after 500ms

  const fetchByIngredients = async (ingredients) => {
    try {
      const q = query(
        collection(db, "recipes"), // Assuming the collection is 'recipes'
        where("ingredients", "array-contains-any", ingredients[0])
      );
      const querySnapshot = await getDocs(q);
      const fetchedData = querySnapshot.docs.map((doc) => doc.data());
      console.log(fetchedData);
      setData(fetchedData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };



  // Fetch function triggered by the debounced input
  useEffect(() => {
    const ingredients = 
      debouncedInput
        .split(/[,-\s]+/) // Split by ',', '-', or space
        .map((ingredient) => ingredient.trim())
        .filter(Boolean)
    ; // Remove any empty strings

    console.log(ingredients);

    if (ingredients.length > 0) {
      console.log(ingredients);
      fetchByIngredients(ingredients);
    }
  }, [debouncedInput]); // Run when debounced input changes

  return (
    <div>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter ingredients" />
    </div>
  );
};

export default IngredientSearch;
