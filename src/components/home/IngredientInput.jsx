import { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { query, getDocs, collection, limit, where } from "firebase/firestore";
import { saveRecipesToFirebase, saveIngredientsToFirebase, data as utilsData } from "../../utils";
import style from "./ingredientInput.module.scss";
import { FiSearch } from "react-icons/fi";

const IngredientInput = ({ ingredients, setLoading, setData, setError }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [clickedSearchTerm, setClickedSearchTerm] = useState("");

  const [suggestions, setSuggestions] = useState([]);
  const dishTypes = ["breakfast", "appetizer", "main course", "side dish", "dessert", "drink"];
  /* const dishTypes = ["main course", "side dish", "dessert", "appetizer", "salad", "bread", "breakfast", "soup", "beverage", "sauce", "marinade", "fingerfood", "snack", "drink"]; */
  const [dishType, setDishType] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      let q;
      if (searchTerm) {
        console.log("fetchData filtered");
        q = query(collection(db, "recipes"), where("ingredientsNames", "array-contains", clickedSearchTerm.toLowerCase()));
      } else {
        console.log("fetchData");
        q = query(collection(db, "recipes"), limit(50));
      }
      const querySnapshot = await getDocs(q);
      let recipes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // in-memory filtering
      if (clickedSearchTerm && dishType) {
        recipes = recipes.filter((r) => r.dishTypes.includes(dishType.toLowerCase()));
      }
      setData(recipes);
      setError(null);
    } catch (error) {
      setError(error);
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setLoading(true);

    if (value.length > 0) {
      const matches = ingredients.filter((ing) => ing.nameClean.toLowerCase().includes(value.toLowerCase()));

      setSuggestions(matches.slice(0, 10)); // limit to 10 suggestions
      console.log(suggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (name) => {
    setSearchTerm(name);
    setClickedSearchTerm(name);
    setSuggestions([]);
  };

  // fetch data when landing or when searchTerm resets
  useEffect(() => {
    if (searchTerm === "") {
      fetchData();
    }
  }, [searchTerm]);

  // Fetch filtered data when a suggestion is clicked
  useEffect(() => {
    if (clickedSearchTerm !== "" || dishType !== "") {
      fetchData();
    }
  }, [clickedSearchTerm, dishType]);

  return (
    <div className={style.searchContainer}>

      <div className={style.inputWrapper}>
        <input type="text" placeholder="search for a recipe" value={searchTerm} onChange={(e) => handleInputChange(e)} className={style.searchInput} />
        <FiSearch className={style.icon} />
      </div>

      {suggestions.length > 0 && (
        <ul className={style.suggestionsList}>
          {suggestions.map((s) => (
            <li key={s.id} className={style.suggestionItem} onClick={() => handleSuggestionClick(s.nameClean)}>
              {s.nameClean}
            </li>
          ))}
        </ul>
      )}

      <div className={style.dishTypesContainer}>
        {dishTypes.map((type) => (
          <div className={`${style.dishTypeTag} ${dishType === type ? style.selected : ""}`} key={type} onClick={() => setDishType(type)}>
            {type}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngredientInput;
