"use client";

import { useEffect, useRef, useState } from "react";

import {
  Pencil,
  Settings,
  Link as LinkIcon,
} from "lucide-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);

  const [editing, setEditing] =
    useState(false);

  const [bio, setBio] = useState("");

  const [streamUrl, setStreamUrl] =
    useState("");

  const [avatarPreview, setAvatarPreview] =
    useState("");

  const [bannerPreview, setBannerPreview] =
    useState("");

  const [avatarFile, setAvatarFile] =
    useState<File | null>(null);

  const [bannerFile, setBannerFile] =
    useState<File | null>(null);

  const avatarInputRef =
    useRef<HTMLInputElement>(null);

  const bannerInputRef =
    useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function loadProfile() {
      const res = await fetch("/api/profile");

      const data = await res.json();

      setProfile(data);

      setBio(data.bio || "");

      setStreamUrl(
        data.stream_url || ""
      );

      setAvatarPreview(
        data.avatar_url || ""
      );

      setBannerPreview(
        data.banner_url || ""
      );
    }

    loadProfile();
  }, []);

  function detectPlatform(url: string) {
    const lower = url.toLowerCase();

    if (lower.includes("twitch"))
      return {
        name: "Twitch",
        color: "text-purple-400",
        icon: <LinkIcon size={24} />,
      };

    if (lower.includes("youtube"))
      return {
        name: "YouTube",
        color: "text-red-500",
        icon: <LinkIcon size={24} />,
      };

    if (lower.includes("kick"))
      return {
        name: "Kick",
        color: "text-green-400",
        icon: <LinkIcon size={24} />,
      };

    if (lower.includes("tiktok"))
      return {
        name: "TikTok",
        color: "text-pink-400",
        icon: <LinkIcon size={24} />,
      };

    if (lower.includes("linktr"))
      return {
        name: "Linktree",
        color: "text-green-300",
        icon: <LinkIcon size={24} />,
      };

    return {
      name: "Website",
      color: "text-blue-400",
      icon: <LinkIcon size={24} />,
    };
  }

  function chooseAvatar(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setAvatarFile(file);

    setAvatarPreview(
      URL.createObjectURL(file)
    );
  }

  function chooseBanner(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setBannerFile(file);

    setBannerPreview(
      URL.createObjectURL(file)
    );
  }

  async function uploadToStorage(
    file: File,
    type: "avatar" | "banner"
  ) {
    const formData = new FormData();

    formData.append("file", file);

    formData.append("type", type);

    const res = await fetch(
      "/api/upload-profile-file",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    return data.url;
  }

  async function saveProfile() {
    await fetch("/api/profile", {
      method: "PATCH",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        bio,
        stream_url: streamUrl,
      }),
    });

    if (avatarFile) {
      const avatarUrl =
        await uploadToStorage(
          avatarFile,
          "avatar"
        );

      await fetch(
        "/api/profile-upload",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            imageUrl: avatarUrl,
            type: "Avatar",
          }),
        }
      );
    }

    if (bannerFile) {
      const bannerUrl =
        await uploadToStorage(
          bannerFile,
          "banner"
        );

      await fetch(
        "/api/profile-upload",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            imageUrl: bannerUrl,
            type: "Banner",
          }),
        }
      );
    }

    alert(
      "Profile updated and sent for approval!"
    );

    setEditing(false);
  }

  const platform =
    detectPlatform(streamUrl);

  return (
    <main className="min-h-screen bg-[#05000d] text-white">
      <input
        ref={avatarInputRef}
        hidden
        type="file"
        accept="image/*"
        onChange={chooseAvatar}
      />

      <input
        ref={bannerInputRef}
        hidden
        type="file"
        accept="image/*"
        onChange={chooseBanner}
      />

      <div className="relative">
        <div
          className="h-[350px] bg-cover bg-center"
          style={{
            backgroundImage:
              bannerPreview
                ? `url(${bannerPreview})`
                : "linear-gradient(to right,#7b00ff,#ff0088)",
          }}
        >
          {editing && (
            <button
              onClick={() =>
                bannerInputRef.current?.click()
              }
              className="absolute right-8 top-8 rounded-full bg-black/70 p-4"
            >
              <Pencil size={28} />
            </button>
          )}
        </div>

        <div className="mx-auto max-w-7xl px-8">
          <div className="-mt-24 flex flex-col gap-6 lg:flex-row lg:items-end">
            <div className="relative">
              <div
                className="h-48 w-48 rounded-full border-8 border-[#05000d] bg-cover bg-center"
                style={{
                  backgroundImage:
                    avatarPreview
                      ? `url(${avatarPreview})`
                      : "",

                  backgroundColor:
                    "#4c007d",
                }}
              />

              {editing && (
                <button
                  onClick={() =>
                    avatarInputRef.current?.click()
                  }
                  className="absolute bottom-2 right-2 rounded-full bg-black/80 p-3"
                >
                  <Pencil size={22} />
                </button>
              )}
            </div>

            <div className="pb-6">
              <h1 className="text-6xl font-black">
                {profile?.username ||
                  "Creator"}
              </h1>

              <p className="mt-2 text-2xl text-purple-300">
                👑 Creator
              </p>
            </div>

            <div className="ml-auto flex gap-4 pb-6">
              <a
                href="/dashboard/settings"
                className="rounded-2xl border border-purple-500/30 bg-black/40 p-4"
              >
                <Settings size={28} />
              </a>

              <button
                onClick={() =>
                  editing
                    ? saveProfile()
                    : setEditing(true)
                }
                className="rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-500 px-8 py-4 text-xl font-black"
              >
                {editing
                  ? "Save Profile"
                  : "Edit Profile"}
              </button>
            </div>
          </div>

          <div className="mt-12 max-w-4xl">
            <div className="rounded-[2rem] border border-purple-500/30 bg-black/40 p-8">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black">
                  Bio
                </h2>

                {editing && (
                  <Pencil
                    size={22}
                    className="text-purple-300"
                  />
                )}
              </div>

              {editing ? (
                <>
                  <textarea
                    maxLength={500}
                    value={bio}
                    onChange={(e) =>
                      setBio(e.target.value)
                    }
                    className="mt-6 h-48 w-full rounded-2xl border border-purple-500/30 bg-black p-5 text-xl"
                  />

                  <p className="mt-3 text-right text-purple-300">
                    {bio.length}/500
                  </p>
                </>
              ) : (
                <p className="mt-6 text-2xl text-purple-100">
                  {bio ||
                    "No bio added yet."}
                </p>
              )}
            </div>

            <div className="mt-8 rounded-[2rem] border border-purple-500/30 bg-black/40 p-8">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black">
                  Stream Links
                </h2>

                {editing && (
                  <Pencil
                    size={22}
                    className="text-purple-300"
                  />
                )}
              </div>

              {editing ? (
                <input
                  value={streamUrl}
                  onChange={(e) =>
                    setStreamUrl(
                      e.target.value
                    )
                  }
                  placeholder="Paste Twitch, Kick, YouTube, TikTok, or Linktree..."
                  className="mt-6 w-full rounded-2xl border border-purple-500/30 bg-black p-5 text-xl"
                />
              ) : streamUrl ? (
                <a
                  href={streamUrl}
                  target="_blank"
                  className={`mt-6 flex items-center gap-3 text-3xl font-black ${platform.color}`}
                >
                  {platform.icon}

                  {platform.name}
                </a>
              ) : (
                <p className="mt-6 text-xl text-gray-400">
                  No streaming links added.
                </p>
              )}
            </div>

            <div className="mt-8 rounded-[2rem] border border-yellow-500/30 bg-yellow-500/10 p-6 text-xl text-yellow-200">
              ⚠ Avatar and banner changes
              require admin approval before
              appearing publicly.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}