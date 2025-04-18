import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import Tabs from "../components/recipe/Tabs";
import Ingredients from "../components/recipe/Ingredients";
import Instructions from "../components/recipe/Instructions";
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
    <RecipeContainer>
      <h1>{data.title}</h1>

      <HeaderContainer>
        <img src={data.image} />
        <div dangerouslySetInnerHTML={{ __html: data.summary }} />
      </HeaderContainer>

      <RecipeStatsContainer>
        <RecipeStat label="Cook Time" stat={data.readyInMinutes} icon={<PiTimerBold />} />
        <RecipeStat label="Servings" stat={data.servings} icon={<IoPeopleOutline />} />
        <RecipeStat label="Score" stat={`${data.spoonacularScore?.toFixed(2)}%`} icon={<FaRegStar />} />
      </RecipeStatsContainer>

      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      {selectedTab === "ingredients" && <Ingredients ingredients={data.ingredients} />}
      {selectedTab === "recipe" && <Instructions steps={data.steps} />}
    </RecipeContainer>
  );
}

const RecipeContainer = styled.div`
   display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 70%;
    margin: 100px auto;
    padding: 20px;
    border-radius: 10px;
`;

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

  img{
    border-radius: 15px;
    flex: 1;
    max-width: 400px;
  }

  div{
    flex: 1;
    line-height: 1.8rem;
  }
`;
