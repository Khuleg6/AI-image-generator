// app/api/analyze-image/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File | null;

    if (!(image instanceof File)) {
      return NextResponse.json({ error: "Зураг олдсонгүй" }, { status: 400 });
    }

    if (!["image/png", "image/jpeg"].includes(image.type)) {
      return NextResponse.json(
        { error: "JPEG эсвэл PNG зураг оруулна уу." },
        { status: 400 },
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey?.trim()) {
      return NextResponse.json(
        { error: "Зураг шинжлэх үйлчилгээ тохируулагдаагүй байна. GEMINI_API_KEY нэмнэ үү." },
        { status: 503 },
      );
    }
    const genAI = new GoogleGenerativeAI(apiKey);

    const bytes = await image.arrayBuffer();
    const base64Image = Buffer.from(bytes).toString("base64");

    const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash-lite" });

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
  } catch (error: unknown) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Серверт алдаа гарлаа" },
      { status: 500 },
    );
  }
}
