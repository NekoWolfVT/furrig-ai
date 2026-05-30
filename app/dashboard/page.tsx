import Link from "next/link";

const sidebarTools = [
  { title: "Riggy Builder", href: "/dashboard/riggy-builder", icon: "🐰" },
  { title: "Twitch RiggyBot", href: "/dashboard/twitch-bot", icon: "💬" },
  { title: "OBS Riggy", href: "/dashboard/obs", icon: "📺" },
  { title: "Riggy Memory", href: "/dashboard/riggy-memory", icon: "🧠" },
  { title: "AI Avatar Creator", href: "/dashboard/avatar", icon: "🧬" },
  { title: "Auto Rigging", href: "/dashboard/rig", icon: "🦴" },
  { title: "Creator Hub", href: "/dashboard/creator-hub", icon: "🌐" },
  { title: "Marketplace", href: "/dashboard/marketplace", icon: "🛒" },
  { title: "Publish", href: "/dashboard/publish", icon: "🚀" },
  { title: "Analytics", href: "/dashboard/analytics", icon: "📈" },
  { title: "Subscriptions", href: "/dashboard/subscriptions", icon: "💎" },
  { title: "Settings", href: "/dashboard/settings", icon: "⚙️" },
];

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
    title: "Creator Hub",
    text: "Manage your creator world and followers.",
    href: "/dashboard/creator-hub",
    icon: "🌐",
  },
  {
    title: "Marketplace",
    text: "Sell avatars, overlays, and Riggy companions.",
    href: "/dashboard/marketplace",
    icon: "🛒",
  },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#05000d] text-white">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-r border-purple-500/30 bg-black/50 p-5">
          <Link href="/" className="block">
            <h1 className="text-4xl font-black">
              FurRig <span className="text-purple-500">AI</span>
            </h1>
            <p className="text-purple-300">Creator Dashboard</p>
          </Link>

          <nav className="mt-8 space-y-3">
            {sidebarTools.map((tool) => (
              <Link
                key={tool.title}
                href={tool.href}
                className="flex items-center gap-3 rounded-2xl border border-purple-500/30 bg-black/40 px-4 py-3 font-bold hover:bg-purple-950/50"
              >
                <span className="text-2xl">{tool.icon}</span>
                {tool.title}
              </Link>
            ))}
          </nav>
        </aside>

        <section className="px-6 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <Link href="/" className="text-purple-300 hover:text-purple-200">
                  ← Back Home
                </Link>

                <h2 className="mt-6 text-6xl font-black">
                  FurRig <span className="text-purple-500">Dashboard</span>
                </h2>

                <p className="mt-4 max-w-2xl text-xl text-purple-200">
                  Your control centre for Riggy, VTubers, OBS, Twitch, avatars,
                  projects, marketplace, and creator tools.
                </p>
              </div>

              <div className="rounded-3xl border border-purple-500/40 bg-purple-950/30 px-8 py-5 text-center">
                <p className="text-purple-200">Membership</p>
                <p className="text-2xl font-black text-pink-300">Max Founder</p>
              </div>
            </div>

            <section className="mt-10 rounded-[2rem] border border-pink-500/40 bg-black/50 p-8 shadow-[0_0_50px_#ec489944]">
              <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
                <div>
                  <p className="text-pink-300">Featured</p>

                  <h2 className="mt-3 text-5xl font-black">Customize Riggy</h2>

                  <p className="mt-5 max-w-2xl text-xl text-purple-100">
                    Build your own animated AI companion with prompts. Change
                    Riggy’s look, personality, and future Twitch/OBS behavior.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link
                      href="/dashboard/riggy-builder"
                      className="rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-xl font-black shadow-[0_0_30px_#ec4899]"
                    >
                      Open Riggy Builder →
                    </Link>

                    <Link
                      href="/overlay/pet"
                      className="rounded-2xl border border-pink-500 px-8 py-4 text-xl font-black hover:bg-pink-950/40"
                    >
                      Test OBS Riggy
                    </Link>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="flex h-60 w-60 animate-pulse items-center justify-center rounded-full border-4 border-pink-400 bg-gradient-to-br from-pink-500 to-purple-800 text-8xl shadow-[0_0_70px_#ec4899]">
                    🐰
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-10 grid gap-6 md:grid-cols-3">
              <Stat title="Storage" value="Unlimited" />
              <Stat title="Projects" value="Unlimited" />
              <Stat title="Exports" value="Unlimited" />
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
        </section>
      </div>
    </main>
  );
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-3xl border border-purple-500/30 bg-black/50 p-6">
      <p className="text-purple-300">{title}</p>
      <h2 className="mt-2 text-4xl font-black">{value}</h2>
    </div>
  );
}