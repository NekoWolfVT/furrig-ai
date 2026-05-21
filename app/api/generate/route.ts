import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt: body.prompt,
      size: "1024x1024",
    });

    const b64 = result.data?.[0]?.b64_json;

    return NextResponse.json({
      image: `data:image/png;base64,${b64}`,
    });
  } catch (error: any) {
    console.error("OPENAI ERROR:", error);

    return NextResponse.json(
      {
        error: error?.message || "Generation failed",
      },
      { status: 500 }
    );
  }
}