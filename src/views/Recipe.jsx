import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, setDoc, getDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import axios from "axios";
//import { saveRecipeToFirebase } from "../utils";
import style from "./recipe.module.scss";
import Tabs from "../components/recipe/Tabs";
import Ingredients from "../components/recipe/Ingredients";
import Instructions from "../components/recipe/Instructions";
import SummaryStyled from "../components/recipe/summary.styled";

const Recipe = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState("ingredients");

  const fetchFirebaseData = async () => {
    try {
      const recipeDoc = await getDoc(doc(db, "recipes", id));

      if (recipeDoc.exists()) {
        setData(recipeDoc.data());
        setLoading(false);
        setError(null);
        console.log(recipeDoc.data());
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
    <div className={style.recipeContainer}>
      <h1>{data.title}</h1>
      <img src={data.image} />

      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      {selectedTab === "ingredients" && <Ingredients ingredients={data.ingredients} />}

      {selectedTab === "recipe" && <Instructions steps={data.steps} />}

      {selectedTab === "summary" && <SummaryStyled summary={data.summary} />}
    </div>
  );
};

export default Recipe;
