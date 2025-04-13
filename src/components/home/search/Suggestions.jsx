import { useSelector, useDispatch } from "react-redux";
import { setSearchTerm, setClickedSuggestion, setSuggestions } from "../../../store/searchSlice";
import style from "./suggestions.module.scss";

function Suggestions() {
  const dispatch = useDispatch();
  const { suggestions} = useSelector((state) => state.search);

  const handleSuggestionClick = (name) => {
    dispatch(setSearchTerm(name));
    dispatch(setClickedSuggestion(name));
    dispatch(setSuggestions([]));
  };

  return (
    <>
      {suggestions.length > 0 && (
        <ul className={style.suggestionsList}>
          {suggestions.map((s) => (
            <li key={s.id} className={style.suggestionItem} onClick={() => handleSuggestionClick(s.nameClean)}>
              {s.nameClean}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Suggestions;
