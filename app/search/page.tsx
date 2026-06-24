"use client";
import { Image as ImageIcon, NotepadText } from "lucide-react";
import { Header } from "./components/header";
import { Tab } from "./components/tab";
import { Input } from "./components/input";
import { Summary } from "./components/summary";
import { useState } from "react";
import { Textarea } from "./components/text-area";
import { ChatAssistant } from "./components/chat-assistant";

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [imageTitle, setImageTitle] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTabs, setActiveTabs] = useState("Image analysis");
  const [identifiedIngredients, setIdentifiedIngredients] =
    useState<string>("");
  const [analysisResult, setAnalysisResult] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const tabs = ["Image analysis", "Ingredient recognition", "Image Creator"];
  const handleAnalyzeImage = async (file: File) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch("/api/analyze-image", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    setAnalysisResult(data.summary);
    setIsLoading(false);
  };

  const handleGenerateImage = async (prompt: string) => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setImageTitle(prompt);
    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Зураг үүсгэхэд алдаа гарлаа.");
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      setImageUrl(objectUrl);
    } catch (error: any) {
      console.error("Зураг үүсгэхэд алдаа гарлаа:", error);

      alert(`Алдаа: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  const handleExtractIngredients = async (description: string) => {
    const response = await fetch("/api/extract-ingredients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: description }),
    });

    const data = await response.json();
    // Эндээс ирсэн data.ingredients-ийг дэлгэцэндээ харуулна
    setIdentifiedIngredients(data.ingredients);
  };

  const tabContents: Record<string, any> = {
    "Ingredient recognition": {
      title: "Ingredient recognition",
      description: "Describe the food, and AI will detect the ingredients.",
      placeholder: "Орц тодорхойлох",
      isLoading: isLoading,
      destitle:
        "Here’s a quick summary of the ingredients you used for your Spaghetti Carbonara",
      onGenerate: handleExtractIngredients, // Эндээ холболоо!
    },
    "Image Creator": {
      title: "Food image creator",
      description: "What food image do you want? Describe it briefly.",
      placeholder: "Хоолны тайлбар",
      isLoading: isLoading,
      imageUrl: imageUrl,
      imageTitle: imageTitle,
      onGenerate: handleGenerateImage,
    },
  };

  const summaryContents: Record<string, any> = {
    "Ingredient recognition": {
      title: "Identified Ingredients",
      description:
        identifiedIngredients ||
        "First, enter your text to recognize ingredients.",
      icon: <NotepadText />,
    },
    "Image analysis": {
      title: "Here is the summary",
      description:
        analysisResult || "First, enter your image to recognize ingredients.",
      icon: <NotepadText />,
    },
    "Image Creator": {
      title: "Result",
      imageUrl: imageUrl,
      imageTitle: imageTitle,
      isLoading: isLoading,
      icon: <ImageIcon />,
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
          {activeTabs === "Image analysis" && (
            <Input
              onFileSelect={setSelectedFile}
              onGenerate={() => handleAnalyzeImage(selectedFile!)}
              isLoading={isLoading}
            />
          )}
          {(activeTabs === "Ingredient recognition" ||
            activeTabs === "Image Creator") && (
            <Textarea {...tabContents[activeTabs]} />
          )}
          {(activeTabs === "Ingredient recognition" ||
            activeTabs === "Image Creator" ||
            activeTabs === "Image analysis") && (
            <Summary {...summaryContents[activeTabs]} />
          )}
        </div>
      </div>
      <ChatAssistant />
    </div>
  );
}
