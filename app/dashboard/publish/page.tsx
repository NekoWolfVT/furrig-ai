"use client";

import Link from "next/link";
import { useState } from "react";

export default function PublishPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("VTuber Avatar");
  const [description, setDescription] = useState("");

  return (
    <main className="min-h-screen bg-[#05000d] px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-purple-300 hover:text-purple-200">
          ← Back Home
        </Link>

        <h1 className="mt-6 text-6xl font-black">
          Publish to <span className="text-purple-500">World Library</span>
        </h1>

        <p className="mt-4 max-w-2xl text-xl text-purple-200">
          Share your avatars, Riggy companions, overlays, music videos, and
          projects with the FurRig community.
        </p>

        <section className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-3xl border border-purple-500/30 bg-black/50 p-8">
            <h2 className="text-3xl font-black">Project Details</h2>

            <div className="mt-6 space-y-5">
              <label className="block">
                <p className="mb-2 font-bold text-purple-200">Title</p>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="My gothic wolf VTuber"
                  className="w-full rounded-2xl border border-purple-500/30 bg-black/50 p-4 outline-none"
                />
              </label>

              <label className="block">
                <p className="mb-2 font-bold text-purple-200">Category</p>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-2xl border border-purple-500/30 bg-black/50 p-4 outline-none"
                >
                  <option>VTuber Avatar</option>
                  <option>Riggy Companion</option>
                  <option>OBS Overlay</option>
                  <option>Music Video</option>
                  <option>AI Movie</option>
                  <option>Fursona Design</option>
                </select>
              </label>

              <label className="block">
                <p className="mb-2 font-bold text-purple-200">Description</p>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your creation..."
                  className="h-40 w-full rounded-2xl border border-purple-500/30 bg-black/50 p-4 outline-none"
                />
              </label>

              <label className="block">
                <p className="mb-2 font-bold text-purple-200">Upload Preview</p>
                <input
                  type="file"
                  className="w-full rounded-2xl border border-purple-500/30 bg-black/50 p-4"
                />
              </label>
            </div>

            <button className="mt-8 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-xl font-black shadow-[0_0_25px_#ec4899]">
              Publish Project
            </button>
          </div>

          <div className="rounded-3xl border border-pink-500/40 bg-black/50 p-8 shadow-[0_0_40px_#ec489944]">
            <h2 className="text-3xl font-black text-pink-300">Preview Card</h2>

            <div className="mt-8 rounded-3xl border border-purple-500/30 bg-black/60 p-5">
              <div className="flex h-60 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-700 to-black text-8xl">
                ✨
              </div>

              <h3 className="mt-5 text-3xl font-black">
                {title || "Untitled Project"}
              </h3>

              <p className="mt-2 text-pink-300">{category}</p>

              <p className="mt-4 text-purple-100">
                {description || "Your project description will appear here."}
              </p>

              <p className="mt-5 text-pink-400">♥ 0 Hearts</p>
            </div>

            <div className="mt-6 space-y-3">
              <Link
                href="/library"
                className="block rounded-2xl bg-purple-600 px-6 py-4 text-center font-black hover:bg-purple-500"
              >
                View World Library
              </Link>

              <Link
                href="/projects"
                className="block rounded-2xl border border-purple-500 px-6 py-4 text-center font-black hover:bg-purple-950"
              >
                My Projects
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}