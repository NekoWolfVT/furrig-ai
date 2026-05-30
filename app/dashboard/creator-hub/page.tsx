import Link from "next/link";

const actions = [
  {
    title: "Publish Avatar",
    text: "Share a VTuber, furry avatar, or character model.",
    icon: "🧬",
    href: "/dashboard/publish",
  },
  {
    title: "Publish Riggy Companion",
    text: "Share custom Riggy looks and AI companion styles.",
    icon: "🐰",
    href: "/dashboard/riggy-builder",
  },
  {
    title: "Creator Profile",
    text: "Edit your public FurRig creator page.",
    icon: "👤",
    href: "/profile",
  },
  {
    title: "Marketplace",
    text: "Sell avatars, overlays, and digital creator packs.",
    icon: "🛒",
    href: "/dashboard/marketplace",
  },
];

export default function CreatorHubPage() {
  return (
    <main className="min-h-screen bg-[#05000d] px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <Link href="/dashboard" className="text-purple-300 hover:text-purple-200">
          ← Back Dashboard
        </Link>

        <h1 className="mt-6 text-6xl font-black">
          Creator <span className="text-pink-400">Hub</span>
        </h1>

        <p className="mt-4 max-w-2xl text-xl text-purple-200">
          Manage your public creator world, publish projects, grow followers,
          earn hearts, and build your FurRig identity.
        </p>

        <section className="mt-10 grid gap-6 md:grid-cols-4">
          <Stat title="Followers" value="0" />
          <Stat title="Hearts" value="0" />
          <Stat title="Projects" value="0" />
          <Stat title="Level" value="1" />
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {actions.map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className="rounded-3xl border border-purple-500/30 bg-black/50 p-6 hover:bg-purple-950/30"
            >
              <div className="text-5xl">{action.icon}</div>
              <h2 className="mt-4 text-2xl font-black">{action.title}</h2>
              <p className="mt-2 text-purple-200">{action.text}</p>
            </Link>
          ))}
        </section>

        <section className="mt-10 rounded-3xl border border-pink-500/40 bg-black/50 p-8 shadow-[0_0_40px_#ec489944]">
          <h2 className="text-3xl font-black text-pink-300">
            Monthly Creator Goal
          </h2>

          <p className="mt-4 text-purple-200">
            Publish your first avatar, Riggy companion, or overlay to start
            earning hearts and leveling up.
          </p>

          <Link
            href="/dashboard/publish"
            className="mt-6 inline-block rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-xl font-black"
          >
            Publish Something
          </Link>
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