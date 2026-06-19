"use client";
import React, { useState } from "react";
interface TabProps {
  activeTabs: string;
  setActiveTabs: (tab: string) => void;
  tabs: string[];
}

export const Tab = ({ activeTabs, setActiveTabs, tabs }: TabProps) => {
  return (
    <div className="inline-flex items-center gap-1 rounded-xl bg-[#f4f4f5] p-1.5 text-sm font-medium text-gray-500">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTabs(tab)}
          data-active={activeTabs === tab}
          className=" rounded-[6px]  py-1.5 px-3 transition-all duration-200 data-[active=true]:bg-white data-[active=true]:text-black data-[active=true]:shadow-sm"
        >
          {tab}
        </button>
      ))}
    </div>
  );
};
