import { NextResponse } from "next/server";

// Cloudflare Workers AI дээрх FLUX моделиуд (өдөр бүр үнэгүй лимиттэй).
// Үндсэн модель Cloudflare талд ажиллахгүй (5xx) бол нөөц модель руу шилжинэ.
const PRIMARY_MODEL = "@cf/black-forest-labs/flux-1-schnell";
const FALLBACK_MODEL = "@cf/black-forest-labs/flux-2-klein-4b";

async function runModel(model: string, prompt: string, accountId: string, apiToken: string) {
  // flux-2 моделиуд multipart/form-data хүлээж авдаг, flux-1 нь JSON
  const isFlux2 = model.includes("flux-2");
  let body: BodyInit;
  const headers: Record<string, string> = { Authorization: `Bearer ${apiToken}` };

  if (isFlux2) {
    const form = new FormData();
    form.append("prompt", prompt);
    form.append("width", "1024");
    form.append("height", "1024");
    body = form;
  } else {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify({ prompt, steps: 4 });
  }

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`,
    { method: "POST", headers, body },
  );
  const data = await response.json();
  return { response, data };
}

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

    let { response, data } = await runModel(PRIMARY_MODEL, prompt, accountId, apiToken);

    if (response.status >= 500) {
      console.warn(`${PRIMARY_MODEL} алдаа (${response.status}), ${FALLBACK_MODEL} руу шилжлээ:`, data.errors);
      ({ response, data } = await runModel(FALLBACK_MODEL, prompt, accountId, apiToken));
    }

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
        (response.status >= 500
          ? "Cloudflare-ийн зураг үүсгэх үйлчилгээ түр ажиллахгүй байна. Хэсэг хугацааны дараа дахин оролдоно уу."
          : data.errors?.[0]?.message) ??
        `Зураг үүсгэхэд алдаа гарлаа (status: ${response.status}).`;

      return NextResponse.json({ error: message }, { status: response.status || 500 });
    }

    // Моделиуд зургийг base64 JPEG хэлбэрээр буцаадаг
    const buffer = Buffer.from(data.result.image, "base64");

    return new NextResponse(buffer, {
      headers: { "Content-Type": "image/jpeg" },
    });
  } catch (error: any) {
    console.error("Generate image error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
