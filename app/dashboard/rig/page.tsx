"use client";

import { useState } from "react";

export default function RigPage() {
  const [rigType, setRigType] = useState("vtubestudio");
  const [preview, setPreview] = useState("");
  const [fileName, setFileName] = useState("");

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setPreview(URL.createObjectURL(file));
  }

  const layers =
    rigType === "pngtuber"
      ? ["Idle PNG", "Talking PNG"]
      : rigType === "pngtuberplus"
      ? ["Idle", "Talk", "Happy", "Sad", "Sleep", "Blink"]
      : [
          "Body",
          "Head",
          "Eyes Open",
          "Eyes Closed",
          "Mouth Open",
          "Mouth Closed",
          "Hair Front",
          "Hair Back",
          "Accessories",
        ];

  return (
    <main className="min-h-screen bg-black p-8 text-white">
      <h1 className="text-5xl font-black">
        FurRig Avatar Rigger
      </h1>

      <p className="mt-3 text-purple-300">
        Upload an avatar and prepare it for PNGTuber,
        Live2D, or VTube Studio.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[420px_1fr]">
        <section className="rounded-3xl bg-zinc-900 p-6">
          <label className="block font-bold">
            Upload Avatar
          </label>

          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleFile}
            className="mt-3 w-full"
          />

          {fileName && (
            <p className="mt-3 text-sm text-purple-300">
              {fileName}
            </p>
          )}

          <label className="mt-8 block font-bold">
            Rig Type
          </label>

          <select
            value={rigType}
            onChange={(e) => setRigType(e.target.value)}
            className="mt-3 w-full rounded-xl bg-black p-4"
          >
            <option value="pngtuber">PNGTuber Basic</option>
            <option value="pngtuberplus">
              PNGTuber Advanced
            </option>
            <option value="live2d">Live2D Prep</option>
            <option value="vtubestudio">
              VTube Studio Prep
            </option>
          </select>

          <div className="mt-8 rounded-2xl bg-black p-5">
            <h2 className="text-2xl font-black">
              Rig Readiness
            </h2>

            <p className="mt-3 text-4xl font-black text-purple-400">
              {preview ? "80%" : "0%"}
            </p>

            <p className="mt-2 text-sm text-zinc-400">
              {preview
                ? "Avatar detected. Ready for rig prep."
                : "Upload an avatar to start analysis."}
            </p>
          </div>
        </section>

        <section className="rounded-3xl bg-zinc-900 p-6">
          <h2 className="text-3xl font-black">
            Avatar Preview
          </h2>

          <div className="mt-6 flex min-h-[360px] items-center justify-center rounded-3xl bg-black">
            {preview ? (
              <img
                src={preview}
                alt="Avatar preview"
                className="max-h-[340px] object-contain"
              />
            ) : (
              <p className="text-zinc-500">
                No avatar uploaded yet.
              </p>
            )}
          </div>
        </section>
      </div>

      <section className="mt-8 rounded-3xl bg-zinc-900 p-6">
        <h2 className="text-3xl font-black">
          Required Layers
        </h2>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {layers.map((layer, index) => (
            <div
              key={layer}
              className="rounded-xl border border-purple-500/30 bg-black p-4"
            >
              <span className="text-purple-400">
                {preview && index < Math.floor(layers.length * 0.7)
                  ? "✓"
                  : "☐"}
              </span>{" "}
              {layer}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-3xl bg-zinc-900 p-6">
        <h2 className="text-3xl font-black">
          Export Options
        </h2>

        <div className="mt-5 flex flex-wrap gap-4">
          <button className="rounded-xl bg-purple-600 px-6 py-4 font-black">
            Export PNGTuber Pack
          </button>

          <button className="rounded-xl bg-purple-600 px-6 py-4 font-black">
            Export Live2D Prep
          </button>

          <button className="rounded-xl bg-purple-600 px-6 py-4 font-black">
            Export VTube Studio Prep
          </button>
        </div>
      </section>
    </main>
  );
}