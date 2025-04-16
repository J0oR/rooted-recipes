import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSearchTerm, setSuggestions, setClickedSuggestion } from "../../../store/searchSlice";
import { useDebounce } from "use-debounce";
import { fetchRecipes } from "../../../store/recipesSlice";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import Suggestions from "./Suggestions";

function SearchInput() {
  const dispatch = useDispatch();
  const [displayTerm, setDisplayTerm] = useState("");
  
  const { searchTerm, dishType, clickedSuggestion } = useSelector((state) => state.search);
  const { titles } = useSelector((state) => state.titles);
  const [debouncedSearchTerm] = useDebounce(displayTerm, 500);

  const handleInputChange = (e) => {
    setDisplayTerm(e.target.value);
    dispatch(setSearchTerm(debouncedSearchTerm));

    
  };

  const handleClick = () => {

    if (clickedSuggestion) {
      dispatch(fetchRecipes({ clickedSuggestion, dishType}));
    }
    else if (debouncedSearchTerm) {
      dispatch(setSearchTerm(debouncedSearchTerm));
      dispatch(fetchRecipes({ debouncedSearchTerm, dishType, titles}));
    }
    else {
      dispatch(fetchRecipes({dishType}));
    }
  };

  


  return (
    <>
    <InputWrapper>
      <StyledIcon></StyledIcon>
      <StyledInput type="text" placeholder={`Search for recipes or ingredient`} value={displayTerm} onChange={handleInputChange} />
      <StyledButton onClick={handleClick}>Search</StyledButton>
    </InputWrapper>
    <Suggestions  displayTerm={displayTerm} setDisplayTerm={setDisplayTerm}/>
    </>
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
  outline: 1px solid #7f7e72;

  &:active {
  }
`;

const StyledButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  height: 40px;
  border-radius: 25px;
  border: none;
  cursor: pointer;
  width: 100px;       
  background-color: #89B919;
  color: #f3f3f3;
  font-size: 1rem;
`;