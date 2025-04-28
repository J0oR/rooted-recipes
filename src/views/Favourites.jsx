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
      //dispatch(fetchFavourites(user.uid));
      console.log(recipes);
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

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, dispatch, navigate]);

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
`;

const TagsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  margin: 50px auto -46px auto;
  width: clamp(300px, 80%, 600px);
`;

const AnimatedTag = styled.div`
  transform: translateY(20px);
  opacity: 0;
  animation: ${({ $animate }) => ($animate ? "fadeIn 0.3s ease forwards" : "none")};
  animation-delay: ${({ $animate, $index }) => ($animate ? `${0.05 * $index}s` : "0s")};

  padding: 10px 15px;
  margin: 5px;
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;

  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }

  &.selected {
    outline: none;
    color: #43927c;
    font-weight: 500;
    border-bottom: 2px solid;
  }
`;
