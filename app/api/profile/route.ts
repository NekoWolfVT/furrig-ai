import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import { OWNER_EMAILS } from "@/lib/admin";

export async function GET() {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const email = user.emailAddresses?.[0]?.emailAddress || "";
  const isOwner = OWNER_EMAILS.includes(email);

  const profile = {
    username: user.username || user.firstName || "Creator",
    bio: "VTuber creator, gamer, and FurRig AI user.",
    membership: isOwner ? "Max Founder" : "Free",
    role: isOwner ? "Owner" : "Creator",
  };

  return NextResponse.json(profile);
}