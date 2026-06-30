// app/api/chat/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction:
        "You are a helpful food assistant. Help users with recipes, ingredients, cooking tips, and food-related questions.",
    });

    // Эхний user мессежийн индексийг олно
    const firstUserIndex = messages.findIndex((m: any) => m.role === "user");

    // History заавал user-ээр эхэлсэн байх ёстой тул firstUserIndex-ээс авна
    const history = messages.slice(firstUserIndex, -1).map((msg: any) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({ history });

    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(lastMessage);
    const response = result.response.text();

    return NextResponse.json({ message: response });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: error.message || "Серверт алдаа гарлаа" },
      { status: 500 },
    );
  }
}
