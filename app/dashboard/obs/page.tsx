"use client";

import Link from "next/link";
import { useState } from "react";

export default function OBSPage() {
  const [position, setPosition] = useState("bottom-right");
  const [bubble, setBubble] = useState("on");

  return (
    <main className="min-h-screen bg-[#05000d] px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-purple-300 hover:text-purple-200">
          ← Back Home
        </Link>

        <h1 className="mt-6 text-6xl font-black">
          OBS <span className="text-pink-400">Riggy Overlay</span>
        </h1>

        <p className="mt-4 max-w-2xl text-xl text-purple-200">
          Add Riggy to OBS as a transparent browser source for Twitch streams.
        </p>

        <section className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-3xl border border-purple-500/30 bg-black/50 p-8">
            <h2 className="text-3xl font-black">Overlay Settings</h2>

            <label className="mt-6 block">
              <p className="mb-2 font-bold text-purple-200">Riggy Position</p>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full rounded-2xl border border-purple-500/30 bg-black/50 p-4"
              >
                <option value="bottom-right">Bottom Right</option>
                <option value="bottom-left">Bottom Left</option>
                <option value="top-right">Top Right</option>
                <option value="top-left">Top Left</option>
              </select>
            </label>

            <label className="mt-6 block">
              <p className="mb-2 font-bold text-purple-200">Speech Bubble</p>
              <select
                value={bubble}
                onChange={(e) => setBubble(e.target.value)}
                className="w-full rounded-2xl border border-purple-500/30 bg-black/50 p-4"
              >
                <option value="on">On</option>
                <option value="off">Off</option>
              </select>
            </label>

            <div className="mt-8 rounded-2xl border border-pink-500/30 bg-pink-950/20 p-5">
              <p className="font-bold text-pink-300">OBS Browser Source URL</p>

              <code className="mt-3 block break-all rounded-xl bg-black/60 p-4 text-purple-100">
                https://furrig.com/overlay/pet
              </code>
            </div>

            <button className="mt-8 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-xl font-black">
              Save Overlay Settings
            </button>
          </div>

          <div className="rounded-3xl border border-pink-500/40 bg-black/50 p-8 shadow-[0_0_40px_#ec489944]">
            <h2 className="text-3xl font-black text-pink-300">Preview</h2>

            <div className="mt-8 flex h-[420px] items-center justify-center rounded-3xl border border-purple-500/30 bg-gradient-to-b from-purple-950/30 to-black">
              <div className="text-center">
                {bubble === "on" && (
                  <div className="mb-4 rounded-3xl border border-pink-400 bg-black/80 px-6 py-4 text-xl font-bold">
                    Hi! I’m Riggy 💜
                  </div>
                )}

                <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-full border-4 border-pink-400 bg-gradient-to-br from-pink-500 to-purple-800 text-8xl shadow-[0_0_60px_#ec4899]">
                  🐰
                </div>

                <p className="mt-4 text-pink-300">{position}</p>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <Link
                href="/overlay/pet"
                className="flex-1 rounded-2xl bg-pink-600 px-6 py-4 text-center font-black hover:bg-pink-500"
              >
                Open Overlay
              </Link>

              <Link
                href="/dashboard/twitch-bot"
                className="flex-1 rounded-2xl border border-purple-500 px-6 py-4 text-center font-black hover:bg-purple-950"
              >
                Twitch Bot
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}