import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSearchTerm, clearSuggestions } from "../../store/searchSlice";
import { setSearchMode } from "../../store/recipes/recipesSlice";
import { fetchRecipes } from "../../store/recipes/asyncThunks";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import Suggestions from "./Suggestions";
import DishSelector from "./DishSelector";
import DishesModal from "./DishesModal";
import { setDishType } from "../../store/searchSlice";
import Button from "../common/Button";

function SearchInput() {
  const dispatch = useDispatch();
  const [displayTerm, setDisplayTerm] = useState("");
  const [animateLens, setAnimateLens] = useState(false);
  const [dishesModalState, setDishesModalState] = useState({ visible: false, animateTags: false });
  const [inputFocused, setInputFocused] = useState(false); // Track if input is focused
  const { searchTerm, suggestions } = useSelector((state) => state.search);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setDisplayTerm(value);
    dispatch(setSearchTerm(value));
    dispatch(setSearchMode("title"));
    setAnimateLens(value.trim() !== "");
  };

  const handleClick = () => {
    dispatch(setSearchTerm(displayTerm));
    dispatch(clearSuggestions());
    dispatch(fetchRecipes());
  };

  useEffect(() => {
    if (!searchTerm) {
      dispatch(fetchRecipes());
    }
  }, [searchTerm]);

  useEffect(() => {
    setDishType("all");
  }, []);

  return (
    <>
      <Overlay $isActive={inputFocused || dishesModalState.visible || suggestions.length > 0} />
      <InputWrapper $modalVisible={dishesModalState.visible || suggestions.length}>
        <StyledIcon $animateLens={animateLens}></StyledIcon>
        <StyledInput
          type="text"
          placeholder={dishesModalState.visible ? "Dish Types" : `Search for recipes or ingredient`}
          value={displayTerm}
          onChange={handleInputChange}
          onFocus={() => setInputFocused(true)} // Set input as focused
          onBlur={() => setInputFocused(false)} // Unset input as focused
          $suggestions={suggestions.length}
          $dishesModalState={dishesModalState.visible}
          disabled={dishesModalState.visible}
        />
        <SearchButton onClick={handleClick}>Search</SearchButton>
        <DishSelector dishesModalState={dishesModalState} setDishesModalState={setDishesModalState} disabled={suggestions.length} />
        {!suggestions.length && <DishesModal dishesModalState={dishesModalState} setDishesModalState={setDishesModalState} />}
        {!dishesModalState.visible && <Suggestions displayTerm={searchTerm} setDisplayTerm={setDisplayTerm} />}
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
 position: relative;
  width: 100%;
  z-index: 100;
  border-radius: 25px;
  background-color: #f3f3f3;
  display: flex;
  flex-direction: column;
  transition: max-height 0.3s ease-in-out;
  overflow: hidden;
  max-height: ${({ $modalVisible }) => ($modalVisible ? "500px" : "50px")};
`;

const StyledIcon = styled(FiSearch)`
  position: absolute;
  transform: translateY(-50%);
  color: #666;
  pointer-events: none;
  font-size: 1.5rem;
  border-radius: 100%;
  top: 15px;
  left: 20px;
  transition: transform 0.3s ease-in-out;
  transform: ${({ $animateLens }) => ($animateLens ? "scale(1.3)" : "scale(1)")};
  transform-origin: center;
`;

const StyledInput = styled.input`
  border: 1px solid #c1933f;
  background-color: transparent;
  font-size: 16px;
  outline: none;
  border: none;
  width: 500px;
  padding: 16px;
  padding-left: 100px;
  margin: auto;
  outline: none;
  transition: all 0.1s ease-in-out;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`;

const SearchButton = styled(Button)`
  position: absolute;
  top: 5px;
  right: 50px;
  height: 40px;
  border-radius: 25px;
  border: none;
  cursor: pointer;
  width: 100px;
  background-color: #89b919;
  color: #f3f3f3;
  font-size: 1rem;

  &:hover {
    background-color: #43927c;
  }
`;
