import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import DishTypes from "./DishTypes";
import Suggestions from "./Suggestions";
import NameSearchInput from "./NameSearchInput";
import IngredientSearchInput from "./IngredientSearchInput";
import SearchMode from "./searchMode";
import styled from "styled-components";
import StyledContainer from "../../common/Container.styled";


const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
  display: flex;
`;

const StyledIcon = styled(FiSearch)`
  position: absolute;
  top: 50%;
  left: 8px;
  transform: translateY(-50%);
  color: #666;
  pointer-events: none;
  font-size: 2.5rem;
  border-radius: 100%;
  background-color: lightyellow;
  padding: 10px;
`;

const BasicContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  margin-top: 50px;
`;

const FilteringContainer = () => {
  const [searchType, setSearchType] = useState("name");

  return (
    <BasicContainer>
      <StyledContainer>
        <InputWrapper>
          <StyledIcon></StyledIcon>
          {searchType === "name" ? <NameSearchInput /> : <IngredientSearchInput />}
        </InputWrapper>

        <SearchMode searchType={searchType} setSearchType={setSearchType} />
      </StyledContainer>
      <Suggestions />
      <DishTypes />
    </BasicContainer>
  );
};

export default FilteringContainer;
