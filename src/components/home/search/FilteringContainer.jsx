import { useState } from "react";

import DishTypes from "./DishTypes";

/* import NameSearchInput from "./NameSearchInput";
import IngredientSearchInput from "./IngredientSearchInput";
import SearchMode from "./searchMode"; */
import styled from "styled-components";
import SearchInput from "./SearchInput";

const BasicContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  padding-bottom: 0;
`;

const FilteringContainer = () => {
  /* const [searchType, setSearchType] = useState("name"); */

  return (
    <BasicContainer>
      <SearchInput />
      <DishTypes />
    </BasicContainer>
  );
};

export default FilteringContainer;
