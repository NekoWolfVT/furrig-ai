"use client";

import Link from "next/link";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";

type RiggyFrames = {
  idle_url?: string;
  blink_url?: string;
  talk_url?: string;
  happy_url?: string;
  sad_url?: string;
  sleep_url?: string;
  walk_1_url?: string;
  walk_2_url?: string;
  snack_url?: string;
  plushy_url?: string;
};

const examples = [
  "Cute baby dinosaur with purple horns and bunny ears",
  "Dark vampire wolf assistant with glowing red eyes",
  "Tiny dragon companion with gold horns",
  "Anime fox helper with floating magic rings",
  "Robot bat with glowing blue eyes and tiny wings",
];

export default function RiggyBuilderPage() {
  const { user, isSignedIn } = useUser();

  const [prompt, setPrompt] = useState("");
  const [look, setLook] = useState("Custom Riggy Companion");
  const [previewState, setPreviewState] = useState<keyof RiggyFrames>("idle_url");
  const [frames, setFrames] = useState<RiggyFrames>({});
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function generatePack() {
    if (!prompt.trim()) {
      setMessage("Type a prompt first.");
      return;
    }

    setGenerating(true);
    setMessage("");
    setLook(prompt);

    try {
      const res = await fetch("/api/riggy/generate-pack", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok || !data?.frames) {
        console.error(data);
        setMessage("Failed to generate Riggy animation pack.");
        return;
      }

      setFrames(data.frames);
      setPreviewState("idle_url");
      setMessage("Riggy animation pack generated! 💜");
    } catch (error) {
      console.error(error);
      setMessage("Could not connect to Riggy generator.");
    } finally {
      setGenerating(false);
    }
  }

  async function saveRiggy() {
    if (!isSignedIn || !user?.id) {
      setMessage("Please sign in to save Riggy.");
      return;
    }

    if (!frames.idle_url) {
      setMessage("Generate a Riggy animation pack before saving.");
      return;
    }

    setSaving(true);
    setMessage("");

    const { error } = await supabase.from("riggies").insert({
      user_id: user.id,
      name: look,
      prompt,
      personality: "friendly",
      appearance: look,
      image_url: frames.idle_url || null,
      idle_url: frames.idle_url || null,
      blink_url: frames.blink_url || null,
      talk_url: frames.talk_url || null,
      happy_url: frames.happy_url || null,
      sad_url: frames.sad_url || null,
      sleep_url: frames.sleep_url || null,
      walk_1_url: frames.walk_1_url || null,
      walk_2_url: frames.walk_2_url || null,
      snack_url: frames.snack_url || null,
      plushy_url: frames.plushy_url || null,
      model_type: "sprite_pack",
      animation_state: "idle",
      visibility: "private",
    });

    setSaving(false);

    if (error) {
      console.error(error);
      setMessage("Failed to save Riggy.");
      return;
    }

    setMessage("Riggy animation pack saved! 🐾");
  }

  const previewImage = frames[previewState] || frames.idle_url;

  return (
    <main className="min-h-screen bg-[#05000d] px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <Link href="/dashboard" className="text-purple-300 hover:text-purple-200">
          ← Back Dashboard
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <section>
            <h1 className="text-6xl font-black">
              Riggy <span className="text-pink-400">Animation Pack</span>
            </h1>

            <p className="mt-4 max-w-2xl text-xl text-purple-200">
              Generate a full FurRig pet pack: idle, blink, talk, happy, sad,
              sleep, walk, snack, and plushy frames.
            </p>

            <div className="mt-8 rounded-3xl border border-purple-500/30 bg-black/50 p-6">
              <label className="text-xl font-black text-pink-300">
                Describe your Riggy
              </label>

              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Example: cute baby dinosaur with purple horns and bunny ears..."
                className="mt-4 h-40 w-full rounded-2xl border border-purple-500/30 bg-black/60 p-5 text-white outline-none focus:border-pink-400"
              />

              <button
                onClick={generatePack}
                disabled={generating}
                className="mt-5 w-full rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 py-4 text-xl font-black shadow-[0_0_30px_#ec4899] disabled:opacity-50"
              >
                {generating ? "Generating Animation Pack..." : "Generate Animation Pack ✨"}
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
              Riggy Pack Preview
            </h2>

            <div className="mt-8 flex min-h-[520px] flex-col items-center justify-center rounded-[2rem] border border-purple-500/30 bg-gradient-to-b from-[#12001f] to-black p-6">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Riggy Preview"
                  className="max-h-80 max-w-full object-contain drop-shadow-[0_0_35px_#ec4899]"
                />
              ) : (
                <p className="text-center text-xl font-black text-pink-200">
                  No pack yet. Generate a Riggy animation pack.
                </p>
              )}

              <h3 className="mt-8 text-center text-3xl font-black">{look}</h3>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {[
                  ["idle_url", "Idle"],
                  ["blink_url", "Blink"],
                  ["talk_url", "Talk"],
                  ["happy_url", "Happy"],
                  ["sad_url", "Sad"],
                  ["sleep_url", "Sleep"],
                  ["walk_1_url", "Walk 1"],
                  ["walk_2_url", "Walk 2"],
                  ["snack_url", "Snack"],
                  ["plushy_url", "Plushy"],
                ].map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setPreviewState(key as keyof RiggyFrames)}
                    className={`rounded-xl border px-4 py-2 font-bold ${
                      previewState === key
                        ? "border-pink-400 bg-pink-950/50 text-pink-200"
                        : "border-purple-500 hover:bg-purple-950"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <button
                onClick={saveRiggy}
                disabled={saving}
                className="rounded-2xl bg-purple-600 py-4 font-black hover:bg-purple-500 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Riggy Pack"}
              </button>

              <Link
                href="/overlay/pet"
                className="rounded-2xl border border-pink-500 py-4 text-center font-black hover:bg-pink-950/40"
              >
                Test OBS Pet
              </Link>
            </div>

            {message && (
              <p className="mt-4 text-center text-pink-300">{message}</p>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}