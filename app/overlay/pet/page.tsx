"use client";

import { useEffect, useState } from "react";

type RiggyEvent = {
  message: string;
  mood: string;
  time: number;
};

export default function PetOverlay() {
  const [event, setEvent] = useState<RiggyEvent>({
    message: "H-Hello... where am I?",
    mood: "idle",
    time: Date.now(),
  });

  const [blinking, setBlinking] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    const poll = setInterval(async () => {
      try {
        const res = await fetch("/api/riggy/event");
        const data = await res.json();

        if (data.message && data.time !== event.time) {
          setEvent(data);

          setShowBubble(true);

          setTimeout(() => {
            setShowBubble(false);
          }, 8000);
        }
      } catch (err) {
        console.error(err);
      }
    }, 1000);

    return () => clearInterval(poll);
  }, [event.time]);

  useEffect(() => {
    const blinkTimer = setInterval(() => {
      setBlinking(true);

      setTimeout(() => {
        setBlinking(false);
      }, 250);
    }, 4000);

    return () => clearInterval(blinkTimer);
  }, []);

  function getRiggyImage() {
    if (event.mood === "talk") {
      return "/pets/riggy_talk.png";
    }

    if (event.mood === "happy") {
      return "/pets/riggy_happy.png";
    }

    if (event.mood === "sad") {
      return "/pets/riggy_sad.png";
    }

    if (event.mood === "sleep") {
      return "/pets/riggy_sleep.png";
    }

    if (blinking) {
      return "/pets/riggy_blink.png";
    }

    return "/pets/riggy_idle.png";
  }

  return (
    <main
      className="h-screen w-screen overflow-hidden"
      style={{ background: "transparent" }}
    >
      <div className="absolute bottom-10 left-10 flex items-end gap-4">
        <img
          src={getRiggyImage()}
          alt="Riggy"
          className="h-32 w-32 object-contain drop-shadow-[0_0_25px_rgba(255,0,200,0.9)]"
        />

        {showBubble && (
          <div className="max-w-md rounded-[2rem] border-4 border-pink-400 bg-black/80 p-6 text-2xl font-black text-white shadow-[0_0_30px_rgba(255,0,200,0.7)]">
            {event.message}
          </div>
        )}
      </div>
    </main>
  );
}