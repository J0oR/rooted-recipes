import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSearchTerm, setSuggestions, setClickedSuggestion } from "../../../store/searchSlice";
import { fetchRecipes } from "../../../store/recipesSlice";
import Input from "../../common/Input";

const IngredientSearchInput = () => {
  const dispatch = useDispatch();
  const { ingredients } = useSelector((state) => state.ingredients);
  const { searchTerm, dishType, clickedSuggestion } = useSelector((state) => state.search);

  // Handle switching landing to ingredient search mode when input is already filled
  useEffect(() => {
    if (searchTerm) {
      handleInputChange({ target: { value: searchTerm } });
      dispatch(fetchRecipes({ dishType }));
    }
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      dispatch(setSuggestions([]));
      dispatch(setClickedSuggestion(""));
      dispatch(fetchRecipes({ dishType }));
    }
    if (clickedSuggestion) {
      dispatch(fetchRecipes({ clickedSuggestion, dishType }));
    }
  }, [searchTerm, clickedSuggestion, dishType, dispatch]);

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

  return (
    <>
      <Input type="text" placeholder={`Search recipes by ingredient`} value={searchTerm} onChange={handleInputChange} />
    </>
  );
};

export default IngredientSearchInput;
