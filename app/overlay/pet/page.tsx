"use client";

import { useEffect, useState } from "react";

const sprites: Record<string, string> = {
  idle: "/pets/riggy_idle.png",
  blink: "/pets/riggy_blink.png",
  happy: "/pets/riggy_happy.png",
  sad: "/pets/riggy_sad.png",
  talk: "/pets/riggy_talk.png",
  sleep: "/pets/riggy_sleep.png",
};

export default function PetOverlay() {
  const [type, setType] = useState("idle");
  const [message, setMessage] = useState("");
  const [lastTime, setLastTime] = useState(0);
  const [blinking, setBlinking] = useState(false);

  // =========================
  // Listen for Riggy events
  // =========================

  useEffect(() => {
    const poll = setInterval(async () => {
      try {
        const res = await fetch("/api/riggy-event");
        const data = await res.json();

        if (data.time !== lastTime) {
          setLastTime(data.time);

          setType(data.type || "idle");
          setMessage(data.message || "");

          // Return to idle after 5 sec
          setTimeout(() => {
            setType("idle");
            setMessage("");
          }, 5000);
        }
      } catch (err) {
        console.error(err);
      }
    }, 1000);

    return () => clearInterval(poll);
  }, [lastTime]);

  // =========================
  // Blink animation
  // =========================

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (type !== "idle") return;

      setBlinking(true);

      setTimeout(() => {
        setBlinking(false);
      }, 250);
    }, 3500);

    return () => clearInterval(blinkInterval);
  }, [type]);

  // =========================
  // Current sprite
  // =========================

  const currentImage =
    blinking && type === "idle"
      ? sprites.blink
      : sprites[type] || sprites.idle;

  return (
    <main
      className="w-screen h-screen overflow-hidden"
      style={{
        background: "transparent",
      }}
    >
      <div className="absolute bottom-10 left-10 flex items-end gap-4">

        {/* Riggy */}

        <img
          src={currentImage}
          alt="Riggy"
          className="w-32 h-32 object-contain select-none pointer-events-none drop-shadow-[0_0_30px_rgba(255,0,200,0.8)]"
        />

        {/* Speech Bubble */}

        {message && (
          <div className="max-w-md rounded-[2rem] border-4 border-pink-400 bg-black/80 p-6 text-3xl font-black text-white shadow-[0_0_30px_rgba(255,0,200,0.8)]">
            {message}
          </div>
        )}
      </div>
    </main>
  );
}