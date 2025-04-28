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
  color: #DA604E;
  width: 100%;

&:nth-child(2), &:nth-child(3){
  margin-left: 25px;
}
&:nth-child(1), &:nth-child(4){
  margin-left: clamp(-25px, 10%, -50px);
}
`;

const StatIcon = styled.div`
  width: clamp(40px, 10%, 50px);
  height: clamp(40px, 10%, 50px);
  border-radius: 100%;
  border: 2px solid #DA604E;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: clamp(1rem, 2vw, 2rem);
  padding: 8px;
`;

const StatDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StatLabel = styled.div`
  color: #337179;
  font-size: clamp(0.8rem, 2vw, 1.1rem);
`;

const StatValue = styled.div`
  font-weight: bold;
  font-size: clamp(0.8rem, 2vw, 1.1rem);
  color: #254A5D;
  
`;
