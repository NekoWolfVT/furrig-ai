import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Missing prompt" },
        { status: 400 }
      );
    }

    const riggyPrompt = `
Create a cute animated AI companion mascot for FurRig AI.

User prompt:
${prompt}

Style:
- cute animated mascot
- VTuber companion
- clean character design
- full body
- transparent or simple background
- expressive face
- suitable for OBS stream pet
- high quality digital art
- no text
`;

    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt: riggyPrompt,
        size: "1024x1024",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      return NextResponse.json(
        { error: "Failed to generate Riggy image", details: data },
        { status: 500 }
      );
    }

    const imageBase64 = data.data?.[0]?.b64_json;

    if (!imageBase64) {
      return NextResponse.json(
        { error: "No image returned" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      imageUrl: `data:image/png;base64,${imageBase64}`,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Riggy generation failed" },
      { status: 500 }
    );
  }
}