import { NextResponse } from "next/server";

let latestEvent = {
  message: "H-Hello... where am I?",
  mood: "idle",
  time: Date.now(),
};

export async function GET() {
  return NextResponse.json(latestEvent);
}

export async function POST(req: Request) {
  const body = await req.json();

  latestEvent = {
    message: body.message || "",
    mood: body.mood || "talk",
    time: Date.now(),
  };

  return NextResponse.json({
    success: true,
  });
}