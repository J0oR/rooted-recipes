import { useSelector, useDispatch } from "react-redux";
import { setDishType} from "../../../store/searchSlice";
import { filterDataByDishType } from "../../../store/recipesSlice";
import styled from "styled-components";

import Tag  from "../../common/Tag.styled";
import { useEffect } from "react";

const BasicContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin: auto;
  width: 100%;
`;

function DishTypes() {
  const dispatch = useDispatch();

  const dishTypes = ["all", "breakfast", "appetizer", "main course", "side dish", "dessert", "drink"];

  const { dishType } = useSelector((state) => state.search);

  const handleClick = (type) => {
    
    dispatch(setDishType(type));
    if (type)
    {
      dispatch(filterDataByDishType(type));
    }
  };

  useEffect(() => {
    setDishType("all");
  }, []);

  return (
    <BasicContainer>
      {dishTypes.map((type) => (
        <Tag key={type} className={`${dishType === type ? "selected" : ""}`} onClick={() => handleClick(type)} children={type} />
      ))}
    </BasicContainer>
  );
}

export default DishTypes;
