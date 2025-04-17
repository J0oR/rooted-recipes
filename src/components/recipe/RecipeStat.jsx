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
`;

const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  border: 1px solid #c1933f;
  color: #c1933f;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fef3db;
  font-size: 1.2rem;
`;

const StatDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
`;

const StatLabel = styled.div`
  color: #9b9b9b;
`;

const StatValue = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
`;
