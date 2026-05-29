"use client";

import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";

export default function ProfilePage() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-[#05000d] p-10 text-white">
        Loading profile...
      </main>
    );
  }

  if (!isSignedIn) {
    return (
      <main className="min-h-screen bg-[#05000d] p-10 text-white">
        <h1 className="text-5xl font-black">Please sign in</h1>
        <Link
          href="/"
          className="mt-6 inline-block rounded-2xl bg-purple-600 px-6 py-3 font-bold"
        >
          Back Home
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#05000d] text-white">
      <section className="h-72 bg-gradient-to-r from-purple-800 via-pink-700 to-purple-950" />

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="-mt-20 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex items-end gap-6">
            <img
              src={user?.imageUrl}
              alt="Profile"
              className="h-40 w-40 rounded-full border-8 border-[#05000d] object-cover shadow-[0_0_40px_#7c3aed]"
            />

            <div className="mb-4">
              <h1 className="text-5xl font-black">
                {user?.username || user?.firstName || "FurRig Creator"}
              </h1>
              <p className="mt-2 text-purple-200">Creator • Online</p>
            </div>
          </div>

          <div className="mb-4 flex items-center gap-4">
            <UserButton />

            <Link
              href="/dashboard/riggy-builder"
              className="rounded-2xl bg-pink-600 px-6 py-3 font-bold hover:bg-pink-500"
            >
              My Riggy
            </Link>

            <Link
              href="/"
              className="rounded-2xl border border-purple-500 px-6 py-3 font-bold hover:bg-purple-950"
            >
              Home
            </Link>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <section className="rounded-3xl border border-purple-500/30 bg-black/50 p-8">
            <h2 className="text-3xl font-black">Edit Profile</h2>

            <div className="mt-6 space-y-5">
              <Field label="Display Name" placeholder="Your creator name" />
              <Field label="Bio" placeholder="Tell people about your FurRig world" textarea />
              <Field label="Favourite Avatar Species" placeholder="Wolf, bunny, fox, dragon..." />
              <Field label="Social Link" placeholder="Twitch / YouTube / TikTok / X" />
            </div>

            <button className="mt-8 rounded-2xl bg-purple-600 px-8 py-4 text-xl font-black hover:bg-purple-500">
              Save Profile
            </button>
          </section>

          <section className="space-y-6">
            <Card title="Creator Stats">
              <p>❤️ Hearts: 0</p>
              <p>⭐ Level: 1</p>
              <p>🐺 Avatars: 0</p>
              <p>🎬 Projects: 0</p>
            </Card>

            <Card title="Riggy Companion">
              <p className="text-purple-200">
                Customize your own animated AI companion using prompts.
              </p>

              <Link
                href="/dashboard/riggy-builder"
                className="mt-5 inline-block rounded-xl bg-pink-600 px-5 py-3 font-bold"
              >
                Open Riggy Builder
              </Link>
            </Card>

            <Card title="Membership">
              <p className="text-purple-200">
                Free Plan • Upgrade options coming soon.
              </p>
            </Card>
          </section>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  placeholder,
  textarea,
}: {
  label: string;
  placeholder: string;
  textarea?: boolean;
}) {
  return (
    <label className="block">
      <p className="mb-2 font-bold text-purple-200">{label}</p>

      {textarea ? (
        <textarea
          placeholder={placeholder}
          className="h-32 w-full rounded-2xl border border-purple-500/30 bg-black/50 p-4 outline-none"
        />
      ) : (
        <input
          placeholder={placeholder}
          className="w-full rounded-2xl border border-purple-500/30 bg-black/50 p-4 outline-none"
        />
      )}
    </label>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-purple-500/30 bg-black/50 p-6">
      <h2 className="text-2xl font-black text-purple-300">{title}</h2>
      <div className="mt-4 space-y-2 text-purple-100">{children}</div>
    </div>
  );
}