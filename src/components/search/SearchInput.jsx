import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import Suggestions from "./searchComponents/Suggestions";
import DishSelector from "./searchComponents/DishSelector";
import DishesModal from "./searchComponents/DishesModal";
import InputBar from "./searchComponents/InputBar";
import SearchButton from "./searchComponents/SearchButton";
import { clearSuggestions } from "../../store/searchSlice";

function SearchInput() {
  const dispatch = useDispatch();
  const [displayTerm, setDisplayTerm] = useState("");
  const [animateLens, setAnimateLens] = useState(false);
  const [dishesModalState, setDishesModalState] = useState({ visible: false, animateTags: false });
  const [inputFocused, setInputFocused] = useState(false); // Track if input is focused
  const { searchTerm, suggestions } = useSelector((state) => state.search);
  
  const exit = () => {
    setDishesModalState({ visible: false, animateTags: false });
    setInputFocused(false);
    dispatch(clearSuggestions());
  }

  return (
    <>
      <Overlay $isActive={inputFocused || dishesModalState.visible || suggestions.length > 0} onClick={()=>exit()}/>
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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3); // Dark overlay
  transition: background-color 0.3s ease-in-out;
  z-index: 50; // Ensure it is above everything else
  visibility: ${({ $isActive }) => ($isActive ? "visible" : "hidden")};
  height: 100vh;
`;

const InputWrapper = styled.div`
  position: absolute;
  top: 150px;


  @media (max-width: 768px) {
    top: 250px;
    right: auto;
  }
  width: clamp(300px, 80%, 500px);
  z-index: 70;
  border-radius: 25px;
  background-color: #f3f3f3;
  display: flex;
  flex-direction: column;
  transition: max-height 0.3s ease-in-out, background-color 0.1s ease-in-out;
  max-height: ${({ $modalVisible }) => ($modalVisible ? "530px" : "64px")};
  overflow: hidden;
  padding: 10px;
  

  &:hover{
    cursor: pointer;
    background-color: #e6e5e5;
  }
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;


const ModalRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
