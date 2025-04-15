import { useSelector, useDispatch } from "react-redux";
import { setDishType } from "../../../store/searchSlice";
import styled from "styled-components";

import Tag  from "../../common/Tag.styled";

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
    if (type === "all") {
      type = "";
    }
    dispatch(setDishType(type));
  };

  return (
    <BasicContainer>
      {dishTypes.map((type) => (
        <Tag key={type} className={`${dishType === (type === "all" ? "" : type) ? "selected" : ""}`} onClick={() => handleClick(type)} children={type} />
      ))}
    </BasicContainer>
  );
}

export default DishTypes;
