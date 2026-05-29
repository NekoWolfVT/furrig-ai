import Link from "next/link";

const tools = [
  {
    title: "Riggy Builder",
    text: "Customize Riggy with prompts and animated looks.",
    href: "/dashboard/riggy-builder",
    icon: "🐰",
    button: "Customize Riggy",
  },
  {
    title: "VTuber Model",
    text: "Create a furry or anime VTuber avatar.",
    href: "/dashboard/avatar",
    icon: "🧬",
    button: "Create Model",
  },
  {
    title: "AI Rigging",
    text: "Auto-rig eyes, mouth, ears, tail, and expressions.",
    href: "/dashboard/rig",
    icon: "🦴",
    button: "Start Rigging",
  },
  {
    title: "Music Video",
    text: "Make AI music videos with avatars and cinematic scenes.",
    href: "/studio/music-video",
    icon: "🎵",
    button: "Make Video",
  },
  {
    title: "AI Movie",
    text: "Create animated stories, trailers, and short films.",
    href: "/studio/movie",
    icon: "🎬",
    button: "Create Movie",
  },
  {
    title: "Overlay Studio",
    text: "Build stream overlays, BRB screens, alerts, and panels.",
    href: "/overlay/pet",
    icon: "📺",
    button: "Open Overlay",
  },
  {
    title: "Riggy OBS Pet",
    text: "Use your custom Riggy as an OBS stream companion.",
    href: "/overlay/pet",
    icon: "📡",
    button: "Test OBS",
  },
];

export default function StudioPage() {
  return (
    <main className="min-h-screen bg-[#05000d] px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/" className="text-purple-300 hover:text-purple-200">
              ← Back Home
            </Link>

            <h1 className="mt-6 text-6xl font-black">
              FurRig <span className="text-purple-500">Studio</span>
            </h1>

            <p className="mt-4 max-w-2xl text-xl text-purple-200">
              Build avatars, customize Riggy, create videos, design overlays,
              and bring your FurRig world to life.
            </p>
          </div>

          <Link
            href="/profile"
            className="rounded-2xl border border-purple-500 px-6 py-3 font-bold hover:bg-purple-950"
          >
            My Profile
          </Link>
        </div>

        <section className="mt-12 rounded-[2rem] border border-pink-500/40 bg-black/50 p-8 shadow-[0_0_50px_#ec489944]">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="text-pink-300">Featured Tool</p>

              <h2 className="mt-3 text-5xl font-black">
                Riggy Builder
              </h2>

              <p className="mt-5 max-w-2xl text-xl text-purple-100">
                Type a prompt and transform Riggy into anything: bunny, wolf,
                dragon, vampire, robot, fox, gothic mascot, or custom AI companion.
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

        <section className="mt-12 rounded-[2rem] border border-purple-500/30 bg-purple-950/20 p-8 shadow-[0_0_50px_#7c3aed33]">
          <h2 className="text-3xl font-black">Quick Start</h2>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <QuickStep
              number="1"
              title="Choose a tool"
              text="Pick Riggy Builder, avatar creator, rigging, video, movie, or overlay studio."
            />
            <QuickStep
              number="2"
              title="Create with prompts"
              text="Use AI prompts or upload your own character art and ideas."
            />
            <QuickStep
              number="3"
              title="Export and share"
              text="Save projects, publish to your profile, or stream with OBS."
            />
          </div>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.title}
              href={tool.href}
              className="group rounded-[2rem] border border-purple-500/30 bg-black/50 p-7 shadow-[0_0_35px_#7c3aed22] transition hover:-translate-y-1 hover:border-purple-400 hover:bg-purple-950/30"
            >
              <div className="text-5xl">{tool.icon}</div>

              <h2 className="mt-5 text-3xl font-black">{tool.title}</h2>

              <p className="mt-3 min-h-14 text-purple-200">{tool.text}</p>

              <div className="mt-6 inline-block rounded-2xl bg-purple-600 px-5 py-3 font-bold group-hover:bg-purple-500">
                {tool.button}
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}

function QuickStep({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-purple-500/20 bg-black/40 p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-xl font-black">
        {number}
      </div>

      <h3 className="mt-4 text-2xl font-black">{title}</h3>
      <p className="mt-2 text-purple-200">{text}</p>
    </div>
  );
}