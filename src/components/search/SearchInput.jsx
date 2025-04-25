import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import Suggestions from "./searchComponents/Suggestions";
import DishSelector from "./searchComponents/DishSelector";
import DishesModal from "./searchComponents/DishesModal";
import InputBar from "./searchComponents/InputBar";
import SearchButton from "./searchComponents/SearchButton";

function SearchInput() {
  const [displayTerm, setDisplayTerm] = useState("");
  const [animateLens, setAnimateLens] = useState(false);
  const [dishesModalState, setDishesModalState] = useState({ visible: false, animateTags: false });
  const [inputFocused, setInputFocused] = useState(false); // Track if input is focused
  const { searchTerm, suggestions } = useSelector((state) => state.search);

  return (
    <>
      <Overlay $isActive={inputFocused || dishesModalState.visible || suggestions.length > 0} />
      <InputWrapper $modalVisible={dishesModalState.visible || suggestions.length}>
        <InputRow>
          <DishSelector dishesModalState={dishesModalState} setDishesModalState={setDishesModalState} disabled={suggestions.length} />
          <InputBar
            displayTerm={displayTerm}
            setDisplayTerm={setDisplayTerm}
            setAnimateLens={setAnimateLens}
            setInputFocused={setInputFocused}
            dishesModalState={dishesModalState}
          />
          <SearchButton displayTerm={displayTerm} dishesModalState={dishesModalState.visible} animateLens={animateLens}/>
        </InputRow>
        <ModalRow>
          {!suggestions.length && <DishesModal dishesModalState={dishesModalState} setDishesModalState={setDishesModalState} />}
          {!dishesModalState.visible && <Suggestions displayTerm={searchTerm} setDisplayTerm={setDisplayTerm} />}
        </ModalRow>
      </InputWrapper>
    </>
  );
}

export default SearchInput;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3); // Dark overlay
  transition: background-color 0.3s ease-in-out;
  z-index: 50; // Ensure it is above everything else
  visibility: ${({ $isActive }) => ($isActive ? "visible" : "hidden")};
`;

const InputWrapper = styled.div`
  position: absolute;
  top: 100px;
  width: 500px;
  z-index: 100;
  border-radius: 25px;
  background-color: #f3f3f3;
  display: flex;
  flex-direction: column;
  transition: max-height 0.3s ease-in-out;
  max-height: ${({ $modalVisible }) => ($modalVisible ? "530px" : "58px")};
  overflow: hidden;
  padding: 10px;
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;



const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const ModalRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
