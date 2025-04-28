import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

export default function LoadingSpinner(){

  const { loading } = useSelector((state) => state.recipes);


    return (
        <Spinner className={`loading-spinner ${!loading ? 'hidden' : ''}`}/>
    )
}


const Spinner = styled.div`
    margin: 150px auto;
    width: 48px;
    height: 48px;
    border: 5px solid #254A5D;
    border-bottom-color: transparent;
    border-radius: 50%;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    opacity: 1;
    transition: opacity 0.3s ease-in-out;

    &.hidden {
      opacity: 0;
      pointer-events: none;
    }


  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
