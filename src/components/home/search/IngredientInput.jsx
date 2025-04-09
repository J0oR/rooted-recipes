import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; 
//import { db } from "../config/firebase";
import { query, getDocs, collection, limit, where } from "firebase/firestore";
import style from "./ingredientInput.module.scss";
import { FiSearch } from "react-icons/fi";
import { useDebounce } from "use-debounce";
import { data } from "react-router-dom";
import { setSearchTerm, setClickedSearchTerm, setDishType, setSuggestions, clearSuggestions, fetchRecipes } from "../../../store/recipesSlice"; // adjust path accordingly
import { DiSpark } from "react-icons/di";
import DishTypes from "./DishTypes";
import Suggestions from "./Suggestions";

const IngredientInput = () => {
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const dispatch = useDispatch();
  const { searchTerm, clickedSearchTerm, dishType } = useSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(fetchRecipes({ clickedSearchTerm, dishType }));
  }, [clickedSearchTerm, dishType, dispatch]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    dispatch(setSearchTerm(value));

    if (value.length > 0) {
      const matches = ingredients.filter((ing) => ing.nameClean && ing.nameClean.toLowerCase().includes(value.toLowerCase()));
      dispatch(setSuggestions(matches.slice(0, 10)));
    } else {
      dispatch(clearSuggestions());
    }
  };

  

  return (
    <div className={style.searchContainer}>
      <div className={style.inputWrapper}>
        <input type="text" placeholder="search for a recipe" value={searchTerm} onChange={handleInputChange} className={style.searchInput} />
        <FiSearch className={style.icon} />
      </div>
      <Suggestions />
      <DishTypes />
    </div>
  );
};

export default IngredientInput;
