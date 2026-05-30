"use client";

import Link from "next/link";
import { useState } from "react";

export default function TwitchBotPage() {
  const [botName, setBotName] = useState("FurRigBot");
  const [channel, setChannel] = useState("");
  const [personality, setPersonality] = useState(
    "Cute, friendly, funny, supportive, slightly chaotic"
  );

  return (
    <main className="min-h-screen bg-[#05000d] px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-purple-300 hover:text-purple-200">
          ← Back Home
        </Link>

        <h1 className="mt-6 text-6xl font-black">
          Twitch <span className="text-pink-400">RiggyBot</span>
        </h1>

        <p className="mt-4 max-w-2xl text-xl text-purple-200">
          Connect your custom Riggy companion to Twitch chat. Riggy talks
          naturally, remembers viewers, and reacts without commands.
        </p>

        <section className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-3xl border border-purple-500/30 bg-black/50 p-8">
            <h2 className="text-3xl font-black">Bot Settings</h2>

            <div className="mt-6 space-y-5">
              <Field
                label="Bot Name"
                value={botName}
                onChange={setBotName}
                placeholder="FurRigBot"
              />

              <Field
                label="Twitch Channel"
                value={channel}
                onChange={setChannel}
                placeholder="your_twitch_channel"
              />

              <label className="block">
                <p className="mb-2 font-bold text-purple-200">
                  Riggy Personality
                </p>

                <textarea
                  value={personality}
                  onChange={(e) => setPersonality(e.target.value)}
                  className="h-36 w-full rounded-2xl border border-purple-500/30 bg-black/50 p-4 outline-none"
                />
              </label>
            </div>

            <button className="mt-8 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-xl font-black shadow-[0_0_25px_#ec4899]">
              Save Bot Settings
            </button>
          </div>

          <div className="rounded-3xl border border-pink-500/40 bg-black/50 p-8 shadow-[0_0_40px_#ec489944]">
            <h2 className="text-3xl font-black text-pink-300">
              Live Preview
            </h2>

            <div className="mt-8 rounded-3xl border border-purple-500/30 bg-black/60 p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-700 text-4xl">
                  🐰
                </div>

                <div>
                  <p className="text-2xl font-black">{botName}</p>
                  <p className="text-green-400">● Ready for Twitch</p>
                </div>
              </div>

              <p className="mt-6 rounded-2xl bg-purple-950/40 p-4 text-purple-100">
                “Hiii chat! I’m Riggy, your cute FurRig companion. I’ll help
                with avatars, prompts, ideas, and chaotic bunny energy! 💜”
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <Link
                href="/dashboard/riggy-builder"
                className="block rounded-2xl bg-pink-600 px-6 py-4 text-center font-black hover:bg-pink-500"
              >
                Customize Riggy Look
              </Link>

              <Link
                href="/overlay/pet"
                className="block rounded-2xl border border-purple-500 px-6 py-4 text-center font-black hover:bg-purple-950"
              >
                Open OBS Overlay
              </Link>

              <Link
                href="/dashboard/riggy-memory"
                className="block rounded-2xl border border-purple-500 px-6 py-4 text-center font-black hover:bg-purple-950"
              >
                View Memory
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-purple-500/30 bg-black/50 p-8">
          <h2 className="text-3xl font-black">How Twitch Riggy Works</h2>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <Step title="1. Connect Twitch" text="Add your bot account and channel name." />
            <Step title="2. Customize Riggy" text="Use prompts to change Riggy’s look and personality." />
            <Step title="3. Go Live" text="Riggy chats naturally and appears in your OBS overlay." />
          </div>
        </section>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="block">
      <p className="mb-2 font-bold text-purple-200">{label}</p>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-purple-500/30 bg-black/50 p-4 outline-none"
      />
    </label>
  );
}

function Step({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-purple-500/20 bg-black/40 p-5">
      <h3 className="text-xl font-black text-pink-300">{title}</h3>
      <p className="mt-2 text-purple-200">{text}</p>
    </div>
  );
}