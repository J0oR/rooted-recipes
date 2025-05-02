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
    <Card onClick={handleClick} $index={$index}>
      <div className="image-container">
        <img src={recipe.image} alt={recipe.title} />
        <HeartButton recipeId={recipe.id} />
      </div>
      <div className="details">
        <h1 className="title">{recipe.title}</h1>
        <div className="details-row">
          <span className="detail-row">
            <TiThList className="icon" />
            {recipe.ingredientsNames?.length || 0} ingredients
          </span>
          <span className="detail-row">
            <PiTimerBold className="icon" />
            {recipe.readyInMinutes} minutes
          </span>
        </div>
      </div>
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  border-radius: 150px;
  height: clamp(110px, 80%, 150px);
  width: clamp(300px, 80vw, 450px);
  position: relative;
  background-color: #ecf0f1;
  color: #337179;
  animation: fadeIn 0.3s ease-in-out forwards;

  animation-delay: ${({ $index }) => 0.03 * $index}s;
  opacity: 0;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
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
    aspect-ratio: 1 / 1; /* NEW: mantiene proporzioni 1:1 */
    border-radius: 100%;
    overflow: hidden;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      border-radius: 100%;
      object-fit: cover;
      object-position: center;
      filter: brightness(80%) contrast(1);
      transition: transform 0.3s ease-in-out;
    }
  }

  .details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: 80%;
    gap: 10px;
    width: clamp(150px, 80%, 280px);

    .title {
      white-space: normal; /* Allow text to wrap to a new line */
      word-wrap: break-word; /* Ensure words break correctly if necessary */
      overflow: hidden;
      text-overflow: ellipsis;
      text-transform: uppercase;
      font-weight: 800;
      display: -webkit-box; /* Enable multi-line truncation */
      -webkit-line-clamp: 2; /* Limit to 2 lines (you can adjust this as needed) */
      -webkit-box-orient: vertical; /* Needed for the -webkit-line-clamp to work */
      font-size: clamp(1.2rem, 4vw, 1.5rem); /* Uso di clamp per scalare il font */
      max-width: clamp(150px, 80%, 280px);

      font-family: "Bebas Neue", sans-serif;
      font-weight: 400;
      font-style: normal;
    }

    .details-row {
      display: flex;
      flex-direction: column;
      gap: 5px;

      .detail-row {
        display: flex;
        align-items: center;
        justify-content: space;
        gap: 10px;
        font-size: 0.9rem;
        font-size: clamp(0.8rem, 1vw, 0.9rem); /* Uso di clamp per scalare il font */
        .icon {
          font-size: clamp(0.9rem, 1vw, 1.2rem); /* Uso di clamp per scalare il font */
        }
      }
    }
  }
`;
