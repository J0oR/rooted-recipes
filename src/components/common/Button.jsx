import styled from "styled-components";
import { useState } from "react";

export default function Button({ className, onClick, children }) {

  const [isAnimating, setIsAnimating] = useState(false);


  const handleClick = (e) => {
    onClick?.(e);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300); 
  };

  return (
    <BasicButton className={`${className || ""} ${isAnimating ? "animating" : ""}`} onClick={handleClick}>
      {children}
    </BasicButton>
  );
}



const BasicButton = styled.button`

cursor: pointer;

  &.animating {
    animation: clickAnimation 0.3s ease;
  }

  @keyframes clickAnimation {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.95);
    }
    100% {
      transform: scale(1);
    }
  } 
`;

