"use client";

import { useEffect, useState } from "react";

type RiggyMood = "idle" | "talk" | "happy" | "sad" | "sleep";

type RiggyEvent = {
  mood?: RiggyMood;
  message?: string;
  timestamp?: number;
};

export default function RiggyOBSOverlay() {
  const [mood, setMood] = useState<RiggyMood>("idle");
  const [message, setMessage] = useState("Hi! I’m Riggy 💜");
  const [lastTimestamp, setLastTimestamp] = useState(0);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/riggy-event", {
          cache: "no-store",
        });

        const data: RiggyEvent = await res.json();

        if (data.timestamp && data.timestamp !== lastTimestamp) {
          setLastTimestamp(data.timestamp);
          setMessage(data.message || "Riggy is here!");
          setMood(data.mood || "talk");

          setTimeout(() => {
            setMood("idle");
          }, 6000);
        }
      } catch {
        // Keeps OBS alive even if API fails
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [lastTimestamp]);

  const riggyFace =
    mood === "happy"
      ? "🐰✨"
      : mood === "sad"
      ? "🐰💧"
      : mood === "sleep"
      ? "🐰💤"
      : mood === "talk"
      ? "🐰💬"
      : "🐰";

  return (
    <main className="h-screen w-screen overflow-hidden bg-transparent">
      <div className="fixed bottom-10 right-10 flex flex-col items-center">
        <div className="mb-4 max-w-[380px] rounded-3xl border border-pink-400 bg-black/80 px-6 py-4 text-center text-xl font-bold text-white shadow-[0_0_35px_#ec4899]">
          {message}
        </div>

        <div
          className={`flex h-52 w-52 items-center justify-center rounded-full border-4 border-pink-400 bg-gradient-to-br from-pink-500 to-purple-800 text-8xl shadow-[0_0_60px_#ec4899] ${
            mood === "talk" ? "animate-bounce" : ""
          }`}
        >
          {riggyFace}
        </div>

        <div className="mt-3 rounded-full bg-black/80 px-5 py-2 text-sm font-bold text-pink-200">
          Riggy AI Helper
        </div>
      </div>
    </main>
  );
}