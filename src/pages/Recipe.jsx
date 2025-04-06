import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, setDoc, getDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import axios from "axios";
//import { saveRecipeToFirebase } from "../utils";
//import style from "./recipe.module.scss";

const Recipe = () => {
  const { id } = useParams(); // Access the 'id' parameter from the URL
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchFirebaseData = async () => {
    try {
      const recipeDocRef = doc(db, "recipes", id);
      const recipeDoc = await getDoc(recipeDocRef);

      // Fetch the document

      if (recipeDoc.exists()) {
        setData(recipeDoc.data());
        setLoading(false);
        setError(null);
      } else {
        setError("No such document!");
      }
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchFirebaseData();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", margin: "50px auto", alignItems: "center", width: "50%" }}>
      <h1>{data.title}</h1>
      <img src={data.image} style={{}} />

      <div style={{ border: "1px solid black" }}>
        <h2>Ingredients</h2>
        <ul>
          {data.ingredientsQuantity?.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div style={{ border: "1px solid black" }}>
        <h2>Instructions</h2>
        {data.steps?.map((step, index) => (
          <div key={index}>
            {data.steps.length > 1 && (
              <h3>
                Step {index + 1} {step.step && `- ${step.step}`}
              </h3>
            )}
            <ul>
              {step.instructions.map((inst, index) => {
                // Split the instruction by period and trim spaces
                const sentences = inst
                  .split(".")
                  .map((sentence) => sentence.trim())
                  .filter(Boolean);

                return sentences.map((sentence, sentenceIndex) => <li key={`${index}-${sentenceIndex}`}>{sentence}</li>);
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipe;
