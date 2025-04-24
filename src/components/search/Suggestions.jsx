import { useSelector, useDispatch } from "react-redux";
import { setSearchTerm, clearSuggestions, filterSuggestions } from "../../store/searchSlice";
import styled from "styled-components";
import { useEffect } from "react";
import { fetchRecipes } from "../../store/recipes/asyncThunks";

export default function Suggestions({ displayTerm, setDisplayTerm }) {
  const dispatch = useDispatch();
  const { suggestions, searchTerm, searchMode } = useSelector((state) => state.search);
  const { lastDocId } = useSelector((state) => state.recipes);
  const { ingredients } = useSelector((state) => state.ingredients);

  const handleSuggestionClick = (name) => {
    dispatch(clearSuggestions());
    setDisplayTerm(name);
    dispatch(setSearchTerm(name));
    dispatch(fetchRecipes());
  };

  useEffect(() => {
    dispatch(filterSuggestions({ displayTerm, ingredients }));
  }, [displayTerm, dispatch]);

  if (suggestions.length === 0) return null;

  return (
    <SuggestionsList>
      {suggestions.map((s) => (
        <SuggestionItem key={s.id} onClick={() => handleSuggestionClick(s.nameClean)}>
          {s.nameClean}
        </SuggestionItem>
      ))}
    </SuggestionsList>
  );
}

const SuggestionsList = styled.ul`
  list-style: none;
  padding: 5px;
  background-color: #f3f3f3;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  width: 504px;
  max-height: fit-content;
  overflow-y: auto;
  z-index: 10;
  position: absolute;
  top: 51px;
  left: -2px;
  overflow: hidden;
`;

const SuggestionItem = styled.li`
  padding: 10px;
  cursor: pointer;
  text-align: center;
  border-radius: 5px;

  &:hover {
    background: #d1d1d1;
  }
`;
