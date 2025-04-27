import { useNavigate } from "react-router-dom";
import { PiTimerBold } from "react-icons/pi";
import { useEffect } from "react";
import { useRef } from "react";

import { TiThList } from "react-icons/ti";

import styled from "styled-components";
import HeartButton from "./HeartButton";

export default function RecipeCard({ recipe, $index }) {
  const navigate = useNavigate();
  const cardRef = useRef(null); // Aggiungi il ref


  const handleClick = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.style.animation = `fadeIn 0.3s ease-in-out forwards`;
      cardRef.current.style.animationDelay = `${0.01 * $index}s`;
    }
  }, [$index]);

  if (!recipe) return null;

  return (
    <>
      <Card onClick={handleClick} $index={$index}>
        <div className="image-container">
          <img src={recipe.image} alt={recipe.title} />
        </div>
        <div className="details">
          <div className="title">{recipe.title}</div>
          <span className="detail-row">
            <TiThList className="icon" />
            {recipe.ingredientsNames?.length || 0} ingredients
          </span>
          <span className="detail-row">
            <PiTimerBold className="icon" />
            {recipe.readyInMinutes} minutes
          </span>
        </div>
        <HeartButton recipeId={recipe.id}/>
      </Card>
    </>
  );
}

const Card = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  height: 150px;
  border-radius: 150px;
  width: 500px;
  color: #090500;
  position: relative;
  background-color: transparent;
  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;


  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  &:hover {
    cursor: pointer;

    .image-container img {
      transform: scale(1.1);
    }
  }

  .image-container {
    width: 170px;
    height: 170px;
    border-radius: 100%;
    overflow: hidden;
    position: absolute;
    left: -20px;
    box-shadow: rgba(0, 0, 0, 0.35) 5px 5px 15px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: brightness(80%) contrast(1);
      transition: transform 0.3s ease-in-out;
      position: relative;
      left: 0;
    }
  }

  .details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
    margin-left: 180px;
    width: 60%;
    color: #ffffff;
    color: #c1933f;

    .title {
      white-space: normal; /* Allow text to wrap to a new line */
      word-wrap: break-word; /* Ensure words break correctly if necessary */
      overflow: hidden;
      text-overflow: ellipsis;
      text-transform: uppercase;

      display: -webkit-box; /* Enable multi-line truncation */
      -webkit-line-clamp: 2; /* Limit to 2 lines (you can adjust this as needed) */
      -webkit-box-orient: vertical; /* Needed for the -webkit-line-clamp to work */
      font-size: 1rem;
      font-weight: 500;
    }

    .detail-row {
      display: flex;
      align-items: center;
      justify-content: space;
      gap: 10px;
      font-size: 0.8rem;
      color: #c9c9c9;
      color: #da5f4e;
      width: 100%;
    }

    .icon {
      font-size: 1.2rem;
    }
  }
`;
