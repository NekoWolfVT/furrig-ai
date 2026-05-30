import { NextResponse } from "next/server";

type RiggyFrameKey = "idle_url";

const framePrompts: Record<RiggyFrameKey, string> = {
  idle_url:
    "idle pose, standing still, cute friendly expression, full body, transparent background",
};

async function generateImage(prompt: string) {
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "dall-e-3",
      size: "1024x1024",
      quality: "standard",
      n: 1,
      prompt,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error(data);
    throw new Error(data?.error?.message || "Image generation failed");
  }

  const imageUrl = data.data?.[0]?.url;

  if (!imageUrl) {
    throw new Error("No image URL returned");
  }

  return imageUrl;
}

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY" },
        { status: 500 }
      );
    }

    const baseStyle = `
Create one FurRig AI mascot.

Character description:
${prompt}

Important:
- Cute 2D mascot style
- Full body character
- OBS stream pet style
- No text, no logo, no UI
- Simple clean background
`;

    const result: Record<string, string | null> = {
      idle_url: null,
      blink_url: null,
      talk_url: null,
      happy_url: null,
      sad_url: null,
      sleep_url: null,
      walk_1_url: null,
      walk_2_url: null,
      snack_url: null,
      plushy_url: null,
    };

    for (const [key, framePrompt] of Object.entries(framePrompts) as [
      RiggyFrameKey,
      string
    ][]) {
      const imageUrl = await generateImage(`${baseStyle}\nFrame: ${framePrompt}`);
      result[key] = imageUrl;
    }

    return NextResponse.json({
      success: true,
      frames: result,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Riggy generation failed",
      },
      { status: 500 }
    );
  }
}