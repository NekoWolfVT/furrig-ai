"use client";

import Link from "next/link";
import { useState } from "react";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import RiggyAssistant from "@/components/RiggyAssistant";

export default function HomePage() {
  const { isSignedIn } = useUser();
  const [riggyOpen, setRiggyOpen] = useState(false);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05000d] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#4b008855,transparent_45%)]" />

      <section className="relative grid min-h-screen grid-cols-1 gap-6 p-6 lg:grid-cols-[1.1fr_1.3fr_1fr]">
        <div className="z-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex h-20 w-20 items-center justify-center rounded-3xl border border-purple-400 bg-purple-950 shadow-[0_0_30px_#a855f7]"
              >
                🐺
              </Link>

              <div>
                <h1 className="text-5xl font-black">
                  FurRig <span className="text-purple-500">AI</span>
                </h1>
                <p className="text-lg text-purple-200">
                  Create Without Limits.
                </p>
              </div>
            </div>

            <div className="mt-14">
              <h2 className="text-5xl font-black leading-tight">
                Welcome to
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-purple-700 bg-clip-text text-8xl text-transparent">
                  FurRig AI
                </span>
              </h2>

              <p className="mt-8 max-w-xl text-2xl leading-relaxed text-purple-100">
                The all-in-one creative platform for VTubers, artists,
                musicians, and storytellers.
              </p>

              <p className="mt-6 text-3xl font-black">
                No credits. No limits.
                <br />
                <span className="italic text-purple-500">
                  Just pure imagination.
                </span>
              </p>
            </div>

            <div id="features" className="mt-8 grid grid-cols-2 gap-3">
              <Feature href="/studio" icon="🪄" title="Create Anything" text="VTubers, videos, music, avatars, and more." />
              <Feature href="/library" icon="🌐" title="World Library" text="Publish your work and explore the community." />
              <Feature href="/messages" icon="👥" title="Connect" text="Add friends, chat, and collaborate." />
              <Feature href="/profile" icon="⭐" title="Level Up" text="Earn hearts, level up, unlock more." />
              <Feature href="/studio" icon="🤖" title="AI Tools" text="Powerful AI tools built for creators." />
              <Feature href="/events" icon="📅" title="Events" text="Join events and creative contests." />
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {!isSignedIn ? (
              <>
                <SignUpButton mode="modal">
                  <button className="w-full rounded-3xl bg-gradient-to-r from-purple-700 to-purple-500 py-5 text-2xl font-black shadow-[0_0_25px_#7c3aed]">
                    Get Started →
                  </button>
                </SignUpButton>

                <SignInButton mode="modal">
                  <button className="w-full rounded-2xl border border-purple-500/60 bg-black/40 py-4 text-xl font-bold">
                    Login
                  </button>
                </SignInButton>

                <Link href="#features" className="block text-center text-lg text-purple-200">
                  Explore as Guest
                </Link>
              </>
            ) : (
              <>
                <Link href="/dashboard" className="block w-full rounded-3xl bg-gradient-to-r from-purple-700 to-purple-500 py-5 text-center text-2xl font-black shadow-[0_0_25px_#7c3aed]">
                  Open Dashboard →
                </Link>

                <Link href="/profile" className="block w-full rounded-2xl border border-purple-500/60 bg-black/40 py-4 text-center text-xl font-bold">
                  Edit Profile
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="relative z-10 hidden items-center justify-center lg:flex">
          <div className="absolute top-24 flex gap-8">
            <TopNav href="/" icon="🏠" title="Home" active />
            <TopNav href="/studio" icon="🎮" title="Studio" />
            <TopNav href="/projects" icon="📁" title="Projects" />
            <TopNav href="/library" icon="🌐" title="World Library" />
            <TopNav href="/events" icon="📅" title="Events" />
            <TopNav href="/messages" icon="✉️" title="Messages" />
          </div>

          <div className="absolute left-0 top-44 space-y-4">
            <CreateCard href="/dashboard/avatar" title="VTuber Model" button="Create" />
            <CreateCard href="/studio" title="Music Video" button="Create" />
            <CreateCard href="/studio" title="AI Movie" button="Create" />
          </div>

          <div className="relative mt-20 flex h-[760px] w-[520px] items-center justify-center rounded-[3rem] border border-purple-500/30 bg-gradient-to-b from-purple-950/40 to-black/20 shadow-[0_0_80px_#7c3aed66]">
            <div className="text-center">
              <div className="mx-auto flex h-64 w-64 items-center justify-center rounded-full border border-purple-400 bg-purple-900/40 text-9xl shadow-[0_0_70px_#a855f7]">
                🐺
              </div>

              <h2 className="mt-10 text-5xl font-black">Your Avatar Here</h2>
              <p className="mt-4 text-purple-200">
                Add your FurRig character art later.
              </p>
            </div>
          </div>
        </div>

        <div className="z-10 space-y-4">
          <div className="flex justify-end">
            {isSignedIn ? (
              <div className="flex items-center gap-4 rounded-3xl border border-purple-500/30 bg-black/40 px-5 py-3">
                <UserButton />
                <Link href="/profile">
                  <p className="font-bold">Profile</p>
                  <p className="text-sm text-green-400">● Online</p>
                </Link>
              </div>
            ) : (
              <SignInButton mode="modal">
                <button className="rounded-2xl border border-purple-500 px-6 py-3 font-bold">
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>

          <Panel href="/library" title="World Library" action="View All">
            <div className="grid grid-cols-5 gap-3">
              {["Luna", "Crystal", "Miyu", "Shadow", "Aurora"].map((name) => (
                <Link href="/library" key={name} className="text-center">
                  <div className="h-24 rounded-2xl bg-gradient-to-br from-purple-700 to-black shadow-[0_0_20px_#7c3aed55]" />
                  <p className="mt-2 text-xs">{name}</p>
                  <p className="text-xs text-pink-400">♥ 18K</p>
                </Link>
              ))}
            </div>
          </Panel>

          <Panel href="/events" title="Monthly Contest" action="View All">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200">Create. Share. Win.</p>
                <h3 className="mt-3 text-xl font-black">
                  1 Month Enterprise Membership
                </h3>
                <Link href="/events" className="mt-5 inline-block rounded-xl bg-purple-600 px-8 py-3 font-bold">
                  Join Now
                </Link>
              </div>
              <div className="text-8xl">🏆</div>
            </div>
          </Panel>

          <Panel href="/messages" title="Global Chat" action="1,248 Online">
            <div className="space-y-3">
              <Chat name="CyberKitten" text="That new MV is amazing! 💜" />
              <Chat name="NekoWolf" text="Glad you like it! ✨" />
              <Chat name="RavenDex" text="The vibe is unreal 🔥" />
              <Chat name="Hoshimi" text="How did you make that scene? 😮" />
            </div>

            <div className="mt-4 flex gap-2">
              <input
                placeholder="Type a message..."
                className="flex-1 rounded-xl border border-purple-500/30 bg-black/40 px-4 py-3 outline-none"
              />
              <Link href="/messages" className="rounded-xl bg-purple-700 px-5 py-3">
                ➤
              </Link>
            </div>
          </Panel>

          <div className="rounded-3xl border border-pink-500/50 bg-black/60 p-6 shadow-[0_0_40px_#ec4899]">
            <div className="flex items-center gap-5">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-700 text-5xl shadow-[0_0_30px_#ec4899]">
                🐰
              </div>

              <div className="flex-1">
                <h3 className="text-3xl font-black text-pink-300">
                  Riggy AI Helper
                </h3>

                <p className="mt-2 text-purple-100">
                  Need help creating VTubers, avatars, music videos, movies,
                  lore, prompts or artwork?
                </p>

                <p className="mt-1 text-pink-300">
                  Ask Riggy anything ✨
                </p>
              </div>

              <button
                onClick={() => setRiggyOpen(true)}
                className="rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-xl font-black shadow-[0_0_25px_#ec4899]"
              >
                Open Riggy
              </button>
            </div>
          </div>
        </div>
      </section>

      {riggyOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70 p-4">
          <div className="relative max-h-[90vh] overflow-auto rounded-3xl">
            <button
              onClick={() => setRiggyOpen(false)}
              className="absolute right-6 top-6 z-[10001] rounded-full bg-pink-600 px-4 py-2 font-black"
            >
              X
            </button>
            <RiggyAssistant />
          </div>
        </div>
      )}
    </main>
  );
}

function Feature({ href, icon, title, text }: { href: string; icon: string; title: string; text: string }) {
  return (
    <Link href={href} className="rounded-2xl border border-purple-500/20 bg-black/40 p-4 text-center shadow-[0_0_25px_#7c3aed33] hover:bg-purple-950/40">
      <div className="text-4xl">{icon}</div>
      <h3 className="mt-3 font-black">{title}</h3>
      <p className="mt-2 text-sm text-purple-200">{text}</p>
    </Link>
  );
}

function TopNav({ href, icon, title, active }: { href: string; icon: string; title: string; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`rounded-2xl px-5 py-3 text-center hover:bg-purple-950/40 ${
        active ? "border border-purple-500 bg-purple-900/60 shadow-[0_0_25px_#7c3aed]" : ""
      }`}
    >
      <div className="text-2xl">{icon}</div>
      <p className="text-sm">{title}</p>
    </Link>
  );
}

function CreateCard({ href, title, button }: { href: string; title: string; button: string }) {
  return (
    <Link href={href} className="block w-72 rounded-2xl border border-purple-500/40 bg-black/50 p-4 shadow-[0_0_30px_#7c3aed44] hover:bg-purple-950/40">
      <div className="mb-3 flex justify-between">
        <h3 className="font-bold">{title}</h3>
        <span>⋮</span>
      </div>

      <div className="flex h-36 items-center justify-center rounded-xl bg-gradient-to-br from-purple-700 to-black text-5xl">
        ▶
      </div>

      <div className="mt-3 w-full rounded-xl bg-purple-600 py-2 text-center font-bold">
        {button}
      </div>
    </Link>
  );
}

function Panel({ href, title, action, children }: { href: string; title: string; action: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-purple-500/40 bg-black/50 p-5 shadow-[0_0_40px_#7c3aed33]">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-black">{title}</h2>
        <Link href={href} className="text-purple-300 hover:text-purple-100">
          {action}
        </Link>
      </div>
      {children}
    </div>
  );
}

function Chat({ name, text }: { name: string; text: string }) {
  return (
    <Link href="/messages" className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-purple-700" />
      <div>
        <p className="font-bold">{name}</p>
        <p className="text-sm text-purple-200">{text}</p>
      </div>
    </Link>
  );
}