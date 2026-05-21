import { NextResponse } from "next/server";

let latestEvent = {
  type: "idle",
  message: "H-Hello... where am I?",
  time: Date.now(),
};

export async function POST(req: Request) {
  const body = await req.json();

  latestEvent = {
    type: body.type || "idle",
    message: body.message || "",
    time: Date.now(),
  };

  return NextResponse.json({ success: true });
}

export async function GET() {
  return NextResponse.json(latestEvent);
}