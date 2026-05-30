"use client";

import { useEffect, useRef, useState } from "react";

type RiggyState =
  | "idle"
  | "blink"
  | "walk"
  | "talk"
  | "happy"
  | "sad"
  | "sleep"
  | "snack"
  | "plushy"
  | "away";

type RiggyEvent = {
  type?: string;
  viewer?: string;
  message?: string;
  timestamp?: number;
};

const PETS = {
  idle: "/pets/riggy_idle.png",
  blink: "/pets/riggy_blink.png",
  talk: "/pets/riggy_talk.png",
  happy: "/pets/riggy_happy.png",
  sad: "/pets/riggy_sad.png",
  sleep: "/pets/riggy_sleep.png",
  walk1: "/pets/riggy_walk_1.png",
  walk2: "/pets/riggy_walk_2.png",
};

export default function RiggyPetOverlay() {
  const [state, setState] = useState<RiggyState>("idle");
  const [message, setMessage] = useState("Hi! I’m Riggy 💜");
  const [x, setX] = useState(70);
  const [facing, setFacing] = useState<"left" | "right">("left");
  const [visible, setVisible] = useState(true);
  const [walkFrame, setWalkFrame] = useState(1);
  const [talkFrame, setTalkFrame] = useState(false);
  const [lastEvent, setLastEvent] = useState(0);

  const awayRef = useRef(false);
  const busyRef = useRef(false);

  useEffect(() => {
    const blinkTimer = setInterval(() => {
      if (busyRef.current || awayRef.current) return;

      setState("blink");

      setTimeout(() => {
        setState("idle");
      }, 220);
    }, Math.floor(Math.random() * 6000) + 5000);

    return () => clearInterval(blinkTimer);
  }, []);

  useEffect(() => {
    const brain = setInterval(() => {
      if (busyRef.current || awayRef.current) return;

      const roll = Math.random();

      if (roll < 0.35) walkAround();
      else if (roll < 0.5) happy("Hehe! I’m watching the stream 💜");
      else if (roll < 0.62) snack();
      else if (roll < 0.74) plushy();
      else if (roll < 0.84) sleep();
      else if (roll < 0.92) leaveScreen();
      else setState("idle");
    }, 8500);

    return () => clearInterval(brain);
  }, [x]);

  useEffect(() => {
    const walkAnim = setInterval(() => {
      if (state === "walk") {
        setWalkFrame((frame) => (frame === 1 ? 2 : 1));
      }
    }, 260);

    return () => clearInterval(walkAnim);
  }, [state]);

  useEffect(() => {
    const talkAnim = setInterval(() => {
      if (state === "talk") {
        setTalkFrame((frame) => !frame);
      }
    }, 260);

    return () => clearInterval(talkAnim);
  }, [state]);

  useEffect(() => {
    const eventPoll = setInterval(async () => {
      try {
        const res = await fetch("/api/riggy-event", { cache: "no-store" });
        const data: RiggyEvent = await res.json();

        if (!data?.timestamp || data.timestamp === lastEvent) return;

        setLastEvent(data.timestamp);

        if (data.type === "new_viewer") {
          welcomeViewer(data.viewer || "new friend");
          return;
        }

        if (data.type === "talk") {
          talk(data.message || "Riggy is here!");
          return;
        }

        if (data.type === "sad") {
          sad(data.message || "Aww... Riggy feels shy.");
          return;
        }

        if (data.type === "snack") {
          snack();
          return;
        }

        if (data.type === "plushy") {
          plushy();
          return;
        }

        talk(data.message || "Riggy heard something!");
      } catch {
        // OBS overlay should never crash
      }
    }, 1500);

    return () => clearInterval(eventPoll);
  }, [lastEvent]);

  function currentImage() {
    if (state === "blink") return PETS.blink;
    if (state === "talk") return talkFrame ? PETS.talk : PETS.idle;
    if (state === "happy") return PETS.happy;
    if (state === "sad") return PETS.sad;
    if (state === "sleep") return PETS.sleep;
    if (state === "walk") return walkFrame === 1 ? PETS.walk1 : PETS.walk2;
    if (state === "snack") return PETS.happy;
    if (state === "plushy") return PETS.happy;
    return PETS.idle;
  }

  function walkAround() {
    busyRef.current = true;

    const nextX = Math.floor(Math.random() * 70) + 10;
    setFacing(nextX > x ? "right" : "left");
    setState("walk");
    setX(nextX);

    setTimeout(() => {
      setState("idle");
      busyRef.current = false;
    }, 4200);
  }

  function talk(text: string) {
    busyRef.current = true;
    awayRef.current = false;
    setVisible(true);
    setState("talk");
    setMessage(text);

    setTimeout(() => {
      setState("idle");
      busyRef.current = false;
    }, 6000);
  }

  function happy(text: string) {
    busyRef.current = true;
    setVisible(true);
    setState("happy");
    setMessage(text);

    setTimeout(() => {
      setState("idle");
      busyRef.current = false;
    }, 4200);
  }

  function sad(text: string) {
    busyRef.current = true;
    setVisible(true);
    setState("sad");
    setMessage(text);

    setTimeout(() => {
      setState("idle");
      busyRef.current = false;
    }, 4500);
  }

  function snack() {
    busyRef.current = true;
    setVisible(true);
    setState("snack");
    setMessage("Snack time! I found a cookie 🍪");

    setTimeout(() => {
      setState("idle");
      busyRef.current = false;
    }, 5200);
  }

  function plushy() {
    busyRef.current = true;
    setVisible(true);
    setState("plushy");
    setMessage("Look! My favourite plushy! 🧸");

    setTimeout(() => {
      setState("idle");
      busyRef.current = false;
    }, 5200);
  }

  function sleep() {
    busyRef.current = true;
    setState("sleep");
    setMessage("Zzz...");

    setTimeout(() => {
      setState("idle");
      busyRef.current = false;
    }, 6500);
  }

  function leaveScreen() {
    busyRef.current = true;
    awayRef.current = true;
    setState("walk");
    setMessage("I’m going to grab snacks...");
    setFacing("right");
    setX(116);

    setTimeout(() => {
      setVisible(false);
    }, 2200);

    setTimeout(() => {
      if (!awayRef.current) return;
      returnFromOffscreen("I’m back! I brought snacks! 🍪");
    }, 9000);
  }

  function returnFromOffscreen(text: string) {
    awayRef.current = false;
    setVisible(true);
    setState("walk");
    setFacing("left");
    setX(78);
    setMessage(text);

    setTimeout(() => {
      talk(text);
    }, 2500);
  }

  function welcomeViewer(viewer: string) {
    if (awayRef.current || !visible) {
      returnFromOffscreen(`Wait! New friend! Welcome ${viewer}! 💜`);
      return;
    }

    busyRef.current = true;
    setState("happy");
    setMessage(`Welcome ${viewer}! I’m Riggy! 💜`);

    setTimeout(() => {
      setState("talk");
    }, 1000);

    setTimeout(() => {
      setState("idle");
      busyRef.current = false;
    }, 5500);
  }

  const showBubble =
    visible &&
    state !== "idle" &&
    state !== "blink" &&
    state !== "walk" &&
    state !== "sleep" &&
    state !== "away";

  return (
    <main className="h-screen w-screen overflow-hidden bg-transparent">
      {visible && (
        <div
          className="fixed bottom-8 z-[9999] flex flex-col items-center transition-all duration-[2200ms] ease-in-out"
          style={{ left: `${x}%`, transform: "translateX(-50%)" }}
        >
          {showBubble && (
            <div className="mb-3 max-w-[420px] rounded-3xl border border-pink-400 bg-black/85 px-6 py-4 text-center text-xl font-black text-white shadow-[0_0_35px_#ec4899]">
              {message}
            </div>
          )}

          <div
            className={`relative h-64 w-64 ${
              state === "idle" ? "animate-[riggyBreathe_3s_ease-in-out_infinite]" : ""
            } ${
              state === "happy" || state === "snack" || state === "plushy"
                ? "animate-[riggyHappy_0.75s_ease-in-out_infinite]"
                : ""
            } ${
              state === "sad" ? "animate-[riggySad_2s_ease-in-out_infinite]" : ""
            } ${
              state === "sleep" ? "animate-[riggySleep_3s_ease-in-out_infinite]" : ""
            }`}
            style={{
              transform: facing === "right" ? "scaleX(-1)" : "scaleX(1)",
            }}
          >
            <img
              src={currentImage()}
              alt="Riggy"
              className="h-full w-full object-contain drop-shadow-[0_0_35px_#ec4899]"
            />

            {state === "snack" && (
              <div className="absolute -right-4 bottom-10 text-5xl animate-bounce">
                🍪
              </div>
            )}

            {state === "plushy" && (
              <div className="absolute -right-8 bottom-8 text-6xl animate-[riggyBreathe_1.4s_ease-in-out_infinite]">
                🧸
              </div>
            )}

            {state === "sleep" && (
              <div className="absolute -right-2 top-4 text-5xl animate-pulse text-white">
                Zzz
              </div>
            )}
          </div>

          <div className="mt-2 rounded-full border border-pink-400 bg-black/80 px-5 py-2 text-sm font-black text-pink-200 shadow-[0_0_20px_#ec4899]">
            Riggy • {state}
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes riggyBreathe {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-6px) scale(1.035);
          }
        }

        @keyframes riggyHappy {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-14px) scale(1.06);
          }
        }

        @keyframes riggySad {
          0%,
          100% {
            transform: translateY(0px) rotate(-2deg) scale(0.96);
            opacity: 0.95;
          }
          50% {
            transform: translateY(3px) rotate(2deg) scale(0.94);
            opacity: 0.85;
          }
        }

        @keyframes riggySleep {
          0%,
          100% {
            transform: translateY(0px) rotate(-4deg) scale(0.96);
          }
          50% {
            transform: translateY(3px) rotate(-4deg) scale(1);
          }
        }
      `}</style>
    </main>
  );
}