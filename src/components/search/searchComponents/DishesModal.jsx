import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { filterDataByDishType } from "../../../store/recipes/recipesSlice";
import { setDishType } from "../../../store/searchSlice";
import { useEffect } from "react";
import { fetchRecipes } from "../../../store/recipes/asyncThunks";

export default function DishesModal({ dishesModalState, setDishesModalState }) {
  const dishTypes = ["all", "breakfast", "appetizer", "main", "side", "dessert", "drink"];
  const { dishType } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const { visible, animateTags } = dishesModalState;

  const handleClick = (type) => {
    dispatch(setDishType(type));
    //dispatch(filterDataByDishType(type));
    dispatch(fetchRecipes());
    setTimeout(() => setDishesModalState({ visible: false, animateTags: false }), 100);
  };

  // Trigger tag animation on modal visibility
  useEffect(() => {
      setDishesModalState((prevState) => ({ ...prevState, animateTags: visible ? true : false }));
  }, [visible]);

  // on component mount, set dishType to "all"
  useEffect(() => {
    dispatch(setDishType("all"));
  }, []);

  return (
    <Modal $visible={visible}>
      <TagsContainer>
        {dishTypes.map((type, i) => (
          <AnimatedTag $index={i} $animate={animateTags} key={type} className={`${dishType === type ? "selected" : ""}`} onClick={() => handleClick(type)} children={type} />
        ))}
      </TagsContainer>
    </Modal>
  );
}

const Modal = styled.div`
  height: fit-content;
  gap: 20px;
  background-color: transparent;
  color: #757575;
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) => ($visible ? "translateY(0)" : "translateY(-2px)")};
  transform-origin: top;
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 50px;
  margin: auto;
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
