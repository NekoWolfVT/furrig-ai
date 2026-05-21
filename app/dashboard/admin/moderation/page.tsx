"use client";

import { useEffect, useState } from "react";

type Upload = {
  id: string;
  username: string;
  type: string;
  image_url: string;
  status: string;
};

export default function ModerationPage() {
  const [uploads, setUploads] = useState<Upload[]>([]);

  async function loadUploads() {
    const res = await fetch("/api/moderation");
    const data = await res.json();

    console.log(data);

    setUploads(data);
  }

  async function updateStatus(
    id: string,
    status: "approved" | "rejected"
  ) {
    await fetch("/api/moderation", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        status,
      }),
    });

    loadUploads();
  }

  useEffect(() => {
    loadUploads();
  }, []);

  return (
    <main className="min-h-screen bg-[#05000d] p-8 text-white">
      <a
        href="/dashboard"
        className="text-purple-300"
      >
        ← Back to Dashboard
      </a>

      <h1 className="mt-6 text-6xl font-black">
        Admin{" "}
        <span className="text-purple-400">
          Moderation
        </span>
      </h1>

      <p className="mt-3 text-xl text-purple-200">
        Review profile pictures and banners
        before they appear publicly.
      </p>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {uploads.map((upload) => (
          <div
            key={upload.id}
            className="rounded-[2rem] border border-purple-500/30 bg-black/40 p-6"
          >
            <img
              src={upload.image_url}
              alt={upload.type}
              className="h-72 w-full rounded-2xl object-cover"
            />

            <h2 className="mt-6 text-3xl font-black">
              {upload.username}
            </h2>

            <p className="mt-2 text-xl text-purple-300">
              {upload.type}
            </p>

            <p className="mt-4 text-2xl font-bold text-yellow-400">
              Status: {upload.status}
            </p>

            {upload.status === "pending" && (
              <div className="mt-6 flex gap-4">
                <button
                  onClick={() =>
                    updateStatus(
                      upload.id,
                      "approved"
                    )
                  }
                  className="flex-1 rounded-xl bg-green-600 py-4 text-xl font-black"
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      upload.id,
                      "rejected"
                    )
                  }
                  className="flex-1 rounded-xl bg-red-600 py-4 text-xl font-black"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}