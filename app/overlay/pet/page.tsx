"use client";

import { useEffect, useRef, useState } from "react";

type RiggyState =
  | "idle"
  | "walk"
  | "run"
  | "talk"
  | "wave"
  | "happy"
  | "sleep"
  | "dance"
  | "snack"
  | "plushy"
  | "away";

type RiggyEvent = {
  type?: string;
  viewer?: string;
  message?: string;
  imageUrl?: string;
  timestamp?: number;
};

export default function RiggyLivingOverlay() {
  const [state, setState] = useState<RiggyState>("idle");
  const [message, setMessage] = useState("Hi! I’m Riggy 💜");
  const [x, setX] = useState(72);
  const [facing, setFacing] = useState<"left" | "right">("left");
  const [visible, setVisible] = useState(true);
  const [lastEvent, setLastEvent] = useState(0);
  const [riggyImage, setRiggyImage] = useState("");
  const awayRef = useRef(false);

  useEffect(() => {
    const brain = setInterval(() => {
      if (state === "talk" || state === "wave" || state === "run") return;

      const roll = Math.random();

      if (roll < 0.25) walkAround();
      else if (roll < 0.38) doAction("happy", "Hehe! I’m still here 💜");
      else if (roll < 0.5) doAction("dance", "Tiny dance break! ✨");
      else if (roll < 0.62) doAction("snack", "I found snacks! 🍪");
      else if (roll < 0.72) doAction("plushy", "Look! My favourite plushy! 🧸");
      else if (roll < 0.8) leaveScreen();
      else setState("idle");
    }, 9000);

    return () => clearInterval(brain);
  }, [state]);

  useEffect(() => {
    const eventPoll = setInterval(async () => {
      try {
        const res = await fetch("/api/riggy-event", { cache: "no-store" });
        const data: RiggyEvent = await res.json();

        if (!data?.timestamp || data.timestamp === lastEvent) return;

        setLastEvent(data.timestamp);

        if (data.imageUrl) {
          setRiggyImage(data.imageUrl);
        }

        if (data.type === "new_viewer") {
          welcomeViewer(data.viewer || "new friend");
          return;
        }

        if (data.type === "talk") {
          talk(data.message || "Riggy is here!");
          return;
        }

        if (data.type === "plushy") {
          doAction("plushy", data.message || "I brought my plushy! 🧸");
          return;
        }

        if (data.type === "snack") {
          doAction("snack", data.message || "Snack delivery! 🍪");
          return;
        }

        talk(data.message || "Riggy heard something!");
      } catch {
        // OBS overlay should never crash
      }
    }, 1500);

    return () => clearInterval(eventPoll);
  }, [lastEvent]);

  function walkAround() {
    const nextX = Math.floor(Math.random() * 70) + 10;
    setFacing(nextX > x ? "right" : "left");
    setState("walk");
    setX(nextX);

    setTimeout(() => {
      setState("idle");
    }, 3500);
  }

  function leaveScreen() {
    awayRef.current = true;
    setState("away");
    setMessage("I’m going to grab snacks... 🍪");
    setFacing("right");
    setX(112);

    setTimeout(() => {
      setVisible(false);
    }, 1800);

    setTimeout(() => {
      if (!awayRef.current) return;
      returnFromOffscreen("I’m back! I brought snacks! 🍪");
    }, 9000);
  }

  function returnFromOffscreen(text: string) {
    awayRef.current = false;
    setVisible(true);
    setState("run");
    setFacing("left");
    setX(78);
    setMessage(text);

    setTimeout(() => {
      setState("talk");
    }, 1200);

    setTimeout(() => {
      setState("idle");
    }, 5500);
  }

  function welcomeViewer(viewer: string) {
    if (awayRef.current || !visible) {
      returnFromOffscreen(`Wait! New friend! Welcome ${viewer}! 💜`);
      return;
    }

    setState("wave");
    setMessage(`Welcome ${viewer}! I’m Riggy! 💜`);

    setTimeout(() => {
      setState("idle");
    }, 5000);
  }

  function talk(text: string) {
    setVisible(true);
    awayRef.current = false;
    setState("talk");
    setMessage(text);

    setTimeout(() => {
      setState("idle");
    }, 6500);
  }

  function doAction(nextState: RiggyState, text: string) {
    setVisible(true);
    awayRef.current = false;
    setState(nextState);
    setMessage(text);

    setTimeout(() => {
      setState("idle");
    }, 6000);
  }

  const showBubble =
    visible &&
    state !== "sleep" &&
    state !== "idle" &&
    state !== "walk" &&
    state !== "away";

  return (
    <main className="h-screen w-screen overflow-hidden bg-transparent">
      {visible && (
        <div
          className="fixed bottom-8 z-[9999] flex flex-col items-center transition-all duration-[2200ms] ease-in-out"
          style={{ left: `${x}%`, transform: "translateX(-50%)" }}
        >
          {showBubble && (
            <div className="mb-4 max-w-[420px] rounded-3xl border border-pink-400 bg-black/85 px-6 py-4 text-center text-xl font-black text-white shadow-[0_0_35px_#ec4899]">
              {message}
            </div>
          )}

          <div
            className={`relative h-64 w-64 ${
              state === "idle" ? "animate-[riggyBreathe_3s_ease-in-out_infinite]" : ""
            } ${state === "walk" ? "animate-[riggyWalk_0.8s_ease-in-out_infinite]" : ""}
              ${state === "run" ? "animate-[riggyRun_0.45s_ease-in-out_infinite]" : ""}
              ${state === "talk" ? "animate-[riggyTalk_0.35s_ease-in-out_infinite]" : ""}
              ${state === "wave" ? "animate-[riggyWave_0.8s_ease-in-out_infinite]" : ""}
              ${state === "happy" ? "animate-[riggyHappy_0.7s_ease-in-out_infinite]" : ""}
              ${state === "sleep" ? "animate-[riggySleep_3s_ease-in-out_infinite]" : ""}
              ${state === "dance" ? "animate-[riggyDance_0.6s_ease-in-out_infinite]" : ""}
              ${state === "snack" ? "animate-[riggyHappy_0.8s_ease-in-out_infinite]" : ""}
              ${state === "plushy" ? "animate-[riggyWave_0.9s_ease-in-out_infinite]" : ""}
            `}
            style={{
              transform: facing === "right" ? "scaleX(-1)" : "scaleX(1)",
            }}
          >
            {riggyImage ? (
              <img
                src={riggyImage}
                alt="Riggy"
                className="h-full w-full object-contain drop-shadow-[0_0_35px_#ec4899]"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-9xl drop-shadow-[0_0_35px_#ec4899]">
                🐰
              </div>
            )}

            {state === "talk" && (
              <div className="absolute left-1/2 top-[54%] h-5 w-14 -translate-x-1/2 rounded-full bg-black/70 animate-[riggyMouth_0.25s_ease-in-out_infinite]" />
            )}

            {state === "snack" && (
              <div className="absolute -right-4 bottom-12 text-5xl animate-bounce">
                🍪
              </div>
            )}

            {state === "plushy" && (
              <div className="absolute -right-8 bottom-10 text-6xl animate-[riggyBreathe_1.4s_ease-in-out_infinite]">
                🧸
              </div>
            )}

            {state === "sleep" && (
              <div className="absolute -right-2 top-4 text-5xl animate-pulse">
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

        @keyframes riggyWalk {
          0%,
          100% {
            transform: translateY(0px) rotate(-2deg);
          }
          50% {
            transform: translateY(-10px) rotate(2deg);
          }
        }

        @keyframes riggyRun {
          0%,
          100% {
            transform: translateY(0px) scale(1.03);
          }
          50% {
            transform: translateY(-18px) scale(1.08);
          }
        }

        @keyframes riggyTalk {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-4px) scale(1.025);
          }
        }

        @keyframes riggyMouth {
          0%,
          100% {
            transform: translateX(-50%) scaleY(0.35);
            opacity: 0.55;
          }
          50% {
            transform: translateX(-50%) scaleY(1.15);
            opacity: 1;
          }
        }

        @keyframes riggyWave {
          0%,
          100% {
            transform: rotate(-3deg) translateY(0px);
          }
          50% {
            transform: rotate(5deg) translateY(-8px);
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

        @keyframes riggySleep {
          0%,
          100% {
            transform: translateY(0px) rotate(-4deg) scale(0.96);
          }
          50% {
            transform: translateY(3px) rotate(-4deg) scale(1);
          }
        }

        @keyframes riggyDance {
          0%,
          100% {
            transform: rotate(-7deg) translateY(0px) scale(1.03);
          }
          25% {
            transform: rotate(7deg) translateY(-10px) scale(1.08);
          }
          50% {
            transform: rotate(-4deg) translateY(0px) scale(1.05);
          }
          75% {
            transform: rotate(7deg) translateY(-10px) scale(1.08);
          }
        }
      `}</style>
    </main>
  );
}