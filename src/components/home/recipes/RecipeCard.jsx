import { useNavigate } from "react-router-dom";
import { FaClock } from "react-icons/fa";
import { MdFormatListNumbered } from "react-icons/md"; // List for amounts/ingredients
import styled from "styled-components";
import HeartButton from "./HeartButton";

function RecipeCard({ recipe }) {
  const navigate = useNavigate();
  

  const handleClick = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  

  if (!recipe) return null;

  return (
    <>
      <Card onClick={handleClick}>
        <img src={recipe.image} alt={recipe.title} />
        <div className="details">
          <span className="title">{recipe.title}</span>
          <div className="second-row">
            <div className="info">
              <span>
                <MdFormatListNumbered className="icon" />
                {recipe.ingredientsNames?.length || 0} ingredients
              </span>
              <span>
                <FaClock className="icon" />
                {recipe.readyInMinutes} minutes
              </span>
            </div>
            <HeartButton recipeId={recipe.id} />
          </div>
        </div>
      </Card>
    </>
  );
}

export default RecipeCard;

const Card = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  height: 200px;
  border-radius: 25px;
  background-color: #FFFFFF;
  color: #090500;
  width: 400px;
  position: relative;
  border: 2px solid #d9d9d9;

  .details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 15px;
    margin-left: 160px;
    width: 50%;

    .second-row {
      width: 100%;
      display: flex;
      align-items: flex-end;
      gap: 20px;
      justify-content: space-between;
    }

    .title {
      font-size: 1.2rem;
      font-weight: 500;
      max-width: 200px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .info {
      display: flex;
      flex-direction: column;
      align-items: space-between;
      font-size: 0.8rem;
      gap: 10px;

      span {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 10px;
      }

      .icon {
        font-size: 1rem;
      }
    }
  }

  img {
    width: 160px;
    height: 160px;
    object-fit: cover;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    filter: brightness(80%) contrast(1);
    border-radius: 100%;
    position: absolute;
    left: -35px;
  }
`;


