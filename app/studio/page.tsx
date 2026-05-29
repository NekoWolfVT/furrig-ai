import Link from "next/link";

const tools = [
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
    title: "Riggy Pet",
    text: "Create your animated stream pet and AI chat companion.",
    href: "/dashboard/pet",
    icon: "🐺",
    button: "Create Pet",
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
              Build avatars, rig models, create music videos, design overlays,
              and bring your FurRig world to life.
            </p>
          </div>

          <Link
            href="/dashboard/profile"
            className="rounded-2xl border border-purple-500 px-6 py-3 font-bold hover:bg-purple-950"
          >
            Edit Profile
          </Link>
        </div>

        <section className="mt-12 rounded-[2rem] border border-purple-500/30 bg-purple-950/20 p-8 shadow-[0_0_50px_#7c3aed33]">
          <h2 className="text-3xl font-black">Quick Start</h2>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <QuickStep number="1" title="Choose a tool" text="Pick avatar, rigging, video, movie, or overlay studio." />
            <QuickStep number="2" title="Upload or create" text="Use AI prompts or upload your own character art." />
            <QuickStep number="3" title="Export and share" text="Save projects, publish to your profile, or stream with OBS." />
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