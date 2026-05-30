"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const { user, isLoaded, isSignedIn } = useUser();

  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [streamUrl, setStreamUrl] = useState("");
  const [platform, setPlatform] = useState("");
  const [level, setLevel] = useState(1);
  const [hearts, setHearts] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [membership, setMembership] = useState("Free");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState("");

  useEffect(() => {
    async function loadProfile() {
      if (!user?.id) return;

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (data) {
        setDisplayName(data.display_name || "");
        setBio(data.bio || "");
        setStreamUrl(data.stream_url || "");
        setPlatform(data.platform || "");
        setLevel(data.level || 1);
        setHearts(data.hearts || 0);
        setFollowers(data.followers || 0);
        setMembership(data.membership || "Free");
      }
    }

    loadProfile();
  }, [user?.id]);

  async function saveProfile() {
    if (!user?.id) return;

    setSaving(true);
    setSaved("");

    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      username: user.username || user.firstName || "creator",
      display_name: displayName,
      bio,
      avatar_url: user.imageUrl,
      banner_url: null,
      membership,
      role: "creator",
      stream_url: streamUrl,
      platform,
      updated_at: new Date().toISOString(),
    });

    setSaving(false);

    if (error) {
      setSaved("Could not save profile.");
      console.error(error);
      return;
    }

    setSaved("Profile saved!");
  }

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
        <Link href="/" className="mt-6 inline-block rounded-2xl bg-purple-600 px-6 py-3 font-bold">
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
                {displayName || user?.username || user?.firstName || "FurRig Creator"}
              </h1>
              <p className="mt-2 text-purple-200">{membership} Creator • Online</p>
            </div>
          </div>

          <div className="mb-4 flex items-center gap-4">
            <UserButton />

            <Link href="/dashboard/riggy-builder" className="rounded-2xl bg-pink-600 px-6 py-3 font-bold hover:bg-pink-500">
              My Riggy
            </Link>

            <Link href="/" className="rounded-2xl border border-purple-500 px-6 py-3 font-bold hover:bg-purple-950">
              Home
            </Link>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <section className="rounded-3xl border border-purple-500/30 bg-black/50 p-8">
            <h2 className="text-3xl font-black">Edit Profile</h2>

            <div className="mt-6 space-y-5">
              <Field label="Display Name" value={displayName} onChange={setDisplayName} placeholder="Your creator name" />
              <Field label="Bio" value={bio} onChange={setBio} placeholder="Tell people about your FurRig world" textarea />
              <Field label="Social Link" value={streamUrl} onChange={setStreamUrl} placeholder="Twitch / YouTube / TikTok / X" />
              <Field label="Platform" value={platform} onChange={setPlatform} placeholder="Twitch, YouTube, TikTok..." />
            </div>

            <button
              onClick={saveProfile}
              disabled={saving}
              className="mt-8 rounded-2xl bg-purple-600 px-8 py-4 text-xl font-black hover:bg-purple-500 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Profile"}
            </button>

            {saved && <p className="mt-4 text-pink-300">{saved}</p>}
          </section>

          <section className="space-y-6">
            <Card title="Creator Stats">
              <p>❤️ Hearts: {hearts}</p>
              <p>⭐ Level: {level}</p>
              <p>👥 Followers: {followers}</p>
              <p>🎬 Projects: 0</p>
            </Card>

            <Card title="Riggy Companion">
              <p className="text-purple-200">
                Customize your own animated AI companion using prompts.
              </p>

              <Link href="/dashboard/riggy-builder" className="mt-5 inline-block rounded-xl bg-pink-600 px-5 py-3 font-bold">
                Open Riggy Builder
              </Link>
            </Card>

            <Card title="Membership">
              <p className="text-purple-200">{membership} Plan</p>
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
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  textarea?: boolean;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <p className="mb-2 font-bold text-purple-200">{label}</p>

      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-32 w-full rounded-2xl border border-purple-500/30 bg-black/50 p-4 outline-none"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
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