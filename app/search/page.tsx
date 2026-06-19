"use client";
import { RotateCw, Sparkles } from "lucide-react";
import { Header } from "./components/header";
import { Tab } from "./components/tab";
import { Input } from "./components/input";
import { Summary } from "./components/summary";
import { act, useState } from "react";
import { Textarea } from "./components/text-area";
import { title } from "process";

export default function Home() {
  const [activeTabs, setActiveTabs] = useState("Image analysis");
  const tabs = ["Image analysis", "Ingredient recognition", "Image Creator"];
  const tabContents: Record<string, any> = {
    "Ingredient recognition": {
      title: "Ingredient recognition",
      description: "Describe the food, and AI will detect the ingredients.",
      placeholder: "Орц тодорхойлох",
    },
    "Image Creator": {
      title: "Food image creator",
      description: "What food image do you want? Describe it briefly.",
      placeholder: "Хоолны тайлбар",
    },
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center">
        <div className="w-[580px] flex flex-col gap-6 py-6">
          <Tab
            activeTabs={activeTabs}
            setActiveTabs={setActiveTabs}
            tabs={tabs}
          />
          {activeTabs === "Image analysis" && <Input />}
          {(activeTabs === "Ingredient recognition" ||
            activeTabs === "Image Creator") && (
            <Textarea {...tabContents[activeTabs]} />
          )}
          {(activeTabs === "Ingredient recognition" ||
            activeTabs === "Image Creator" ||
            activeTabs === "Image analysis") && <Summary />}
        </div>
      </div>
    </div>
  );
}
