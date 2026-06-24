"use client";
import { RotateCw, Sparkles } from "lucide-react";
import React, { useState } from "react";

interface TextareaProps {
  title: string;
  description: string;
  placeholder: string;
  isLoading: boolean;
  onGenerate: (prompt: string) => void;
}

export const Textarea = ({
  title,
  description,
  placeholder,
  isLoading,
  onGenerate,
}: TextareaProps) => {
  const [inputText, setInputText] = useState("");

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3 items-center">
        <Sparkles />
        <span className="text-xl font-semibold leading-7">{title}</span>
        <div className="ml-auto border border-[#E4E4E7] rounded-md px-4 py-2 cursor-pointer hover:bg-gray-50">
          <RotateCw className="opacity-30 size-5" />
        </div>
      </div>
      <span className="text-[#71717A] text-[14px] leading-5">
        {description}
      </span>
      <div className="flex flex-col gap-2">
        <textarea
          placeholder={placeholder}
          rows={5}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={isLoading}
          className="w-full min-h-[160px] max-h-[350px] rounded-xl bg-gray-50 px-4 py-3 border border-gray-200 
                   transition-colors hover:bg-gray-100 focus:bg-white focus:border-gray-400 focus:outline-none 
                   text-sm text-gray-900 resize-none [field-sizing:content]"
        />

        <button
          onClick={() => onGenerate(inputText)}
          disabled={isLoading || !inputText.trim()}
          className="h-10 px-4 py-2 gap-2 bg-[#8B8B8D] rounded-md flex ml-auto items-center disabled:opacity-50 hover:bg-gray-700 transition-colors"
        >
          <span className="text-[14px] font-medium leading-5 text-[#FAFAFA]">
            {isLoading ? "Generating..." : "Generate"}
          </span>
        </button>
      </div>
    </div>
  );
};
