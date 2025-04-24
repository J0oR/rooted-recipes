import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { filterDataByDishType } from "../../store/recipes/recipesSlice";
import { setDishType } from "../../store/searchSlice";

import { useEffect } from "react";

export default function DishesModal({ modalState, setModalState }) {
  const dishTypes = ["all", "breakfast", "appetizer", "main course", "side dish", "dessert", "drink"];

  const { dishType } = useSelector((state) => state.search);
  const dispatch = useDispatch();

  const { visible, animateTags } = modalState;

  const handleClick = (type) => {
    dispatch(setDishType(type));
    setModalState((prevState) => ({
      visible: false, // Close the modal
      animateTags: false, // Reset animation
    }));
    if (type) {
      dispatch(filterDataByDishType(type));
    }
  };

  // Trigger tag animation
  useEffect(() => {
    if (visible) {
      // Wait a bit to ensure modal is visible before animating tags
      setTimeout(() => setModalState((prevState) => ({ ...prevState, animateTags: true })), 100);
    } else {
      setModalState((prevState) => ({ ...prevState, animateTags: false }));
    }
  }, [visible]);

  return (
    <Modal $visible={visible}>
      <h1>Dish Types</h1>
      <TagsContainer>
        {dishTypes.map((type, i) => (
          <AnimatedTag $index={i} $animate={animateTags} key={type} className={`${dishType === type ? "selected" : ""}`} onClick={() => handleClick(type)} children={type} />
        ))}
      </TagsContainer>
    </Modal>
  );
}

const Modal = styled.div`
  width: 502px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  gap: 20px;
  position: absolute;
  left: -521px;
  top: 35px;
  background-color: #efefef;
  color: #757575;
  transition: all 0.3s ease-in-out;
  border-radius: 25px;
  z-index: 10;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px,
    rgba(0, 0, 0, 0.09) 0px -3px 5px;
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) => ($visible ? "scale(1)" : "scale(0.8)")};
  transform-origin: top right;
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;


  h1 {
    font-size: 1.2rem;
    font-weight: 500;
  }
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
  animation-delay: ${({ $animate, $index }) => ($animate ? `${0.1 * $index}s` : "0s")};

  padding: 10px 15px;
  margin: 5px;
  transition: all 0.3s ease-in-out;

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
