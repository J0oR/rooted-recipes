import { useState, useEffect } from "react";
import { setDishType } from "../../store/searchSlice";
import { LuSettings2 } from "react-icons/lu";
import DishesModal from "./DishesModal";
import styled from "styled-components";
import Button from "../common/Button";


export default function DishSelector({dishesModalState, setDishesModalState, disabled}) {


  const handleModalVisibility = () => {
    if (disabled) return; // prevent click when disabled
      setDishesModalState((prevState) => ({
        visible: !prevState.visible,
        animateTags: prevState.visible, 
      }));
    };


  return (
      <SettingsButton onClick={() => handleModalVisibility()} className={dishesModalState.visible ? "active" : ""} disabled={disabled}>
        <LuSettings2 />
      </SettingsButton>
  );
}


const SettingsButton = styled(Button)`

position: absolute;
  top: 8px;
  right: 8px;
  background-color: transparent;
  cursor: pointer;
  font-size: 1.5rem;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  transition: background-color 0.3s ease, color 0.3s ease;

  padding: 5px;
  color: #7d7d7d;
  outline: 2px solid #7d7d7d;
  border: none;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

  &:hover {
    outline: 2px solid #c1933f;
    //background-color: #c1933f;
    color: #c1933f;
  }

  &.active {
    outline: none;
    background-color: #c1933f;
    color: #f3f3f3;
  }
  z-index: 12;
`;
