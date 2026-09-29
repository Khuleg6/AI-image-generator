import { Image as ImageIcon, LoaderCircle, RotateCw, Sparkles, X } from "lucide-react";
import React, { useRef } from "react";
interface InputProps {
  selectedFile: File | null;
  onFileSelect: (file: File | null) => void;
  onGenerate: () => Promise<void>;
  isLoading: boolean;
}
export const Input = ({ selectedFile, onFileSelect, onGenerate, isLoading }: InputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

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
          ref={fileInputRef}
          className="hidden"
          accept="image/png, image/jpeg"
          type="file"
          id="file-upload"
          disabled={isLoading}
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              onFileSelect(e.target.files[0]);
            }
            e.target.value = "";
          }}
        />
        <div className="flex min-w-0 items-center rounded-lg border border-gray-200 bg-gray-50">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            aria-label={selectedFile ? `Change image: ${selectedFile.name}` : "Choose image"}
            className="flex min-w-0 flex-1 items-center gap-2 rounded-lg px-4 py-3 text-left text-sm transition-colors hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:cursor-not-allowed"
          >
            {selectedFile ? (
              <>
                <ImageIcon aria-hidden="true" className="size-4 shrink-0 text-gray-400" />
                <span className="truncate font-medium text-gray-900" title={selectedFile.name}>
                  {selectedFile.name}
                </span>
              </>
            ) : (
              <>
                <span className="font-medium text-gray-900">Choose File</span>
                <span className="text-gray-400">JPEG, PNG</span>
              </>
            )}
          </button>
          {selectedFile && (
            <button
              type="button"
              onClick={() => onFileSelect(null)}
              disabled={isLoading}
              aria-label="Remove selected image"
              className="flex size-11 shrink-0 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          )}
        </div>
        <button
          onClick={onGenerate}
          disabled={isLoading || !selectedFile}
          aria-busy={isLoading}
          className="h-10 px-4 py-2 gap-2 bg-[#18181B] rounded-md flex ml-auto items-center hover:opacity-90 transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading && (
            <LoaderCircle aria-hidden="true" className="size-4 text-white motion-safe:animate-spin" />
          )}
          <span className="text-[14px] font-medium text-white">
            {isLoading ? "Analyzing..." : "Generate"}
          </span>
        </button>
      </div>
    </div>
  );
};
