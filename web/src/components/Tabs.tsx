"use client";

import { useState } from "react";

type TabItem = {
  label: string;
  id: number;
};

type TabsProps = {
  tabItems: Array<TabItem>;
  onChange: Function;
};

export default function Tabs({ tabItems, onChange }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  const handleClickTabItem = (tabItemId: number) => {
    if (tabItemId !== activeTab) {
      setActiveTab(tabItemId);
      onChange(tabItemId);
    }
  };
  return (
    <div>
      <div className="flex flex-row justify-around border-b-[1px] border-black">
        {tabItems.map((tabItem, index) => {
          return (
            <button
              className={`3xl:text-2xl 2xl:text-xl flex flex-col transition-all duration-300 after:content-[''] after:w-0 after:h-[3px] after:translate-y-[1.5px] after:transition-all after:duration-300${
                activeTab === tabItem.id || (!activeTab && !index)
                  ? " text-deep-lilac after:!w-full after:bg-deep-lilac"
                  : " text-black hover:after:w-full hover:text-lenurple hover:after:bg-lenurple"
              }`}
              key={tabItem.id}
              type="button"
              title={tabItem.label}
              onClick={() => handleClickTabItem(tabItem.id)}
            >
              <span className="pb-2">{tabItem.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
