import Container from "../../common/Container.styled";
import Button from "../../common/Button";
import Suggestions from "./Suggestions";

const SearchMode = ({ searchType, setSearchType }) => {
  return (
    <Container>
      <Button onClick={() => setSearchType("name")} className={searchType === "name" ? "active" : ""} children={"by name"} />

      <Button onClick={() => setSearchType("ingredient")} className={searchType === "ingredient" ? "active" : ""} children={"by ingredient"} />
    </Container>
  );
};

export default SearchMode;
