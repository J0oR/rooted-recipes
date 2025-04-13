import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDebounce } from "use-debounce";
import { fetchRecipes } from "../../../store/recipesSlice"; 
import style from "./input.module.scss";
import { setSearchTerm, setSuggestions } from "../../../store/searchSlice";

const NameSearchInput = () => {
  const dispatch = useDispatch();
  const { searchTerm, dishType } = useSelector((state) => state.search);
  const { titles } = useSelector((state) => state.titles);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  useEffect(() => {
    dispatch(setSuggestions([]));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchRecipes({ dishType, debouncedSearchTerm, titles }));
  }, [dishType, debouncedSearchTerm, dispatch]);

  const handleInputChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <>
      <input type="text" placeholder={`Search recipes by name`} value={searchTerm} className={style.searchInput} onChange={handleInputChange} />
    </>
  );
};

export default NameSearchInput;
