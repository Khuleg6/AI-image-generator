"use client";

import { Send, X, MessageSquare } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

// Message-ийн төрлийг тодорхойлох interface
interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

export const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState(""); // Өмнө нь "message" байсан, "input" болгосон
  const [isLoading, setIsLoading] = useState(false); // API хүсэлт илгээж байх үед true болно

  // Өмнө нь messages хатуу утгатай (static) байсан, одоо useState-р удирдана
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: "assistant", content: "How can I help you today?" },
  ]);

  // Мессеж илгээх үндсэн функц
  const handleSend = async () => {
    if (!input.trim() || isLoading) return; // Хоосон эсвэл loading үед ажиллахгүй

    // Хэрэглэгчийн мессежийг үүсгэнэ
    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: input,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages); // Дэлгэцэнд нэмнэ
    setInput(""); // Input-ийг цэвэрлэнэ
    setIsLoading(true); // Loading эхэлнэ

    try {
      // /api/chat route руу хүсэлт илгээнэ
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }), // Бүх түүхийг илгээнэ
      });

      const data = await response.json();

      // AI-ийн хариу мессежийг үүсгэнэ
      const botMessage: Message = {
        id: updatedMessages.length + 1,
        role: "assistant",
        content: data.message || "Алдаа гарлаа.",
      };

      setMessages((prev) => [...prev, botMessage]); // Дэлгэцэнд нэмнэ
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false); // Loading дуусна
    }
  };
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
                // role-р bot/user мессежийг ялгана (өмнө нь sender байсан)
                className={`max-w-[80%] px-4 py-3 rounded-2xl text-[14px] leading-5 ${
                  msg.role === "assistant"
                    ? "bg-[#2D2E32] text-white self-start rounded-tl-sm"
                    : "bg-[#F4F4F5] text-gray-900 self-end rounded-tr-sm"
                }`}
              >
                {msg.content}
              </div>
            ))}
            {/* Loading үед "..." харуулна */}
            {isLoading && (
              <div className="max-w-[80%] px-4 py-3 rounded-2xl text-[14px] bg-[#2D2E32] text-white self-start rounded-tl-sm">
                ...
              </div>
            )}
          </div>

          <div
            ref={bottomRef}
            className="p-4 border-t border-gray-100 flex items-center gap-2 bg-white"
          >
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()} // Enter дарахад илгээнэ
              className="flex-1 h-11 px-4 border border-gray-200 rounded-xl bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={isLoading} // Loading үед товч идэвхгүй болно
              className="size-11 rounded-full bg-[#18181B] text-white flex items-center justify-center hover:bg-gray-800 transition-colors shrink-0 disabled:opacity-50"
            >
              <Send className="size-4 ml-0.5" />
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
