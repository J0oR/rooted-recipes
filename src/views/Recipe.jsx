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
import RecipeStat from "../components/recipe/RecipeStat";
import { IoPeopleOutline } from "react-icons/io5";
import { PiTimerBold } from "react-icons/pi";
import { FaRegStar } from "react-icons/fa";
import styled from "styled-components";

export default function Recipe() {
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

  const testSummary =
    'Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs might be a good recipe to expand your main course repertoire. One portion of this dish contains approximately <b>19g of protein </b>,  <b>20g of fat </b>, and a total of  <b>584 calories </b>. For  <b>$1.63 per serving </b>, this recipe  <b>covers 23% </b> of your daily requirements of vitamins and minerals. This recipe serves 2. It is brought to you by fullbellysisters.blogspot.com. 209 people were glad they tried this recipe. A mixture of scallions, salt and pepper, white wine, and a handful of other ingredients are all it takes to make this recipe so scrumptious. From preparation to the plate, this recipe takes approximately  <b>45 minutes </b>. All things considered, we decided this recipe  <b>deserves a spoonacular score of 83% </b>. This score is awesome. If you like this recipe, take a look at these similar recipes: <a href="https://spoonacular.com/recipes/cauliflower-gratin-with-garlic-breadcrumbs-318375">Cauliflower Gratin with Garlic Breadcrumbs</a>, < href="https://spoonacular.com/recipes/pasta-with-cauliflower-sausage-breadcrumbs-30437">Pasta With Cauliflower, Sausage, & Breadcrumbs</a>, and <a href="https://spoonacular.com/recipes/pasta-with-roasted-cauliflower-parsley-and-breadcrumbs-30738">Pasta With Roasted Cauliflower, Parsley, And Breadcrumbs</a>.';

  useEffect(() => {
    fetchFirebaseData();
  }, []);

  return (
    <div className={style.recipeContainer}>
      <h1>{data.title}</h1>

      <HeaderContainer>
        <img src={data.image} />
        <div dangerouslySetInnerHTML={{ __html: testSummary }} />
      </HeaderContainer>

      <RecipeStatsContainer>
        <RecipeStat label="Cook Time" stat={data.readyInMinutes} icon={<PiTimerBold />} />
        <RecipeStat label="Servings" stat={data.servings} icon={<IoPeopleOutline />} />
        <RecipeStat label="Score" stat={`${data.spoonacularScore?.toFixed(2)}%`} icon={<FaRegStar />} />
      </RecipeStatsContainer>

      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      {selectedTab === "ingredients" && <Ingredients ingredients={data.ingredients} />}
      {selectedTab === "recipe" && <Instructions steps={data.steps} />}
    </div>
  );
}

const RecipeStatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 100px;
  margin: 50px auto;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 50px;
  margin: 50px auto;
  padding: 50px;

  div{
    width: 50%;
  }
`;
