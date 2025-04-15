import styled from "styled-components";

const BasicContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; 
  flex-wrap: wrap;
  gap: 20px;
  margin: auto;
`;

function StyledContainer({children}) {
     
  return (
    <BasicContainer>
      {children}
    </BasicContainer>
  );
}

export default StyledContainer;
