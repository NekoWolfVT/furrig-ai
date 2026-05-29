"use client";

import Link from "next/link";
import { useState } from "react";

const examples = [
  "Cute cyber bunny streamer with neon pink ears",
  "Dark vampire wolf assistant with glowing red eyes",
  "Tiny dragon companion with gold horns",
  "Anime fox helper with floating magic rings",
  "Robot cat VTuber assistant with hologram tail",
];

export default function RiggyBuilderPage() {
  const [prompt, setPrompt] = useState("");
  const [look, setLook] = useState("Cute bunny AI helper");
  const [mood, setMood] = useState("happy");
  const [animating, setAnimating] = useState(false);

  function generateRiggy() {
    if (!prompt.trim()) return;

    setLook(prompt);
    setAnimating(true);

    setTimeout(() => {
      setAnimating(false);
    }, 1800);
  }

  return (
    <main className="min-h-screen bg-[#05000d] px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <Link href="/" className="text-purple-300 hover:text-purple-200">
          ← Back Home
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <section>
            <h1 className="text-6xl font-black">
              Riggy <span className="text-pink-400">Builder</span>
            </h1>

            <p className="mt-4 max-w-2xl text-xl text-purple-200">
              Type a prompt to change how Riggy looks, acts, and animates.
              Make him a bunny, wolf, dragon, fox, robot, vampire, anything.
            </p>

            <div className="mt-8 rounded-3xl border border-purple-500/30 bg-black/50 p-6">
              <label className="text-xl font-black text-pink-300">
                Customize Riggy with a prompt
              </label>

              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Example: Make Riggy a gothic vampire wolf with red eyes and a black cloak..."
                className="mt-4 h-40 w-full rounded-2xl border border-purple-500/30 bg-black/60 p-5 text-white outline-none focus:border-pink-400"
              />

              <button
                onClick={generateRiggy}
                className="mt-5 w-full rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 py-4 text-xl font-black shadow-[0_0_30px_#ec4899]"
              >
                Generate Riggy Look ✨
              </button>
            </div>

            <div className="mt-8 rounded-3xl border border-purple-500/30 bg-black/50 p-6">
              <h2 className="text-2xl font-black">Prompt Ideas</h2>

              <div className="mt-4 space-y-3">
                {examples.map((example) => (
                  <button
                    key={example}
                    onClick={() => setPrompt(example)}
                    className="block w-full rounded-xl border border-purple-500/30 bg-purple-950/20 p-4 text-left text-purple-100 hover:bg-purple-900/40"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-pink-500/40 bg-black/50 p-8 shadow-[0_0_60px_#ec489944]">
            <h2 className="text-3xl font-black text-pink-300">
              Animated Preview
            </h2>

            <div className="mt-8 flex min-h-[520px] flex-col items-center justify-center rounded-[2rem] border border-purple-500/30 bg-gradient-to-b from-purple-950/40 to-black">
              <div
                className={`flex h-72 w-72 items-center justify-center rounded-full border-4 border-pink-400 bg-gradient-to-br from-pink-500 to-purple-800 text-9xl shadow-[0_0_80px_#ec4899] ${
                  animating ? "animate-bounce" : "animate-pulse"
                }`}
              >
                {look.toLowerCase().includes("wolf")
                  ? "🐺"
                  : look.toLowerCase().includes("dragon")
                  ? "🐉"
                  : look.toLowerCase().includes("fox")
                  ? "🦊"
                  : look.toLowerCase().includes("cat")
                  ? "🐱"
                  : "🐰"}
              </div>

              <h3 className="mt-8 text-center text-3xl font-black">
                {look}
              </h3>

              <p className="mt-3 text-center text-purple-200">
                Animation state: {mood}
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {["idle", "happy", "talk", "sleep", "dance"].map((state) => (
                  <button
                    key={state}
                    onClick={() => {
                      setMood(state);
                      setAnimating(true);
                      setTimeout(() => setAnimating(false), 1200);
                    }}
                    className="rounded-xl border border-purple-500 px-4 py-2 font-bold hover:bg-purple-950"
                  >
                    {state}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <button className="rounded-2xl bg-purple-600 py-4 font-black hover:bg-purple-500">
                Save Riggy
              </button>

              <Link
                href="/overlay/pet"
                className="rounded-2xl border border-pink-500 py-4 text-center font-black hover:bg-pink-950/40"
              >
                Test OBS Overlay
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}