import { useSelector, useDispatch } from "react-redux";
import { setSearchTerm, clearSuggestions, filterSuggestions } from "../../../store/searchSlice";
import styled from "styled-components";
import { useEffect } from "react";
import { fetchRecipes } from "../../../store/recipes/asyncThunks";

export default function Suggestions({ displayTerm, setDisplayTerm }) {
  const dispatch = useDispatch();
  const { suggestions, searchTerm, searchMode } = useSelector((state) => state.search);
  const { lastDocId} = useSelector((state) => state.recipes);
  const { titles } = useSelector((state) => state.titles);
  const { ingredients } = useSelector((state) => state.ingredients);

  const handleSuggestionClick = (name) => {
    setDisplayTerm(name);
    dispatch(setSearchTerm(name));
    dispatch(clearSuggestions());
    dispatch(fetchRecipes());
  };

  useEffect(() => {
    dispatch(filterSuggestions({ displayTerm, ingredients }));
  }, [displayTerm, dispatch]);

  if (suggestions.length === 0) return null;

  return (
    <>
      <SuggestionsList>
        {suggestions.map((s) => (
          <SuggestionItem key={s.id} onClick={() => handleSuggestionClick(s.nameClean)}>
            {s.nameClean}
          </SuggestionItem>
        ))}
      </SuggestionsList>
    </>
  );
}

const SuggestionsList = styled.ul`
  list-style: none;
  padding: 0;
  background: #eaede6;
  border-radius: 15px;
  width: 490px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  position: absolute;
  width: 90%;
  top: 60px;
  left: 5%;
`;

const SuggestionItem = styled.li`
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background: #43927c;
  }
`;
