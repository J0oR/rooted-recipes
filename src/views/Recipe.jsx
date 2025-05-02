import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import RecipeStat from "../components/recipe/RecipeStat";
import { IoPeopleOutline } from "react-icons/io5";
import { PiTimerBold } from "react-icons/pi";
import { FaRegStar } from "react-icons/fa";
import styled from "styled-components";
import { FaListUl } from "react-icons/fa";
import HeartButton from "../components/recipeCards/HeartButton";
import Summary from "../components/recipe/Summary";
import Instructions from "../components/recipe/Instructions";
import Ingredients from "../components/recipe/Ingredients";

export default function Recipe() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

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
      <Title>{data.title}</Title>
      <FlexContainer>
        <RapidInfo>
          <ImgWrapper>
            <img src={data.image} />
            <HeartButton recipeId={id} className="heart-button" />
          </ImgWrapper>
          <Stats>
            <RecipeStat label="Ingredients" stat={data.ingredientsNames?.length} icon={<FaListUl />} />
            <RecipeStat label="Cook Time" stat={data.readyInMinutes} icon={<PiTimerBold />} />
            <RecipeStat label="Servings" stat={data.servings} icon={<IoPeopleOutline />} />
            <RecipeStat label="Score" stat={`${data.spoonacularScore?.toFixed(2)}%`} icon={<FaRegStar />} />
          </Stats>
        </RapidInfo>
        <Summary summary={data.summary} />
      </FlexContainer>
      <Tabs>
        <Ingredients ingredients={data.ingredients} />
        <Instructions steps={data.steps} />
      </Tabs>
    </RecipeContainer>
  );
}

const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Title = styled.h1`
  margin: 30px auto 50px auto;
  width: 100%;
  color: #337179;
  font-size: clamp(2rem, 4vw, 10rem);
  font-weight: 800;
  flex-wrap: wrap;
  text-transform: uppercase;
  text-align: center;
`;

const FlexContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  width: 100%;
  position: relative;
  flex-wrap: wrap;
  gap: 50px;
  padding: 20px 50px;
  margin-bottom: 50px;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 480px) { 
    padding: 10px;
   }
`;


const RapidInfo = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    height: fit-content;
  }
  @media (max-width: 480px) { 
    flex-direction: column;
   }

`;

const ImgWrapper = styled.div`
  width: clamp(200px, 80%, 250px);
  height: clamp(200px, 80%, 250px);
  aspect-ratio: 1 / 1;
  border-radius: 100%;
  overflow: hidden;
  z-index: 1;
  position: relative;

  img {
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
    
  }

  .heart-button {
    left: 50%;
    transform: translateX(-50%);
    bottom: 10px;
  }
`;

const Stats = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  height: 250px;

  @media (max-width: 480px) {
    flex-direction: row;
    height: 100px;
  }

`;

const Tabs = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  background-color: #F5F6F7;
  gap: 100px;
  padding-bottom: 100px;
  
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
`;
