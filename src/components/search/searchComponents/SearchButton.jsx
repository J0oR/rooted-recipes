import Button from "../../common/Button";
import { setSearchTerm, clearSuggestions } from "../../../store/searchSlice";
import { fetchRecipes } from "../../../store/recipes/asyncThunks";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";

export default function SearchButton({ displayTerm, dishesModalState, animateLens }) {
    const dispatch = useDispatch();
    const {searchTerm, prevSearchTerm} = useSelector((state) => state.search);

    const handleClick = () => {
        dispatch(setSearchTerm(displayTerm));
        dispatch(clearSuggestions());
        dispatch(fetchRecipes());
      };

    return (
        <StyledButton onClick={handleClick} disabled={!displayTerm || searchTerm === prevSearchTerm} $visible={dishesModalState} $animateLens={animateLens} >
            <LensIcon $animateLens={animateLens} />
        </StyledButton>
    );
}

const StyledButton = styled(Button)`
  border-radius: 100%;
  border: none;
  cursor: pointer;
  color: #337179;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ $visible }) => ($visible ? 0 : 1)};
  transition: opacity 0.3s ease-in-out;
  width: 40px;
  height: 40px;
  padding: ${({ $animateLens }) =>($animateLens ? "0px" : "5px")};
  border: ${({ $animateLens }) =>($animateLens ? "2px solid #337179" : "2px solid #7d7d7d")};
  opacity: ${({ $animateLens }) => ($animateLens ? 1 : 0)};
  
  &:hover {
    border: 2px solid #337179;
    background-color: #337179;
    color: #f3f3f3;
  }
`;

const LensIcon = styled(FiSearch)`
  pointer-events: none;
  font-size: 1.5rem;
  border-radius: 100%;
`;