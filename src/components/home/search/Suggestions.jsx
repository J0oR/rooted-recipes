import { useSelector, useDispatch } from "react-redux";
import { setSearchTerm, setClickedSuggestion, setSuggestions } from "../../../store/searchSlice";
import styled from "styled-components";

const SuggestionsList = styled.ul`
  list-style: none;
  padding: 0;
  background: #eaede6;
  border-radius: 15px;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  position: absolute;
  top: 50px;
`;

const SuggestionItem = styled.li`
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background: #43927c;
  }
`;

function Suggestions() {
  const dispatch = useDispatch();
  const { suggestions } = useSelector((state) => state.search);

  const handleSuggestionClick = (name) => {
    dispatch(setSearchTerm(name));
    dispatch(setClickedSuggestion(name));
    dispatch(setSuggestions([]));
  };

  return (
    <>
      {suggestions.length > 0 && (
        <SuggestionsList>
          {suggestions.map((s) => (
            <SuggestionItem key={s.id} onClick={() => handleSuggestionClick(s.nameClean)}>
              {s.nameClean}
            </SuggestionItem>
          ))}
        </SuggestionsList>
      )}
    </>
  );
}

export default Suggestions;
