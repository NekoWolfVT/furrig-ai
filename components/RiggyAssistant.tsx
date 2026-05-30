"use client";

import { useState } from "react";

export default function RiggyAssistant() {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("Hi hi!! I’m Riggy 💜 Ask me to help edit, improve, or create something!");

  async function askRiggy() {
    if (!prompt.trim()) return;

    setReply("Riggy is thinking... ✨");

    const res = await fetch("/api/riggy/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "Creator",
        message: prompt,
      }),
    });

    const data = await res.json();
    setReply(data.reply);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full border border-pink-400 bg-black/80 px-5 py-4 text-white shadow-[0_0_30px_rgba(255,0,200,0.8)]"
      >
        <img
          src="/pets/riggy_idle.png"
          alt="Riggy"
          className="h-12 w-12 object-contain"
        />
        Ask Riggy
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
          <div className="w-full max-w-2xl rounded-[2rem] border border-pink-500 bg-[#080010] p-6 text-white shadow-[0_0_40px_rgba(255,0,200,0.7)]">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black text-pink-300">
                Riggy AI Helper
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="rounded-full bg-pink-600 px-4 py-2 font-bold"
              >
                X
              </button>
            </div>

            <div className="mt-6 flex gap-4">
              <img
                src="/pets/riggy_happy.png"
                alt="Riggy"
                className="h-24 w-24 object-contain"
              />

              <div className="flex-1 rounded-2xl border border-pink-400 bg-black p-4">
                {reply}
              </div>
            </div>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask Riggy to edit your bio, improve a prompt, make a VTuber idea, write stream text..."
              className="mt-6 h-36 w-full rounded-2xl border border-purple-500 bg-black p-4 text-white"
            />

            <button
              onClick={askRiggy}
              className="mt-4 w-full rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 py-4 text-xl font-black"
            >
              Ask Riggy ✨
            </button>
          </div>
        </div>
      )}
    </>
  );
}