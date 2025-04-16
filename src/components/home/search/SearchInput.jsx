import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSearchTerm, setSuggestions, setClickedSuggestion } from "../../../store/searchSlice";
import { useDebounce } from "use-debounce";
import { fetchRecipes } from "../../../store/recipesSlice";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";

function SearchInput() {
  const dispatch = useDispatch();
  const { ingredients } = useSelector((state) => state.ingredients);
  const { searchTerm, dishType, clickedSuggestion } = useSelector((state) => state.search);
  const { titles } = useSelector((state) => state.titles);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const handleInputChange = (e) => {
    const value = e.target.value;
    dispatch(setSearchTerm(e.target.value));

    if (value.length > 0) {
      const matches = ingredients.filter((ing) => ing.nameClean && ing.nameClean.toLowerCase().includes(value.toLowerCase()));
      dispatch(setSuggestions(matches.slice(0, 10)));
    } else {
      dispatch(setClickedSuggestion(""));
      dispatch(setSuggestions([]));
    }
  };

  const handleKeyDown = (e) => {
    console.log("Key pressed:", e.key); // This will log every key pressed

    if (e.key === "Enter") {
      dispatch(fetchRecipes({ dishType, debouncedSearchTerm, titles }));
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm === "") {
      dispatch(fetchRecipes({ debouncedSearchTerm, dishType }));
    }

    if (clickedSuggestion) {
      dispatch(fetchRecipes({ clickedSuggestion, dishType }));
    }
  }, [debouncedSearchTerm, clickedSuggestion, dishType, dispatch]);

  return (
    <InputWrapper>
      <StyledIcon></StyledIcon>
      <StyledInput type="text" placeholder={`Search for recipes or ingredient`} value={searchTerm} onChange={handleInputChange} onKeyDown={handleKeyDown} />
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
  width: 400px;
  text-align: center;
  padding: 8px;
  padding-left: 25px;
  margin: auto;
  outline: 1px solid #7f7e72;

  &:active {
  }
`;
