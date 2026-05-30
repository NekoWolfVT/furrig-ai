import Link from "next/link";

const tools = [
  {
    title: "Riggy Builder",
    text: "Customize Riggy with prompts and animated looks.",
    href: "/dashboard/riggy-builder",
    icon: "🐰",
  },
  {
    title: "Twitch RiggyBot",
    text: "Connect Riggy to Twitch chat.",
    href: "/dashboard/twitch-bot",
    icon: "💬",
  },
  {
    title: "OBS Overlay",
    text: "Add Riggy to OBS as a browser source.",
    href: "/dashboard/obs",
    icon: "📺",
  },
  {
    title: "Riggy Memory",
    text: "Manage what Riggy remembers about viewers.",
    href: "/dashboard/riggy-memory",
    icon: "🧠",
  },
  {
    title: "Avatar Creator",
    text: "Create furry and VTuber avatars.",
    href: "/dashboard/avatar",
    icon: "🧬",
  },
  {
    title: "AI Rigging",
    text: "Auto-rig avatars for movement.",
    href: "/dashboard/rig",
    icon: "🦴",
  },
  {
    title: "Profile",
    text: "Edit your FurRig creator profile.",
    href: "/profile",
    icon: "👤",
  },
  {
    title: "Projects",
    text: "View your saved FurRig projects.",
    href: "/projects",
    icon: "📁",
  },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#05000d] px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <Link href="/" className="text-purple-300 hover:text-purple-200">
          ← Back Home
        </Link>

        <h1 className="mt-6 text-6xl font-black">
          FurRig <span className="text-purple-500">Dashboard</span>
        </h1>

        <p className="mt-4 max-w-2xl text-xl text-purple-200">
          Your control centre for Riggy, VTubers, OBS, Twitch, avatars, projects,
          and creator tools.
        </p>

        <section className="mt-10 rounded-[2rem] border border-pink-500/40 bg-black/50 p-8 shadow-[0_0_50px_#ec489944]">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="text-pink-300">Featured</p>

              <h2 className="mt-3 text-5xl font-black">
                Customize Riggy
              </h2>

              <p className="mt-5 max-w-2xl text-xl text-purple-100">
                Build your own animated AI companion with prompts. Change
                Riggy’s look, personality, and future Twitch/OBS behavior.
              </p>

              <Link
                href="/dashboard/riggy-builder"
                className="mt-8 inline-block rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-xl font-black shadow-[0_0_30px_#ec4899]"
              >
                Open Riggy Builder →
              </Link>
            </div>

            <div className="flex items-center justify-center">
              <div className="flex h-60 w-60 items-center justify-center rounded-full border-4 border-pink-400 bg-gradient-to-br from-pink-500 to-purple-800 text-8xl shadow-[0_0_70px_#ec4899]">
                🐰
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {tools.map((tool) => (
            <Link
              key={tool.title}
              href={tool.href}
              className="rounded-[2rem] border border-purple-500/30 bg-black/50 p-6 shadow-[0_0_35px_#7c3aed22] transition hover:-translate-y-1 hover:border-purple-400 hover:bg-purple-950/30"
            >
              <div className="text-5xl">{tool.icon}</div>
              <h2 className="mt-5 text-2xl font-black">{tool.title}</h2>
              <p className="mt-3 text-purple-200">{tool.text}</p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}