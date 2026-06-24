"use client";

import { Send, X, MessageSquare } from "lucide-react";
import React, { useState } from "react";

export const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const messages = [
    { id: 1, sender: "bot", text: "How can I help you today?" },
    {
      id: 2,
      sender: "user",
      text: "Can you describe me detailed delicious pasta carbonara?",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 font-sans">
      {isOpen && (
        <div className="w-[380px] h-[500px] bg-white rounded-2xl border border-gray-100 shadow-2xl flex flex-col overflow-hidden transition-all duration-300">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-white">
            <span className="font-semibold text-gray-900 text-[16px]">
              Chat assistant
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-4 bg-white">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[80%] px-4 py-3 rounded-2xl text-[14px] leading-5 ${
                  msg.sender === "bot"
                    ? "bg-[#2D2E32] text-white self-start rounded-tl-sm"
                    : "bg-[#F4F4F5] text-gray-900 self-end rounded-tr-sm"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-100 flex items-center gap-2 bg-white">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 h-11 px-4 border border-gray-200 rounded-xl bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
            />
            <button className="size-11 rounded-full bg-[#18181B] text-white flex items-center justify-center hover:bg-gray-800 transition-colors shrink-0">
              <Send className="size-4 ml-0.5" />{" "}
            </button>
          </div>
        </div>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="size-14 rounded-full bg-[#18181B] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        >
          <MessageSquare className="size-6" />
        </button>
      )}
    </div>
  );
};
