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
    <Container>
      <Header>
        <span>Amount</span>
        <span>Ingredient</span>
      </Header>
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
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  width: clamp(300px, 80%, 400px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ecf0f1;
  padding: 10px 0 40px 0;
  border-radius: 15px;
  color: rgb(37, 74, 93);
  font-size: 1rem;
`;

const Header = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  font-size: 0.9rem;
  font-weight: 700;
  gap: 50px;

  :nth-child(1) {
    flex: 1;
    text-align: right;
  }
  :nth-child(2) {
    flex: 2;
    text-align: left;
  }
`;

const List = styled.ul`
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  list-style: none;
  gap: 20px;
  //border: 2px solid #C2933F;
  border-radius: 15px;
  //background-color: #F4E9D6;
`;

const IngredientRow = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 50px;

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
