import { useState } from "react";
import styled from "styled-components";

const TabsContainer = styled.div`
  display: flex;
  gap: 50px;
  margin: 20px;
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
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 15px;
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
