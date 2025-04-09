import { useSelector, useDispatch } from "react-redux";
import style from "./dishTypes.module.scss";
import { setDishType } from "../../../store/recipesSlice";

function DishTypes() {
  const dispatch = useDispatch();

  const dishTypes = ["breakfast", "appetizer", "main course", "side dish", "dessert", "drink"];

  const { dishType } = useSelector((state) => state.recipes);

  return (
    <div className={style.dishTypesContainer}>
      {dishTypes.map((type) => (
        <div key={type} className={`${style.dishTypeTag} ${dishType === type ? style.selected : ""}`} onClick={() => dispatch(setDishType(type))}>
          {type}
        </div>
      ))}
    </div>
  );
}

export default DishTypes;
