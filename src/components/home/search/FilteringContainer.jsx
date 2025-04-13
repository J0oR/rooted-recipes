import { useState } from "react";
import style from "./filteringContainer.module.scss";
import { FiSearch } from "react-icons/fi";
import DishTypes from "./DishTypes";
import Suggestions from "./Suggestions";
import NameSearchInput from "./NameSearchInput";
import IngredientSearchInput from "./IngredientSearchInput";
import SearchMode from "./searchMode";

const FilteringContainer = () => {
  const [searchType, setSearchType] = useState("name");

  return (
    <div className={style.searchContainer}>
      <div className={style.inputSwitchContainer}>
        <div className={style.inputWrapper}>
          <FiSearch className={style.icon} />
          {searchType === "name" ? <NameSearchInput /> : <IngredientSearchInput />}
        </div>
        <SearchMode searchType={searchType} setSearchType={setSearchType} />
      </div>
      <Suggestions />
      <DishTypes />
    </div>
  );
};

export default FilteringContainer;
