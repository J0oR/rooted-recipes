import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDebounce } from "use-debounce";
import { fetchRecipes } from "../../../store/recipesSlice"; 
import { setSearchTerm, setSuggestions } from "../../../store/searchSlice";
import Input from "../../common/Input";

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
      <Input type="text" placeholder={`Search recipes by name`} value={searchTerm} onChange={handleInputChange} />
    </>
  );
};

export default NameSearchInput;
