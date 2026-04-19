"use client";
import React, { useState } from "react";

interface Tab {
  id: string;
  label: string;
  active?: boolean;
}

interface NavigationTabsProps {
  tabs?: Tab[];
  onTabChange?: (tabId: string) => void;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  tabs = [
    { id: "menu", label: "菜單" },
    { id: "edit-menu", label: "修改菜單" },
    { id: "order-management", label: "訂單管理", active: true },
  ],
  onTabChange,
}) => {
  const [activeTab, setActiveTab] = useState(
    tabs.find((tab) => tab.active)?.id || tabs[0]?.id,
  );

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <nav className="px-6 pt-5 pb-4">
      <div className="flex gap-3 items-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`pb-3 text-base cursor-pointer font-bold ${
              activeTab === tab.id
                ? "text-black border-b-2 border-green-700"
                : "text-neutral-400"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
};
