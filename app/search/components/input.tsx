import { RotateCw, Sparkles } from "lucide-react";
import React from "react";
interface InputProps {
  onFileSelect: (file: File) => void;
  onGenerate: () => Promise<void>;
  isLoading: boolean;
}
export const Input = ({ onFileSelect, onGenerate, isLoading }: InputProps) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3 items-center">
        <Sparkles />
        <span className="text-xl font-semibold leading-7">Image analysis</span>
        <div className="ml-auto border border-[#E4E4E7] rounded-md px-4 py-2">
          <RotateCw className="opacity-30 size-5" />
        </div>
      </div>
      <span className="text-[#71717A] text-[14px] leading-5">
        Upload a food photo, and AI will detect the ingredients.
      </span>
      <div className="flex flex-col gap-2">
        <input
          className="hidden "
          accept="image/png, image/jpeg"
          type="file"
          id="file-upload"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              onFileSelect(e.target.files[0]);
            }
          }}
        />
        {/* ... */}
        <label
          className="flex w-full cursor-pointer items-center gap-2 rounded-lg bg-gray-50 px-4 py-3 border border-gray-200 transition-colors hover:bg-gray-100"
          htmlFor="file-upload"
        >
          <span className="font-medium text-gray-900 text-sm">Choose File</span>
          <span className=" text-gray-400 text-sm">JPEG, PNG</span>
        </label>
        <button
          onClick={onGenerate}
          disabled={isLoading}
          className="h-10 px-4 py-2 gap-2 bg-[#18181B] rounded-md flex ml-auto items-center hover:opacity-90 transition-opacity"
        >
          <span className="text-[14px] font-medium text-white">
            {isLoading ? "Analyzing..." : "Generate"}
          </span>
        </button>
      </div>
    </div>
  );
};
