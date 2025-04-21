import { useState, useEffect, use } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSearchTerm, clearSuggestions } from "../../../store/searchSlice";
import { useDebounce } from "use-debounce";
import { fetchRecipes } from "../../../store/recipes/asyncThunks";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import Suggestions from "./Suggestions";
import { data } from "react-router-dom";
import Button from "../../common/Button";

function SearchInput() {
  const dispatch = useDispatch();
  const [displayTerm, setDisplayTerm] = useState("");

  const { searchTerm, suggestions } = useSelector((state) => state.search);
  const { titles } = useSelector((state) => state.titles);
  const { data, lastDocId, searchMode } = useSelector((state) => state.recipes);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setDisplayTerm(value);
  };

  const handleClick = () => {
    dispatch(setSearchTerm(displayTerm));
    dispatch(clearSuggestions());
    dispatch(fetchRecipes());
  };

  useEffect(() => {
    if (!searchTerm && data.length) {
      dispatch(fetchRecipes());
    }
  }, [searchTerm]);

  return (
    <InputWrapper>
      <StyledIcon></StyledIcon>
      <StyledInput type="text" placeholder={`Search for recipes or ingredient`} value={displayTerm} onChange={handleInputChange} />
      <StyledButton onClick={handleClick}>Search</StyledButton>
      <Suggestions displayTerm={displayTerm} setDisplayTerm={setDisplayTerm} />
    </InputWrapper>
  );
}
export default SearchInput;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
  width: fit-content;
`;

const StyledIcon = styled(FiSearch)`
  position: absolute;
  transform: translateY(-50%);
  color: #666;
  pointer-events: none;
  font-size: 1.5rem;
  border-radius: 100%;
  top: 25px;
  left: 20px;
`;

const StyledInput = styled.input`
  background-color: #f3f3f3;
  font-size: 16px;
  height: 50px;
  border-radius: 25px;
  outline: none;
  border: none;
  width: 500px;
  text-align: center;
  padding: 8px;
  margin: auto;
  outline: 2px solid #eff2ef;

  &:active {
  }
`;

const StyledButton = styled(Button)`
  position: absolute;
  top: 5px;
  right: 5px;
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
