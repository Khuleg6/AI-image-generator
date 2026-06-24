"use client";
import React from "react";
import Image from "next/image";

interface SummaryProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  imageUrl?: string;
  imageTitle?: string;
  isLoading?: boolean;
  destitle?: string;
}

export const Summary = ({
  icon,
  description,
  title,
  imageUrl,
  imageTitle,
  isLoading,
  destitle,
}: SummaryProps) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex gap-2 items-center text-gray-900">
        {icon}
        <span className="text-lg leading-6 font-semibold">{title}</span>
      </div>

      {isLoading && (
        <div className="w-full max-w-[500px] aspect-square bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-sm text-gray-400 animate-pulse">
          AI is painting your food... 🎨
        </div>
      )}

      {imageUrl && !isLoading && (
        <div className="w-full p-4 border border-gray-200 rounded-xl bg-white flex flex-col gap-3 max-w-[500px]">
          <span className="text-sm font-medium text-gray-900">
            {imageTitle}
          </span>

          <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-gray-50">
            <Image
              src={imageUrl}
              alt={imageTitle || "Generated food"}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        </div>
      )}

      {!imageUrl && !isLoading && description && (
        <div className="flex flex-col gap-2 border p-4 rounded-lg border-[#E4E4E7]">
          <span className="text-gray-900 font-medium">{destitle}</span>
          <div>
            <span
              style={{ whiteSpace: "pre-line" }}
              className="text-[#71717A] font-bold text-[14px] leading-6 list-disc"
            >
              {description}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
