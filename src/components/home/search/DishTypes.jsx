import { useSelector, useDispatch } from "react-redux";
import style from "./dishTypes.module.scss";
import { setDishType } from "../../../store/searchSlice";

function DishTypes() {
  const dispatch = useDispatch();

  const dishTypes = ["all", "breakfast", "appetizer", "main course", "side dish", "dessert", "drink"];

  const { dishType } = useSelector((state) => state.search);

  const handleClick = (type) => {
    if (type === "all") {
      type = "";
    }
    dispatch(setDishType(type));
  }

  return (
    <div className={style.dishTypesContainer}>
      {dishTypes.map((type) => (
        <div 
        key={type} 
        className={`${style.dishTypeTag} ${dishType === (type === "all" ? "" : type) ? style.selected : ""}`}
 
        
        onClick={() => handleClick(type)}>
          {type}
        </div>
      ))}
    </div>
  );
}

export default DishTypes;
