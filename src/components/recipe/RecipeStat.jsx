import React from "react";
import styled from "styled-components";

export default function RecipeStat({ label, stat, icon }) {
  return (
    <StatContainer>
      <StatIcon>{icon}</StatIcon>
      <StatDetailsContainer>
        <StatLabel>{label}</StatLabel>
        <StatValue>{stat}</StatValue>
      </StatDetailsContainer>
    </StatContainer>
  );
}

const StatContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #da604e;
  width: 100%;

  &:nth-child(2),
  &:nth-child(3) {
    margin-left: 25px;
  }
  &:nth-child(1),
  &:nth-child(4) {
    margin-left: clamp(-25px, 10%, -50px);
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 25%;
    height: 100px;

    &:nth-child(2),
    &:nth-child(3) {
      margin-top: 20px;
      margin-left: 0px;
    }
    &:nth-child(1),
    &:nth-child(4) {
      margin-left: 0;
      margin-top: -50px;
    }
  }
`;

const StatIcon = styled.div`
  width: clamp(40px, 6vw, 50px);
  height: clamp(40px, 6vw, 50px);
  border-radius: 100%;
  border: 2px solid #da604e;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  padding: clamp(2px, 2vw, 10px);
`;

const StatDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 480px) {
    align-items: center;
  }
`;

const StatLabel = styled.div`
  color: #337179;
  font-size: clamp(0.8rem, 2vw, 1.1rem);
`;

const StatValue = styled.div`
  font-weight: bold;
  font-size: clamp(0.8rem, 2vw, 1.1rem);
  color: #254a5d;
`;
