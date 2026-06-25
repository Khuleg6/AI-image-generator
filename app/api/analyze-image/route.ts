// app/api/analyze-image/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File | null;

    if (!image) {
      return NextResponse.json({ error: "Зураг олдсонгүй" }, { status: 400 });
    }

    const bytes = await image.arrayBuffer();
    const base64Image = Buffer.from(bytes).toString("base64");

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent([
      "Энэ зураг дээрх хоол эсвэл орц найрлагыг шинжилж, цэгтэй жагсаалтаар (bullet points) тодорхойлно уу.",
      {
        inlineData: {
          data: base64Image,
          mimeType: image.type,
        },
      },
    ]);

    const summary = result.response.text();
    return NextResponse.json({ summary });
  } catch (error: any) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: error.message || "Серверт алдаа гарлаа" },
      { status: 500 },
    );
  }
}
