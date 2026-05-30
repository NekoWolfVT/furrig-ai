"use client";

import Link from "next/link";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";

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
  const [look, setLook] = useState("Cute animated Riggy companion");
  const [mood, setMood] = useState("happy");
  const [animating, setAnimating] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  async function generateRiggy() {
    if (!prompt.trim()) {
      setSavedMessage("Type a prompt first.");
      return;
    }

    setGenerating(true);
    setAnimating(true);
    setSavedMessage("");
    setLook(prompt);

    try {
      const res = await fetch("/api/riggy/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok || !data.imageUrl) {
        console.error(data);
        setSavedMessage("AI image generation failed.");
        return;
      }

      setImageUrl(data.imageUrl);
      setSavedMessage("Riggy generated! 🐾✨");
    } catch (error) {
      console.error(error);
      setSavedMessage("Could not connect to Riggy AI generator.");
    } finally {
      setGenerating(false);
      setTimeout(() => setAnimating(false), 1200);
    }
  }

  async function saveRiggy() {
    if (!isSignedIn || !user?.id) {
      setSavedMessage("Please sign in to save Riggy.");
      return;
    }

    if (!prompt.trim()) {
      setSavedMessage("Generate a Riggy before saving.");
      return;
    }

    setSaving(true);
    setSavedMessage("");

    const { error } = await supabase.from("riggies").insert({
      user_id: user.id,
      name: look || "Custom Riggy",
      prompt: prompt || look,
      personality: mood,
      appearance: look,
      image_url: imageUrl || null,
      visibility: "private",
    });

    setSaving(false);

    if (error) {
      console.error(error);
      setSavedMessage("Failed to save Riggy.");
      return;
    }

    setSavedMessage("Riggy saved to Supabase! 💜");
  }

  function changeMood(state: string) {
    setMood(state);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 1200);
  }

  return (
    <main className="min-h-screen bg-[#05000d] px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <Link href="/dashboard" className="text-purple-300 hover:text-purple-200">
          ← Back Dashboard
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <section>
            <h1 className="text-6xl font-black">
              Riggy <span className="text-pink-400">Builder</span>
            </h1>

            <p className="mt-4 max-w-2xl text-xl text-purple-200">
              Type a prompt and FurRig AI will generate a real animated-style
              companion pet. Make Riggy a dinosaur, wolf, dragon, fox, robot,
              vampire, monster, or anything you imagine.
            </p>

            <div className="mt-8 rounded-3xl border border-purple-500/30 bg-black/50 p-6">
              <label className="text-xl font-black text-pink-300">
                Customize Riggy with a prompt
              </label>

              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Example: cute baby dinosaur with purple horns and bunny ears..."
                className="mt-4 h-40 w-full rounded-2xl border border-purple-500/30 bg-black/60 p-5 text-white outline-none focus:border-pink-400"
              />

              <button
                onClick={generateRiggy}
                disabled={generating}
                className="mt-5 w-full rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 py-4 text-xl font-black shadow-[0_0_30px_#ec4899] disabled:opacity-50"
              >
                {generating ? "Generating AI Riggy..." : "Generate AI Riggy ✨"}
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

            <div className="mt-8 flex min-h-[520px] flex-col items-center justify-center rounded-[2rem] border border-purple-500/30 bg-gradient-to-b from-[#12001f] to-black p-6">
              <div
                className={`relative flex h-96 w-96 items-center justify-center overflow-visible ${
                  animating
                    ? "animate-[riggyFloat_1.2s_ease-in-out_infinite]"
                    : "animate-[riggyBreathe_3s_ease-in-out_infinite]"
                }`}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Generated Riggy"
                    className="max-h-full max-w-full object-contain drop-shadow-[0_0_35px_#ec4899]"
                  />
                ) : generating ? (
                  <p className="text-center text-xl font-black text-white">
                    Creating your AI Riggy...
                  </p>
                ) : (
                  <p className="text-center text-xl font-black text-pink-200">
                    No AI pet yet. Click Generate AI Riggy.
                  </p>
                )}
              </div>

              <h3 className="mt-8 text-center text-3xl font-black">{look}</h3>

              <p className="mt-3 text-center text-purple-200">
                Animation state: {mood}
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {["idle", "happy", "talk", "sleep", "dance"].map((state) => (
                  <button
                    key={state}
                    onClick={() => changeMood(state)}
                    className="rounded-xl border border-purple-500 px-4 py-2 font-bold hover:bg-purple-950"
                  >
                    {state}
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
                {saving ? "Saving..." : "Save Riggy"}
              </button>

              <Link
                href="/overlay/pet"
                className="rounded-2xl border border-pink-500 py-4 text-center font-black hover:bg-pink-950/40"
              >
                Test OBS Overlay
              </Link>
            </div>

            {savedMessage && (
              <p className="mt-4 text-center text-pink-300">{savedMessage}</p>
            )}
          </section>
        </div>
      </div>

      <style jsx global>{`
        @keyframes riggyBreathe {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-8px) scale(1.035);
          }
        }

        @keyframes riggyFloat {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          25% {
            transform: translateY(-12px) rotate(-2deg) scale(1.04);
          }
          50% {
            transform: translateY(0px) rotate(2deg) scale(1.02);
          }
          75% {
            transform: translateY(-8px) rotate(-1deg) scale(1.04);
          }
        }
      `}</style>
    </main>
  );
}