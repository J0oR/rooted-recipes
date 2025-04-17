import React from "react";
import styled from "styled-components";

export default function LoadingSpinner(){
    return (
        <Spinner />
    )
}


const Spinner = styled.div`
    margin: 150px auto;
    width: 48px;
    height: 48px;
    border: 5px solid #823939;
    border-bottom-color: transparent;
    border-radius: 50%;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
