"use client";

import { useState } from "react";

export default function PetDashboard() {
  const [petName, setPetName] =
    useState("Riggy");

  const [personality, setPersonality] =
    useState("Chaotic");

  const [voice, setVoice] =
    useState("Cute");

  const [color, setColor] =
    useState("#ff4fd8");

  const overlayUrl =
    "http://localhost:3000/overlay/pet";

  return (
    <main className="min-h-screen bg-[#05000d] p-8 text-white">
      <a
        href="/dashboard"
        className="text-purple-300"
      >
        ← Back to Dashboard
      </a>

      <h1 className="mt-6 text-6xl font-black">
        FurRig{" "}
        <span className="text-purple-400">
          Pet
        </span>
      </h1>

      <p className="mt-3 text-2xl text-purple-200">
        Customize your living stream
        companion.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[450px_1fr]">
        <div className="rounded-[2rem] border border-purple-500/30 bg-black/40 p-8">
          <h2 className="text-4xl font-black">
            Pet Settings
          </h2>

          <div className="mt-8">
            <label className="text-xl">
              Pet Name
            </label>

            <input
              value={petName}
              onChange={(e) =>
                setPetName(e.target.value)
              }
              className="mt-2 w-full rounded-2xl border border-purple-500/30 bg-black p-4 text-xl"
            />
          </div>

          <div className="mt-8">
            <label className="text-xl">
              Personality
            </label>

            <select
              value={personality}
              onChange={(e) =>
                setPersonality(
                  e.target.value
                )
              }
              className="mt-2 w-full rounded-2xl border border-purple-500/30 bg-black p-4 text-xl"
            >
              <option>Chaotic</option>
              <option>Wholesome</option>
              <option>Sleepy</option>
              <option>Gremlin</option>
              <option>Hyper</option>
              <option>Soft</option>
            </select>
          </div>

          <div className="mt-8">
            <label className="text-xl">
              Voice Type
            </label>

            <select
              value={voice}
              onChange={(e) =>
                setVoice(
                  e.target.value
                )
              }
              className="mt-2 w-full rounded-2xl border border-purple-500/30 bg-black p-4 text-xl"
            >
              <option>Cute</option>
              <option>Gremlin</option>
              <option>Soft</option>
              <option>Sleepy</option>
            </select>
          </div>

          <div className="mt-8">
            <label className="text-xl">
              Accent Color
            </label>

            <input
              type="color"
              value={color}
              onChange={(e) =>
                setColor(
                  e.target.value
                )
              }
              className="mt-4 h-16 w-full"
            />
          </div>

          <div className="mt-10 rounded-2xl border border-purple-500/30 bg-black/60 p-6">
            <p className="text-lg text-purple-200">
              OBS Browser Source URL
            </p>

            <div className="mt-4 rounded-xl bg-black p-4 text-sm text-green-300">
              {overlayUrl}
            </div>

            <button
              onClick={() =>
                navigator.clipboard.writeText(
                  overlayUrl
                )
              }
              className="mt-4 w-full rounded-xl bg-purple-600 py-4 text-xl font-black"
            >
              Copy OBS Link
            </button>
          </div>
        </div>

        <div className="rounded-[2rem] border border-purple-500/30 bg-black/40 p-8">
          <h2 className="text-4xl font-black">
            Live Preview
          </h2>

          <div className="mt-10 flex h-[500px] items-center justify-center rounded-[2rem] bg-[#120020]">
            <div className="text-center">
              <div
                className="mx-auto flex h-48 w-48 items-center justify-center rounded-full text-7xl shadow-2xl"
                style={{
                  backgroundColor:
                    color,
                }}
              >
                🐰
              </div>

              <h3 className="mt-8 text-5xl font-black">
                {petName}
              </h3>

              <p className="mt-4 text-2xl text-purple-300">
                {personality} •{" "}
                {voice}
              </p>

              <div className="mt-8 rounded-2xl bg-black/60 p-6 text-2xl">
                “HELLO NEW FRIEND!!”
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}