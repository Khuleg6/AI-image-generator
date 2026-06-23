import { NotepadText } from "lucide-react";
import React from "react";
interface summaryProps {
  description: string;
  title: string;
}

export const Summary = ({ description, title }: summaryProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <NotepadText />
        <span className="text-xl leading-6 font-semibold">{title}</span>
      </div>

      <div>
        <span className="text-[#71717A] text-[14px] leading-6">
          {description}
        </span>
      </div>
    </div>
  );
};
