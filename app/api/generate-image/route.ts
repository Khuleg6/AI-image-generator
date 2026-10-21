import { NextResponse } from "next/server";

// Cloudflare Workers AI дээрх FLUX.1-schnell модель (өдөр бүр үнэгүй лимиттэй)
const MODEL = "@cf/black-forest-labs/flux-1-schnell";

export async function POST(request: Request) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;

  if (!accountId || !apiToken) {
    return NextResponse.json(
      { error: "CLOUDFLARE_ACCOUNT_ID эсвэл CLOUDFLARE_API_TOKEN тохируулагдаагүй байна." },
      { status: 500 },
    );
  }

  try {
    const { prompt } = await request.json();

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${MODEL}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, steps: 4 }),
      },
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      // Cloudflare-ийн жинхэнэ алдааг логлох
      console.error("Cloudflare AI Error:", response.status, data.errors);

      const messages: Record<number, string> = {
        401: "CLOUDFLARE_API_TOKEN буруу байна.",
        403: "Cloudflare token-д Workers AI ашиглах эрх алга.",
        429: "Өнөөдрийн үнэгүй лимит дууссан эсвэл хэт олон хүсэлт илгээлээ. Дараа дахин оролдоно уу.",
      };
      const message =
        messages[response.status] ??
        data.errors?.[0]?.message ??
        `Зураг үүсгэхэд алдаа гарлаа (status: ${response.status}).`;

      return NextResponse.json({ error: message }, { status: response.status || 500 });
    }

    // Модель зургийг base64 JPEG хэлбэрээр буцаадаг
    const buffer = Buffer.from(data.result.image, "base64");

    return new NextResponse(buffer, {
      headers: { "Content-Type": "image/jpeg" },
    });
  } catch (error: any) {
    console.error("Generate image error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
