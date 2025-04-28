import { useState } from "react";
import styled from "styled-components";
import Ingredients from "./Ingredients";
import Instructions from "./Instructions";


export default function Tabs({ ingredients, steps, summary }) {
  const [selectedTab, setSelectedTab] = useState("ingredients");
  const tabs = [
    { key: "ingredients", label: "Ingredients" },
    { key: "recipe", label: "Recipe" }
  ];

  return (
    <InfoContainer>
      <TabsContainer>
        {tabs.map(({ key, label }) => (
          <Tab key={key} className={`${selectedTab === key ? "active" : ""}`} onClick={() => setSelectedTab(key)}>
            {label}
          </Tab>
        ))}
      </TabsContainer>
      <SectionContainer>
        {selectedTab === "ingredients" && <Ingredients ingredients={ingredients} />}
        {selectedTab === "recipe" && <Instructions steps={steps} />}
        
      </SectionContainer>
    </InfoContainer>
  );
}

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #ECF0F1;
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  margin: 20px;
  padding: 20px 40px;
  position: relative;
  width: 100%;
  border-radius: 25px;
  color: #337179;
  font-size: 1rem;
`;

const Tab = styled.div`
  padding: 5px;
  position: relative;

  &:hover {
    cursor: pointer;
  }

  &.active {
    font-weight: 600;
    color: #254a5d;

    &::after {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      width: 25px;
      height: 2px; /* or whatever thickness you want */
      background-color: #254a5d; /* or use a specific color */
    }
  }
`;

const SectionContainer = styled.div`
  width: 100%;
  margin-bottom: 100px;
  display: flex;
  justify-content: center;
`;
