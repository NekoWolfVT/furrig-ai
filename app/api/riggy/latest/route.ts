import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  let query = supabase
    .from("riggies")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1);

  if (userId) {
    query = query.eq("user_id", userId);
  }

  const { data, error } = await query.single();

  if (error) {
    return NextResponse.json({
      riggy: null,
      error: error.message,
    });
  }

  return NextResponse.json({
    riggy: data,
  });
}