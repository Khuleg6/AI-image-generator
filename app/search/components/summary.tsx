import { NotepadText } from "lucide-react";
import React from "react";

export const Summary = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <NotepadText />
        <span className="text-xl leading-6 font-semibold">
          Here is the summary
        </span>
      </div>

      <div>
        <span className="text-[#71717A] text-[14px] leading-6">
          First, enter your image to recognize an ingredients.
        </span>
      </div>
    </div>
  );
};
