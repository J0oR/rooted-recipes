import styled from "styled-components";

export default function Ingredients({ ingredients }) {
  const formatUnit = (unit) => {
    if (!unit) return "";
    const u = unit.toLowerCase();
    if (u === "tablespoon" || u === "tablespoons") return "tbsp";
    if (u === "teaspoon" || u === "teaspoons") return "tsp";
    return unit;
  };

  return (
    <MainContainer>
      <h1>Ingredients</h1>
        <List>
          {ingredients?.map((ingredient, index) => (
            <IngredientRow key={index}>
              <span>
                {ingredient.amount} {formatUnit(ingredient.unit)}
              </span>
              <span className="name">{ingredient.nameClean}</span>
            </IngredientRow>
          ))}
        </List>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  width: clamp(300px, 80%, 550px);
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;

  h1{
    font-size: clamp(2rem, 3vw, 10rem);
    font-weight: 800;
    margin: 30px auto 50px auto;
    color: #337179;
    flex-wrap: wrap;
    text-transform: uppercase;
  }
`;

const List = styled.div`
  background-color: #ffffff;
  color: rgb(37, 74, 93);
  border-radius: 32px;
  font-size: 1rem;
  padding: 20px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  list-style: none;
  gap: 20px;
  border-radius: 15px;
`;

const IngredientRow = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 50px;
  border-bottom: 1px solid #ecf0f1;
  width: 90%;
  margin: auto;
  padding: 10px 0;

  &:last-child {
    border: none;
  }

  :nth-child(1) {
    text-align: right;
    flex: 1;
    color: #337179;
    font-weight: 500;
  }

  :nth-child(2) {
    text-align: left;
    flex: 2;
  }
`;
