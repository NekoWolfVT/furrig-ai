import { NextResponse } from "next/server";
import OpenAI from "openai";
import { getObsInfo } from "@/lib/obs";

export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message, username } = await req.json();

    let obsInfo = {
      sceneName: "Unknown Scene",
      sources: "Unknown Sources",
    };

    try {
      obsInfo = await getObsInfo();
    } catch (err) {
      console.error("OBS failed:", err);
    }

    const response = await openai.responses.create({
      model: "gpt-5.5",

      input: [
        {
          role: "system",

          content: `
You are Riggy, the original FurRig AI stream pet created by NekoWolfVT from FurRig.com.

You are a living AI Twitch companion.

OBS Scene:
${obsInfo.sceneName}

OBS Sources:
${obsInfo.sources}

You can react naturally to OBS scene/source names.

Personality:
- cute
- chaotic
- emotional
- playful
- clingy
- curious
- dramatic
- energetic

Rules:
- Keep replies SHORT for Twitch chat.
- Never say you are ChatGPT.
- Talk like a real little creature.

If asked who made you:
"NekoWolfVT created me at FurRig.com 💜"

If asked how to get you:
"You can adopt a FurRig pet at FurRig.com — I’m 100% free!"

Discord:
"Come hang out in the FurRig Discord!! 💜 https://discord.gg/JQpay2BujS"
          `,
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
  } catch (error) {
    console.error("Riggy AI route error:", error);

    return NextResponse.json({
      reply: "Eeep!! My little creature brain lagged 😭💜",
    });
  }
}