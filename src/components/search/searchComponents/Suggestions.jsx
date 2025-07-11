import { useSelector, useDispatch } from "react-redux";
import { setSearchTerm, clearSuggestions, filterSuggestions } from "../../../store/searchSlice";
import styled from "styled-components";
import { useEffect } from "react";
import { fetchRecipes } from "../../../store/recipes/asyncThunks";

export default function Suggestions({ displayTerm, setDisplayTerm }) {
  const dispatch = useDispatch();
  const { suggestions, searchTerm, searchMode, prevSearchTerm } = useSelector((state) => state.search);
  const { lastDocId } = useSelector((state) => state.recipes);
  const { ingredients } = useSelector((state) => state.ingredients);

  const handleSuggestionClick = (name) => {
    setDisplayTerm(name);
    dispatch(setSearchTerm(name));
    dispatch(clearSuggestions());
    dispatch(fetchRecipes());
  };

  useEffect(() => {
    if (searchTerm !== prevSearchTerm) {
      dispatch(filterSuggestions({ displayTerm, ingredients }));
    }
    if (displayTerm === "") {
      dispatch(clearSuggestions());
    }
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
margin-top: 10px;
  width: 100%;
  height: fit-content;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: transparent;
  overflow: hidden;
  padding: 10px;
  border-radius: 25px;
`;

const SuggestionItem = styled.li`
  width: 100%;
  height: 35px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #E9EDEF;
  border-radius: 25px;
  color: #254A5D;
  font-size: 1rem;
  transition: all 0.1s ease-in-out;

  &:hover {
    border: 2px solid #337179;
    color: #337179;
  }
`;
