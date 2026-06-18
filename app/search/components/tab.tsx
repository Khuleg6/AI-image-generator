"use client";
import React, { useState } from "react";

export const Tab = () => {
  const tabs = ["Image analysis", "Ingredient recognition", "Image Creator"];
  const [activeTabs, setActiveTabs] = useState("Image analysis");
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
