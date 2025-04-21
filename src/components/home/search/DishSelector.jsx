import { useState, useEffect } from "react";
import { setDishType } from "../../../store/searchSlice";
import { LuSettings2 } from "react-icons/lu";
import DishesModal from "./DishesModal";
import styled from "styled-components";
import Button from "../../common/Button";


export default function DishSelector() {

  const [modalState, setModalState] = useState({ visible: false, animateTags: false });

  const handleVisibility = () => {
    setModalState((prevState) => ({
      visible: !prevState.visible,
      animateTags: prevState.visible, 
    }));
  };

  useEffect(() => {
    setDishType("all");
  }, []);

  return (
    <BasicContainer>
      <SettingsButton onClick={() => handleVisibility()}>
        <LuSettings2 />
      </SettingsButton>
      <DishesModal modalState={modalState} setModalState={setModalState} />
    </BasicContainer>
  );
}

const BasicContainer = styled.div`
  position: relative;
`;

const SettingsButton = styled(Button)`
  background-color: transparent;
  cursor: pointer;
  font-size: 1.5rem;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #c1933f;
  position: absolute;
  top: -16px;
  transition: all 0.5s ease-in-out;
  padding: 5px;
  color: #c1933f;
  &:hover {
    background-color: #c1933f;
    color: #f3f3f3;
  }
  z-index: 12;
`;
