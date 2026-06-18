import { RotateCw, Sparkles } from "lucide-react";
import React from "react";

export const Input = () => {
  return (
    <div>
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
          className="hidden"
          accept="image/png, image/jpeg"
          type="file"
          id="file-upload"
        />
        <label
          className="flex w-full cursor-pointer items-center gap-2 rounded-lg bg-gray-50 px-4 py-3 border border-gray-200 transition-colors hover:bg-gray-100"
          htmlFor="file-upload"
        >
          <span className="font-medium text-gray-900 text-sm">Choose File</span>
          <span className=" text-gray-400 text-sm">JPEG, PNG</span>
        </label>
        <button className="h-10 px-4 py-2 gap-2 bg-[#8B8B8D] rounded-md flex ml-auto items-center ">
          <span className="text-[14px] font-medium leading-5 text-[#FAFAFA]">
            Generate
          </span>
        </button>
      </div>
    </div>
  );
};
