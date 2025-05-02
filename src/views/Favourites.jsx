import { use, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { fetchFavourites, clearFavourites, filterSavedByDishType } from "../store/favouriteSlice";
import { useSelector, useDispatch } from "react-redux";
import RecipesCards from "../components/recipeCards/RecipesCards";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoadingSpinner from "../components/common/LoadingSpinner";


export default function Favourites() {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const {recipes, loading } = useSelector((state) => state.favourites);
  const navigate = useNavigate();
  const dishTypes = ["all", "breakfast", "appetizer", "main", "side", "dessert", "drink"];
  const [dishType, setDishType] = useState("all");
  const [animateTags, setAnimateTags] = useState(false);

  useEffect(() => {
    if (user) {
      if (!recipes.length) {
        dispatch(fetchFavourites());
      }
    } else {
      dispatch(clearFavourites());
      navigate("/");
    }
  }, [user, dispatch, navigate]);

  useEffect(() => {
    setAnimateTags(true);
  }, []);

  const handleClick = (type) => {
    dispatch(filterSavedByDishType(type));
    setDishType(type);
  };

 

  return (
    <>
      <TagsContainer>
        {dishTypes.map((type, i) => (
          <AnimatedTag $index={i} $animate={animateTags} key={type} className={`${dishType === type ? "selected" : ""}`} onClick={() => handleClick(type)} children={type} />
        ))}
      </TagsContainer>
      {recipes.length === 0 && !loading && <MessageContainer>0 saved recipes {dishType ? `for ${dishType}` : ""}</MessageContainer>}
      <RecipesCards recipes={recipes} />
      {loading && <LoadingSpinner />}
    </>
  );
}

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  padding-bottom: 0;
  margin-top: 100px;
  font-size: 1.2rem;
  color: #254A5D;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0px auto 0 auto;
  width: clamp(300px, 80%, 800px);
  color: #337179;
  font-size: clamp(0.8rem, 2vw, 1rem);
  text-transform: uppercase;

  @media screen and (max-width: 768px) {
    margin: 60px auto -40px auto;    
  }
`;

const AnimatedTag = styled.div`
  transform: translateY(20px);
  opacity: 0;
  animation: ${({ $animate }) => ($animate ? "fadeIn 0.3s ease forwards" : "none")};
  animation-delay: ${({ $animate, $index }) => ($animate ? `${0.05 * $index}s` : "0s")};
  border-radius: 25px;
  padding: 6px 12px;
  margin: 5px;
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out, background-color 0.3s ease-in-out, color 0.3s ease-in-out;

  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &:hover {
    cursor: pointer;
    color: #337179;
  }

  &.selected {
    
    font-weight: 700;
    
    background-color: #337179;
    color: #f3f3f3;
    
  }

  &:active:hover {
    outline: none;
    border: none;
  }
`;
