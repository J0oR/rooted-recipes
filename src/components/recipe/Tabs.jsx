import { useState } from "react";
import style from "./tabs.module.scss";

function Tabs({ selectedTab, setSelectedTab }) {
  const tabs = [
    { key: "ingredients", label: "Ingredients" },
    { key: "recipe", label: "Recipe" },
  ];

  return (
    <div className={style.tabs}>
      {tabs.map(({ key, label }) => (
        <div 
        key={key} 
        className={`${style.tab} ${selectedTab === key ? style.active : ""}`} 
        onClick={() => setSelectedTab(key)}>
          {label}
        </div>
      ))}
    </div>
  );
}

export default Tabs;
