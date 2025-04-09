import { useSelector, useDispatch } from "react-redux";
import { setSearchTerm, setClickedSearchTerm, clearSuggestions } from "../../../store/recipesSlice";
import style from "./suggestions.module.scss";

function Suggestions() {
  const dispatch = useDispatch();
  const { suggestions} = useSelector((state) => state.recipes);

  const handleSuggestionClick = (name) => {
    dispatch(setSearchTerm(name));
    dispatch(setClickedSearchTerm(name));
    dispatch(clearSuggestions());
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
