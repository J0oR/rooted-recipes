import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDishType } from "../../../store/searchSlice";
import { filterDataByDishType } from "../../../store/recipesSlice";
import { LuSettings2 } from "react-icons/lu";
import { RiCloseCircleLine } from "react-icons/ri";

import styled from "styled-components";

import Tag from "../../common/Tag.styled";
import { useEffect } from "react";

export default function DishTypes() {
  const dispatch = useDispatch();

  const dishTypes = ["all", "breakfast", "appetizer", "main course", "side dish", "dessert", "drink"];

  const { dishType } = useSelector((state) => state.search);
  const [visible, setVisible] = useState(false);

  const handleClick = (type) => {
    dispatch(setDishType(type));
    setVisible(false);
    if (type) {
      dispatch(filterDataByDishType(type));
    }
  };

  const handleVisibility = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    setDishType("all");
  }, []);

  return (
    <BasicContainer $visible={visible}>
      <SettingsButton onClick={() => handleVisibility()} $visible={visible}>
        <LuSettings2 />
      </SettingsButton>
      {visible && <h1>Dish Types</h1>}
      {visible && (
        <TagsContainer $visible={visible}>
          <CloseModalButton onClick={() => handleVisibility()}>
            <RiCloseCircleLine />
          </CloseModalButton>

          {dishTypes.map((type, i) => (
            <AnimatedTag key={type} index={i} className={`${dishType === type ? "selected" : ""}`} onClick={() => handleClick(type)} children={type} />
          ))}
        </TagsContainer>
      )}
    </BasicContainer>
  );
}

const BasicContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  flex-wrap: wrap;
  margin: auto;
  background-color: lightsalmon;
  width: ${({ $visible }) => ($visible ? "510px" : "fit-content")};
  height: ${({ $visible }) => ($visible ? "200px" : "fit-content")};
  position: ${({ $visible }) => ($visible ? "absolute" : "static")};
  top: ${({ $visible }) => ($visible ? "120px" : "auto")};
  background-color: ${({ $visible }) => ($visible ? "#f3f3f3" : "transparent")};
  transition: all 0.3s ease-in-out;
  border-radius: 25px;
  z-index: 10;
  padding: 10px;

  h1{
    position: absolute;
    font-weight: 500;
    font-size: 1.5rem;
  }
`;

const SettingsButton = styled.button`
  background-color: transparent;
  cursor: pointer;
  font-size: 1.5rem;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #c1933f;
  position: ${({ $visible }) => ($visible ? "absolute" : "static")};
  transform: ${({ $visible }) => ($visible ? "translatex(-220px)" : "translateX(0)")};
  transition: all 0.5s ease-in-out;
  padding: 5px;
  color: #c1933f;
  &:hover {
    background-color: #c1933f;
    color: #f3f3f3;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 50px;
`;

const CloseModalButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  cursor: pointer;
  font-size: 2.5rem;
  color: #da5f4e;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;
  border: none;

  &:hover {
    background-color: #da5f4e;
    color: #f3f3f3;
  }
`;

const AnimatedTag = styled(Tag)`
  opacity: 0;
  transform: translateY(20px);
  animation: ${({ index }) => `fadeIn 0.3s ease forwards ${index * 0.1}s`};

  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
