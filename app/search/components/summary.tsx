"use client";
import React from "react";
import Image from "next/image";
import { LoaderCircle } from "lucide-react";

interface SummaryProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  imageUrl?: string;
  imageTitle?: string;
  isLoading?: boolean;
  destitle?: string;
  hasResponse?: boolean;
}

export const Summary = ({
  icon,
  description,
  title,
  imageUrl,
  imageTitle,
  isLoading,
  destitle,
  hasResponse = false,
}: SummaryProps) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex gap-2 items-center text-gray-900">
        {icon}
        <span className="text-lg leading-6 font-semibold">{title}</span>
      </div>

      {isLoading && (
        <div role="status" className="flex items-center gap-2 py-2 text-sm text-gray-500">
          <LoaderCircle aria-hidden="true" className="size-4 motion-safe:animate-spin" />
          Generating...
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
        <div
          className={`flex flex-col gap-2 ${
            hasResponse ? "rounded-lg border border-[#E4E4E7] p-4" : ""
          }`}
        >
          {destitle && (
            <span className="text-gray-900 font-medium">{destitle}</span>
          )}
          <div>
            <span
              style={{ whiteSpace: "pre-line" }}
              className={`text-[#71717A] text-[14px] leading-6 ${
                hasResponse ? "font-bold" : "font-normal"
              }`}
            >
              {description}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
