"use client";

import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

export default function HomePage() {
  const { isSignedIn } = useUser();

  return (
    <main className="min-h-screen overflow-hidden bg-[#05000d] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#4b008855,transparent_45%)]" />

      <section className="relative grid min-h-screen grid-cols-1 gap-6 p-6 lg:grid-cols-[1.1fr_1.3fr_1fr]">
        {/* LEFT */}
        <div className="z-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-purple-400 bg-purple-950 shadow-[0_0_30px_#a855f7]">
                🐺
              </div>

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

            <div className="mt-8 grid grid-cols-2 gap-3">
              <Feature icon="🪄" title="Create Anything" text="VTubers, videos, music, avatars, and more." />
              <Feature icon="🌐" title="World Library" text="Publish your work and explore the community." />
              <Feature icon="👥" title="Connect" text="Add friends, chat, and collaborate." />
              <Feature icon="⭐" title="Level Up" text="Earn hearts, level up, unlock more." />
              <Feature icon="🤖" title="AI Tools" text="Powerful AI tools built for creators." />
              <Feature icon="📅" title="Events" text="Join events and creative contests." />
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

                <Link
                  href="#features"
                  className="block text-center text-lg text-purple-200"
                >
                  Explore as Guest
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className="block w-full rounded-3xl bg-gradient-to-r from-purple-700 to-purple-500 py-5 text-center text-2xl font-black shadow-[0_0_25px_#7c3aed]"
                >
                  Open Dashboard →
                </Link>

                <Link
                  href="/dashboard/profile"
                  className="block w-full rounded-2xl border border-purple-500/60 bg-black/40 py-4 text-center text-xl font-bold"
                >
                  Edit Profile
                </Link>
              </>
            )}
          </div>
        </div>

        {/* CENTER */}
        <div className="relative z-10 hidden items-center justify-center lg:flex">
          <div className="absolute top-24 flex gap-8">
            <TopNav icon="🏠" title="Home" active />
            <TopNav icon="🎮" title="Studio" />
            <TopNav icon="📁" title="Projects" />
            <TopNav icon="🌐" title="World Library" />
            <TopNav icon="📅" title="Events" />
            <TopNav icon="✉️" title="Messages" />
          </div>

          <div className="absolute left-0 top-44 space-y-4">
            <CreateCard title="VTuber Model" button="Create" />
            <CreateCard title="Music Video" button="Create" />
            <CreateCard title="AI Movie" button="Create" />
          </div>

          <div className="relative mt-20 flex h-[760px] w-[520px] items-center justify-center rounded-[3rem] border border-purple-500/30 bg-gradient-to-b from-purple-950/40 to-black/20 shadow-[0_0_80px_#7c3aed66]">
            <div className="text-center">
              <div className="mx-auto flex h-64 w-64 items-center justify-center rounded-full border border-purple-400 bg-purple-900/40 text-9xl shadow-[0_0_70px_#a855f7]">
                🐺
              </div>

              <h2 className="mt-10 text-5xl font-black">
                Your Avatar Here
              </h2>

              <p className="mt-4 text-purple-200">
                Add your FurRig character art later.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="z-10 space-y-4">
          <div className="flex justify-end">
            {isSignedIn ? (
              <div className="flex items-center gap-4 rounded-3xl border border-purple-500/30 bg-black/40 px-5 py-3">
                <UserButton />
                <div>
                  <p className="font-bold">Profile</p>
                  <p className="text-sm text-green-400">● Online</p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal">
                <button className="rounded-2xl border border-purple-500 px-6 py-3 font-bold">
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>

          <Panel title="World Library" action="View All">
            <div className="grid grid-cols-5 gap-3">
              {["Luna", "Crystal", "Miyu", "Shadow", "Aurora"].map((name) => (
                <div key={name} className="text-center">
                  <div className="h-24 rounded-2xl bg-gradient-to-br from-purple-700 to-black shadow-[0_0_20px_#7c3aed55]" />
                  <p className="mt-2 text-xs">{name}</p>
                  <p className="text-xs text-pink-400">♥ 18K</p>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Monthly Contest" action="View All">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200">Create. Share. Win.</p>
                <h3 className="mt-3 text-xl font-black">
                  1 Month Enterprise Membership
                </h3>
                <button className="mt-5 rounded-xl bg-purple-600 px-8 py-3 font-bold">
                  Join Now
                </button>
              </div>

              <div className="text-8xl">🏆</div>
            </div>
          </Panel>

          <Panel title="Global Chat" action="1,248 Online">
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
              <button className="rounded-xl bg-purple-700 px-5">➤</button>
            </div>
          </Panel>

          <div className="rounded-3xl border border-purple-500/40 bg-black/50 p-6 shadow-[0_0_40px_#7c3aed44]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black">Age Verification</h3>
                <p className="mt-2 text-purple-200">
                  FurRig AI is a 13+ platform.
                  <br />
                  Verify your age to continue.
                </p>
              </div>

              <button className="rounded-2xl bg-purple-600 px-8 py-4 text-xl font-black">
                Verify Age
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div
      id="features"
      className="rounded-2xl border border-purple-500/20 bg-black/40 p-4 text-center shadow-[0_0_25px_#7c3aed33]"
    >
      <div className="text-4xl">{icon}</div>
      <h3 className="mt-3 font-black">{title}</h3>
      <p className="mt-2 text-sm text-purple-200">{text}</p>
    </div>
  );
}

function TopNav({
  icon,
  title,
  active,
}: {
  icon: string;
  title: string;
  active?: boolean;
}) {
  return (
    <Link
      href="/dashboard"
      className={`rounded-2xl px-5 py-3 text-center ${
        active
          ? "border border-purple-500 bg-purple-900/60 shadow-[0_0_25px_#7c3aed]"
          : ""
      }`}
    >
      <div className="text-2xl">{icon}</div>
      <p className="text-sm">{title}</p>
    </Link>
  );
}

function CreateCard({ title, button }: { title: string; button: string }) {
  return (
    <div className="w-72 rounded-2xl border border-purple-500/40 bg-black/50 p-4 shadow-[0_0_30px_#7c3aed44]">
      <div className="mb-3 flex justify-between">
        <h3 className="font-bold">{title}</h3>
        <span>⋮</span>
      </div>

      <div className="flex h-36 items-center justify-center rounded-xl bg-gradient-to-br from-purple-700 to-black text-5xl">
        ▶
      </div>

      <button className="mt-3 w-full rounded-xl bg-purple-600 py-2 font-bold">
        {button}
      </button>
    </div>
  );
}

function Panel({
  title,
  action,
  children,
}: {
  title: string;
  action: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-purple-500/40 bg-black/50 p-5 shadow-[0_0_40px_#7c3aed33]">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-black">{title}</h2>
        <button className="text-purple-300">{action}</button>
      </div>
      {children}
    </div>
  );
}

function Chat({ name, text }: { name: string; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-purple-700" />
      <div>
        <p className="font-bold">{name}</p>
        <p className="text-sm text-purple-200">{text}</p>
      </div>
    </div>
  );
}