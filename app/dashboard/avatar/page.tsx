"use client";

import { useState } from "react";

const styles = ["Anime", "Cyberpunk", "Gothic", "Kawaii", "Chibi", "Fantasy"];
const species = ["Wolf", "Fox", "Cat", "Dragon", "Bunny", "Hybrid"];

export default function AvatarCreatorPage() {
  const [prompt, setPrompt] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("Wolf");
  const [selectedStyle, setSelectedStyle] = useState("Anime");
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState("");

  async function generateAvatar() {
    setLoading(true);
    setGeneratedImage("");

    const finalPrompt = `
Create a ${selectedSpecies} furry VTuber avatar in ${selectedStyle} style.

User prompt:
${prompt}

Professional VTuber concept art.
Streamer aesthetic.
Rig-ready character design.
Clean full body character.
High quality.
No text.
No watermark.
`;

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: finalPrompt }),
    });

    const data = await response.json();

    if (data.image) {
      setGeneratedImage(data.image);
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#05000d] p-8 text-white">
      <div className="mx-auto max-w-7xl">
        <a href="/dashboard" className="text-purple-300">
          ← Back to Dashboard
        </a>

        <h1 className="mt-6 text-5xl font-black">
          AI Avatar <span className="text-purple-400">Creator</span>
        </h1>

        <div className="mt-10 grid gap-8 lg:grid-cols-[420px_1fr]">
          <section className="rounded-[2rem] border border-purple-500/30 bg-black/40 p-6">
            <h2 className="text-2xl font-black text-purple-300">
              Avatar Settings
            </h2>

            <label className="mt-6 block text-sm text-purple-200">
              Avatar Prompt
            </label>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="mt-2 h-36 w-full rounded-2xl border border-purple-500/30 bg-black/60 p-4 text-white"
              placeholder="Example: cute gothic wolf VTuber, purple hoodie, streamer vibe..."
            />

            <label className="mt-6 block text-sm text-purple-200">
              Species
            </label>

            <select
              value={selectedSpecies}
              onChange={(e) => setSelectedSpecies(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-purple-500/30 bg-black/60 p-4 text-white"
            >
              {species.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <label className="mt-6 block text-sm text-purple-200">
              Style
            </label>

            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-purple-500/30 bg-black/60 p-4 text-white"
            >
              {styles.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <button
              onClick={generateAvatar}
              disabled={loading}
              className="mt-8 w-full rounded-2xl bg-purple-600 py-4 font-bold hover:bg-purple-500 disabled:opacity-60"
            >
              {loading ? "Generating..." : "Generate New Avatar"}
            </button>
          </section>

          <section className="rounded-[2rem] border border-purple-500/30 bg-black/40 p-6">
            <h2 className="text-2xl font-black text-purple-300">
              AI Generation Output
            </h2>

            <div className="mt-6 flex min-h-[560px] items-center justify-center rounded-[2rem] border border-purple-500/30 bg-gradient-to-br from-purple-950/60 to-black p-6 text-center">
              {loading && (
                <div>
                  <div className="mx-auto h-20 w-20 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
                  <h3 className="mt-6 text-3xl font-black">
                    Generating real AI avatar...
                  </h3>
                </div>
              )}

              {!loading && !generatedImage && (
                <div>
                  <div className="text-7xl">🐺</div>
                  <h3 className="mt-4 text-3xl font-black">
                    AI avatar appears here
                  </h3>
                  <p className="mt-2 text-purple-300">
                    Enter a prompt and press generate.
                  </p>
                </div>
              )}

              {!loading && generatedImage && (
                <div className="w-full">
                  <img
                    src={generatedImage}
                    alt="Generated VTuber Avatar"
                    className="mx-auto max-h-[520px] rounded-[2rem] object-contain shadow-[0_0_50px_rgba(168,85,247,0.4)]"
                  />

                  <h3 className="mt-6 text-3xl font-black">
                    {selectedSpecies} VTuber Generated
                  </h3>

                  <div className="mt-6 flex justify-center gap-4">
                    <button className="rounded-xl bg-purple-600 px-6 py-3 font-bold">
                      Save Avatar
                    </button>

                    <button
                      onClick={generateAvatar}
                      className="rounded-xl border border-purple-500/40 px-6 py-3 font-bold"
                    >
                      Regenerate
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}