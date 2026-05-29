"use client";

import Link from "next/link";
import { useUser, SignOutButton } from "@clerk/nextjs";

export default function ProfilePage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-[#05000d] p-10 text-white">
        Loading profile...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#05000d] text-white">
      <div className="h-72 bg-gradient-to-r from-purple-700 via-fuchsia-600 to-pink-600" />

      <section className="mx-auto max-w-6xl px-6">
        <div className="-mt-24 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex items-end gap-6">
            <img
              src={user?.imageUrl || "/favicon.ico"}
              alt="Profile avatar"
              className="h-40 w-40 rounded-full border-8 border-[#05000d] bg-purple-950 object-cover"
            />

            <div className="mb-4">
              <h1 className="text-5xl font-black">
                {user?.username || user?.firstName || "FurRig Creator"}
              </h1>
              <p className="mt-2 text-purple-200">👑 Creator • Online</p>
            </div>
          </div>

          <div className="mb-4 flex gap-3">
            <Link
              href="/dashboard/profile"
              className="rounded-2xl bg-purple-600 px-6 py-3 font-bold hover:bg-purple-500"
            >
              Edit Profile
            </Link>

            <SignOutButton>
              <button className="rounded-2xl border border-purple-500 px-6 py-3 font-bold hover:bg-purple-950">
                Sign Out
              </button>
            </SignOutButton>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <section className="rounded-3xl border border-purple-500/30 bg-black/50 p-8">
            <h2 className="text-3xl font-black">Bio</h2>
            <p className="mt-4 text-xl text-purple-100">
              VTuber creator, gamer, and FurRig AI user.
            </p>
          </section>

          <section className="rounded-3xl border border-purple-500/30 bg-black/50 p-8">
            <h2 className="text-3xl font-black">Creator Stats</h2>

            <div className="mt-6 space-y-4 text-purple-100">
              <p>❤️ Hearts: 0</p>
              <p>⭐ Level: 1</p>
              <p>🐺 Avatars: 0</p>
              <p>🎬 Projects: 0</p>
            </div>
          </section>

          <section className="rounded-3xl border border-purple-500/30 bg-black/50 p-8">
            <h2 className="text-3xl font-black">Stream Links</h2>
            <p className="mt-4 text-purple-200">
              No streaming links added yet.
            </p>
          </section>

          <section className="rounded-3xl border border-yellow-500/30 bg-yellow-950/20 p-8">
            <h2 className="text-3xl font-black text-yellow-300">
              Moderation Notice
            </h2>
            <p className="mt-4 text-yellow-100">
              Avatar and banner changes may require admin approval before
              appearing publicly.
            </p>
          </section>
        </div>

        <div className="mt-12 flex gap-4 pb-20">
          <Link
            href="/"
            className="rounded-2xl border border-purple-500 px-6 py-3 font-bold hover:bg-purple-950"
          >
            ← Home
          </Link>

          <Link
            href="/studio"
            className="rounded-2xl bg-purple-600 px-6 py-3 font-bold hover:bg-purple-500"
          >
            Open Studio
          </Link>
        </div>
      </section>
    </main>
  );
}