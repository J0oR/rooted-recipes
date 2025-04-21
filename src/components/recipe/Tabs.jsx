import { useState } from "react";
import styled from "styled-components";

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  margin: 20px;
  padding: 20px 40px;
  position: relative;
  width: 100%;
  top: -55px;
  background-color: #C3D1BC;
  width: fit-content;
  border-radius: 25px;
`;

const Tab = styled.div`
  padding: 5px;
  position: relative;

  &:hover {
    cursor: pointer;
  }

  &.active {
    font-weight: 600;
    

    &::after {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      width: 25px;
      height: 2px; /* or whatever thickness you want */
      background-color: #823939; /* or use a specific color */
    }
  }
`;

function Tabs({ selectedTab, setSelectedTab }) {
  const tabs = [
    { key: "ingredients", label: "Ingredients" },
    { key: "recipe", label: "Recipe" },
    { key: "summary", label: "Summary" },
  ];

  return (
    <TabsContainer>
      {tabs.map(({ key, label }) => (
        <Tab key={key} className={`${selectedTab === key ? "active" : ""}`} onClick={() => setSelectedTab(key)}>
          {label}
        </Tab>
      ))}
    </TabsContainer>
  );
}

export default Tabs;
