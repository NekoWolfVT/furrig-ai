import Link from "next/link";

const projects = [
  {
    title: "My First VTuber Avatar",
    type: "VTuber Model",
    status: "Draft",
    icon: "🧬",
    href: "/dashboard/avatar",
  },
  {
    title: "Riggy Stream Pet",
    type: "OBS Pet",
    status: "Ready",
    icon: "🐺",
    href: "/dashboard/pet",
  },
  {
    title: "Neon Music Video",
    type: "Music Video",
    status: "Editing",
    icon: "🎵",
    href: "/studio",
  },
  {
    title: "AI Movie Scene",
    type: "AI Movie",
    status: "Draft",
    icon: "🎬",
    href: "/studio",
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#05000d] px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <Link href="/" className="text-purple-300 hover:text-purple-200">
          ← Back Home
        </Link>

        <div className="mt-6 flex items-center justify-between">
          <div>
            <h1 className="text-6xl font-black">
              My <span className="text-purple-500">Projects</span>
            </h1>

            <p className="mt-4 max-w-2xl text-xl text-purple-200">
              Manage your avatars, videos, overlays, Riggy pets, and creator
              projects.
            </p>
          </div>

          <Link
            href="/studio"
            className="rounded-2xl bg-purple-600 px-6 py-3 font-bold hover:bg-purple-500"
          >
            + New Project
          </Link>
        </div>

        <section className="mt-12 grid gap-6 md:grid-cols-4">
          <Stat title="Total Projects" value="4" />
          <Stat title="Ready" value="1" />
          <Stat title="Drafts" value="2" />
          <Stat title="Editing" value="1" />
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {projects.map((project) => (
            <Link
              key={project.title}
              href={project.href}
              className="rounded-[2rem] border border-purple-500/30 bg-black/50 p-6 shadow-[0_0_35px_#7c3aed22] transition hover:-translate-y-1 hover:border-purple-400 hover:bg-purple-950/30"
            >
              <div className="flex h-44 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-700 to-black text-7xl">
                {project.icon}
              </div>

              <h2 className="mt-5 text-2xl font-black">{project.title}</h2>

              <p className="mt-2 text-purple-300">{project.type}</p>

              <span className="mt-4 inline-block rounded-full border border-purple-500/30 px-4 py-2 text-sm text-purple-200">
                {project.status}
              </span>
            </Link>
          ))}
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