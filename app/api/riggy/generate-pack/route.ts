import { NextResponse } from "next/server";

type RiggyFrameKey =
  | "idle_url"
  | "talk_url"
  | "walk_1_url"
  | "walk_2_url";

const framePrompts: Record<RiggyFrameKey, string> = {
  idle_url:
    "idle pose, standing still, cute friendly expression, full body, transparent background",
  talk_url:
    "same character, mouth open talking, cheerful expression, full body, transparent background",
  walk_1_url:
    "same character walking pose frame 1, one foot forward, full body, transparent background",
  walk_2_url:
    "same character walking pose frame 2, opposite foot forward, full body, transparent background",
};

async function generateImage(prompt: string) {
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-image-1",
      size: "1024x1024",
      prompt,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error(data);
    throw new Error(data?.error?.message || "Image generation failed");
  }

  const imageBase64 = data.data?.[0]?.b64_json;

  if (!imageBase64) {
    throw new Error("No image returned");
  }

  return `data:image/png;base64,${imageBase64}`;
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
Create a matching 4-frame animation pack for one FurRig AI mascot.

Character description:
${prompt}

Important:
- Keep the SAME character design in every frame.
- Same colors, same species, same face, same body shape.
- Cute 2D mascot style.
- Full body character.
- Transparent background or plain white background.
- No text, no logo, no UI.
- OBS stream pet style.
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
            : "Riggy animation pack generation failed",
      },
      { status: 500 }
    );
  }
}