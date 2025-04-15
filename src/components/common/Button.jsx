import styled from "styled-components";

const BasicButton = styled.button`
  padding: 10px 20px;
  border-radius: 15px;
  border: none;
  cursor: pointer;
  width: fit-content;

  &:hover {
    outline: 1px solid #43927c;
  }

  &.active {
    outline: 1px solid #43927c;
    color: #43927c;
  }
`;

function Button({ className, onClick, children }) {
  
    return (
      <BasicButton className={className} onClick={onClick}>
        {children}
      </BasicButton>
    );
  }
  
export default Button;
