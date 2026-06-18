import { RotateCw, Sparkles } from "lucide-react";
import { Header } from "./components/header";
import { Tab } from "./components/tab";
import { Input } from "./components/input";
import { Summary } from "./components/summary";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="flex justify-center">
        <div className="w-[580px] flex flex-col gap-6 py-6">
          <div>
            <Tab />
          </div>
          <Input />
        </div>
        <div className="">
          <Summary />
        </div>
      </div>
    </div>
  );
}
