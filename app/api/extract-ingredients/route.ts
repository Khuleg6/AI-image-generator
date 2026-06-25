import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// .env файлд GEMINI_API_KEY байхгүй бол шууд анхааруулга өгөх
if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY орчны хувьсагч тохируулагдаагүй байна.");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text } = body;

    if (!text) {
      return NextResponse.json(
        { error: "Текст хоосон байна." },
        { status: 400 },
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Дараах хоолны тайлбараас орц найрлагуудыг ялган авч, зөвхөн цэгтэй жагсаалт (bullet points) хэлбэрээр хариулна уу. Зөвхөн орцнуудыг л жагсааж бичнэ үү: "${text}"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const ingredients = response.text();

    return NextResponse.json({ ingredients });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // Алдааг илүү тодорхой буцаах
    return NextResponse.json(
      { error: error.message || "Орц найрлагыг танихад алдаа гарлаа." },
      { status: 500 },
    );
  }
}
