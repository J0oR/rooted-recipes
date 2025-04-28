import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import Tabs from "../components/recipe/Tabs";
import RecipeStat from "../components/recipe/RecipeStat";
import { IoPeopleOutline } from "react-icons/io5";
import { PiTimerBold } from "react-icons/pi";
import { FaRegStar } from "react-icons/fa";
import styled from "styled-components";
import { FaListUl } from "react-icons/fa";
import HeartButton from "../components/recipeCards/HeartButton";

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
    console.log(id);
    fetchFirebaseData();
  }, []);

  return (
    <RecipeContainer>
        <TitleContainer>{<h1>{data.title}</h1>}</TitleContainer>
      <TopSection>
        <CircleWrapper>
          <ImgWrapper>
            <img src={data.image} />
            <HeartButton recipeId={id} className="heart-button"/>
          </ImgWrapper>
          <RadialItem $index={0} $total={4}>
            <RecipeStat label="Ingredients" stat={data.ingredientsNames?.length} icon={<FaListUl />} />
          </RadialItem>
          <RadialItem $index={1} $total={4}>
            <RecipeStat label="Cook Time" stat={data.readyInMinutes} icon={<PiTimerBold />} />
          </RadialItem>
          <RadialItem $index={2} $total={4}>
            <RecipeStat label="Servings" stat={data.servings} icon={<IoPeopleOutline />} />
          </RadialItem>
          <RadialItem $index={3} $total={4}>
            <RecipeStat label="Score" stat={`${data.spoonacularScore?.toFixed(2)}%`} icon={<FaRegStar />} />
          </RadialItem>
        </CircleWrapper>
      <Tabs ingredients={data.ingredients} steps={data.steps} summary={data.summary} />
      </TopSection>

    </RecipeContainer>
  );
}

const TopSection = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 20px;
  position: relative;
  padding-bottom: 60px;
  gap: clamp(100px, 10%, 150px);
  @media screen and (max-width: 768px) {
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;

const CircleWrapper = styled.div`
  position: relative;
  width: fit-content;
`;

const RadialItem = styled.div.attrs(({ $index, $total }) => {
  const startAngle = -35; // gradi, in alto a destra
  const endAngle = 35; // gradi, in basso a destra
  const angle = startAngle + ((endAngle - startAngle) / ($total - 1)) * $index;

  const radius = 170;
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * radius;
  const y = Math.sin(rad) * radius;

  return {
    style: {
      transform: `translate(${x}px, ${y}px)`,
    },
  };
})`
  position: absolute;
  top: 40%;
  left: 50%;
  transform-origin: center;
`;

const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 10px;
  position: relative;
`;

const ImgWrapper = styled.div`
  width: 250px;
  height: 250px;
  border-radius: 100%;
  overflow: hidden;
  z-index: 1;

  img {
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
  }

  .heart-button{
    left: 100px !important;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin: 30px auto 50px auto;
  
  h1 {
    width: 100%;
    color: #337179;
    font-size: clamp(2rem, 4vw, 10rem);
    font-weight: 800;
    flex-wrap: wrap;
    text-transform: uppercase;
    text-align: center;
  }
`;
