import { InferenceClient } from "@huggingface/inference";
import { NextResponse } from "next/server";

// .env.local доторх токенийг ашиглан client үүсгэнэ
// Зөвхөн токен гэсэн string-ийг дамжуулна
const client = new InferenceClient(process.env.HF_TOKEN!);

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    const imageBlob = await client.textToImage({
      model: "black-forest-labs/FLUX.1-schnell",
      inputs: prompt,
      parameters: { num_inference_steps: 5 },
    });

    // imageBlob-ыг Blob төрөл рүү албадан хөрвүүлэх (Type assertion)
    const blob = imageBlob as unknown as Blob;

    // Одоо arrayBuffer() ажиллах болно
    const buffer = Buffer.from(await blob.arrayBuffer());

    return new NextResponse(buffer, {
      headers: { "Content-Type": "image/jpeg" },
    });
  } catch (error: any) {
    console.error("SDK Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
