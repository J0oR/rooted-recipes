import { useState, useEffect } from "react";
import { setDishType } from "../../../store/searchSlice";
import { LuSettings2 } from "react-icons/lu";
import DishesModal from "./DishesModal";
import styled from "styled-components";
import Button from "../../common/Button";

export default function DishSelector({ dishesModalState, setDishesModalState, disabled }) {
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
  border-radius: 100%;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: #7d7d7d;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease, color 0.3s ease;
  width: 40px;
  height: 40px;
  padding: 5px;
  border: 2px solid #7d7d7d;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  outline: none;

  &:hover {
    border: 2px solid #337179;
    //background-color: #c1933f;
    color: #337179;
  }

  &.active {
    outline: none;
    background-color: #337179;
    border: 2px solid #337179;
    color: #f3f3f3;
  }
  z-index: 12;
`;
