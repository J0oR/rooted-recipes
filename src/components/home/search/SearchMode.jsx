import style from "./searchMode.module.scss";

const SearchMode = ({ searchType, setSearchType }) => {
  return (
    <div className={style.container}>
      <button onClick={() => setSearchType("name")} className={`${style.btn} ${searchType === "name" ? style.active : ""}`}
      >
        by name
      </button>
      <button onClick={() => setSearchType("ingredient")} className={`${style.btn} ${searchType === "ingredient" ? style.active : ""}`}
      >
        by ingredient
      </button>
    </div>
  );
};

export default SearchMode;
