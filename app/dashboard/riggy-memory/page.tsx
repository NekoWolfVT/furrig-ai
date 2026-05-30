"use client";

import Link from "next/link";
import { useState } from "react";

const starterMemories = [
  {
    name: "CyberKitten",
    memory: "Likes neon cat VTubers and music videos.",
  },
  {
    name: "NovaWolf",
    memory: "Working on a wolf avatar and OBS pet.",
  },
  {
    name: "CrystalDragon",
    memory: "Interested in dragon characters and fantasy lore.",
  },
];

export default function RiggyMemoryPage() {
  const [memories, setMemories] = useState(starterMemories);

  return (
    <main className="min-h-screen bg-[#05000d] px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-purple-300 hover:text-purple-200">
          ← Back Home
        </Link>

        <h1 className="mt-6 text-6xl font-black">
          Riggy <span className="text-pink-400">Memory</span>
        </h1>

        <p className="mt-4 max-w-2xl text-xl text-purple-200">
          Riggy can remember safe creative details about viewers and creators,
          like avatar species, projects, nicknames, and interests.
        </p>

        <section className="mt-10 rounded-3xl border border-pink-500/40 bg-black/50 p-8 shadow-[0_0_40px_#ec489944]">
          <h2 className="text-3xl font-black text-pink-300">
            Viewer Memories
          </h2>

          <div className="mt-6 space-y-4">
            {memories.map((item) => (
              <div
                key={item.name}
                className="rounded-2xl border border-purple-500/30 bg-black/50 p-5"
              >
                <h3 className="text-2xl font-black">{item.name}</h3>
                <p className="mt-2 text-purple-200">{item.memory}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-purple-500/30 bg-black/50 p-8">
          <h2 className="text-3xl font-black">Add Test Memory</h2>

          <button
            onClick={() =>
              setMemories([
                ...memories,
                {
                  name: "NewViewer",
                  memory: "Likes cute bunny companions and FurRig AI.",
                },
              ])
            }
            className="mt-6 rounded-2xl bg-purple-600 px-8 py-4 text-xl font-black hover:bg-purple-500"
          >
            Add Memory
          </button>
        </section>

        <div className="mt-10 flex gap-4">
          <Link
            href="/dashboard/riggy-builder"
            className="rounded-2xl bg-pink-600 px-6 py-3 font-bold hover:bg-pink-500"
          >
            Riggy Builder
          </Link>

          <Link
            href="/studio"
            className="rounded-2xl border border-purple-500 px-6 py-3 font-bold hover:bg-purple-950"
          >
            Studio
          </Link>
        </div>
      </div>
    </main>
  );
}