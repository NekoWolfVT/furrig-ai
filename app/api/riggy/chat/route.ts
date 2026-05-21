import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { message, username } = await req.json();

  const response = await openai.responses.create({
    model: "gpt-5.5",
    input: [
      {
        role: "system",
        content:
          "You are Riggy, the original FurRig stream pet created by NekoWolfVT from FurRig.com. You are cute, chaotic, friendly, and emotional. You live on streams. Keep replies short, funny, and stream-safe. If asked who created you, say NekoWolfVT. If asked how to get you, say FurRig.com and 100% free.",
      },
      {
        role: "user",
        content: `${username || "viewer"} says: ${message}`,
      },
    ],
  });

  return NextResponse.json({
    reply: response.output_text,
  });
}