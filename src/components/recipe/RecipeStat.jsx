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
  gap: 20px;
  width: 100%;
  color: #DA604E;

&:nth-child(2), &:nth-child(3){
  margin-left: 50px;
}
&:nth-child(1), &:nth-child(4){
  margin-left: -20px;
}
`;

const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  border: 2px solid #DA604E;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
`;

const StatDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StatLabel = styled.div`
  color: #337179
`;

const StatValue = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
  color: rgb(37, 74, 93);
  
`;
