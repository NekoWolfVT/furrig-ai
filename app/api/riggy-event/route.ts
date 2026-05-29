import { NextResponse } from "next/server";

type RiggyMood = "idle" | "talk" | "happy" | "sad" | "sleep";

type RiggyEvent = {
  mood: RiggyMood;
  message: string;
  timestamp: number;
};

let latestEvent: RiggyEvent = {
  mood: "idle",
  message: "Hi! I’m Riggy 💜",
  timestamp: Date.now(),
};

export async function GET() {
  return NextResponse.json(latestEvent);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    latestEvent = {
      mood: body.mood || "talk",
      message: body.message || "Riggy is here!",
      timestamp: Date.now(),
    };

    return NextResponse.json({
      success: true,
      event: latestEvent,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid Riggy event",
      },
      { status: 400 }
    );
  }
}