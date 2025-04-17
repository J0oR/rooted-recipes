import { useSelector, useDispatch } from "react-redux";
import { setSearchTerm, setSuggestions } from "../../../store/searchSlice";
import styled from "styled-components";
import { useEffect } from "react";

export default function Suggestions({displayTerm, setDisplayTerm}) {

  const dispatch = useDispatch();
  const { suggestions } = useSelector((state) => state.search);
  const { ingredients } = useSelector((state) => state.ingredients);

  const handleSuggestionClick = (name) => {
    dispatch(setSearchTerm(name));
    setDisplayTerm(name);
    dispatch(setSuggestions([]));
  };

  useEffect(() => {
    if (displayTerm) {
      const matches = ingredients.filter((ing) => ing.nameClean && ing.nameClean.toLowerCase().includes(displayTerm.toLowerCase()));
      dispatch(setSuggestions(matches.slice(0, 10)));
    } else {
      dispatch(setSuggestions([]));
    }
  }, [displayTerm]);

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
  width: 300px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  position: absolute;
  top: 150px;
`;

const SuggestionItem = styled.li`
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background: #43927c;
  }
`;