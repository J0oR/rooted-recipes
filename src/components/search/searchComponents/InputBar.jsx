import styled from "styled-components";
import { setDishType, setSearchTerm } from "../../../store/searchSlice";
import { setSearchMode } from "../../../store/recipes/recipesSlice";
import { useEffect } from "react";
import { fetchRecipes } from "../../../store/recipes/asyncThunks";
import { useDispatch } from "react-redux";

export default function InputBar({ displayTerm, setDisplayTerm, setAnimateLens, setInputFocused, dishesModalState }) {
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setDisplayTerm(value);
    dispatch(setSearchTerm(value));
    dispatch(setSearchMode("title"));
    setAnimateLens(value.trim() !== "");
  };

  useEffect(() => {
    if (displayTerm == "") {
      dispatch(setSearchTerm(""));
      dispatch(setDishType("all"));
      dispatch(fetchRecipes());
      setAnimateLens(false);
    }
  }, [displayTerm, dispatch]);

 /*  useEffect(() => {
    dispatch(setSearchTerm(""));
    dispatch(fetchRecipes());
  }, [dispatch]); */

  return (
    <StyledInput
      type="text"
      placeholder={dishesModalState.visible ? "Dish Types" : `Search for recipes or ingredient`}
      value={displayTerm}
      onChange={handleInputChange}
      onFocus={() => setInputFocused(true)} // Set input as focused
      onBlur={() => setInputFocused(false)} // Unset input as focused
      disabled={dishesModalState.visible}
      $placeValue={dishesModalState.visible ? "Dish Types" : `Search for recipes or ingredient`}
    />
  );
}

const StyledInput = styled.input`
  width: 80%;
  border: 1px solid #c1933f;
  background-color: transparent;
  font-size: 16px;
  color: #254A5D;
  outline: none;
  border: none;
  text-align: center;
  margin: auto;
  outline: none;
  transition: all 0.1s ease-in-out;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  cursor: pointer;
 
 &::placeholder{
  color: #337179;
  font-size: ${({ $placeValue }) => ($placeValue == "Dish Types" ? "1.2rem" : "1rem")};
  font-weight: ${({ $placeValue }) => ($placeValue == "Dish Types" ? 800 : 400)};
 }
`;
