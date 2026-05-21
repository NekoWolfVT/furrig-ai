import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { OWNER_EMAILS } from "@/lib/admin";

const tools = [
  { name: "AI Avatar Creator", href: "/dashboard/avatar" },
  { name: "Avatar Gallery", href: "/dashboard/avatar/gallery" },
  { name: "Model Scanner", href: "/dashboard/scanner" },
  { name: "Auto Rigging", href: "/dashboard/rigging" },
  { name: "Overlay Studio", href: "/dashboard/overlay" },
  { name: "Emoji Packs", href: "/dashboard/emojis" },
  { name: "Movie Studio", href: "/dashboard/movie" },
];

export default async function DashboardPage() {
  const user = await currentUser();

  const email = user?.emailAddresses?.[0]?.emailAddress || "";
  const isOwner = OWNER_EMAILS.includes(email);

  const name = user?.firstName || user?.username || "Creator";
  const plan = isOwner ? "Max Founder" : "Free";
  const role = isOwner ? "Owner" : "Creator";
  const storage = isOwner ? "Unlimited" : "5GB";

  return (
    <main className="min-h-screen bg-[#05000d] text-white">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-r border-purple-500/20 bg-black/40 p-6">
          <Link href="/">
            <h1 className="text-3xl font-black">
              FurRig <span className="text-purple-400">AI</span>
            </h1>
            <p className="text-sm text-purple-300">Creator Dashboard</p>
          </Link>

          <nav className="mt-10 space-y-3">
            {tools.map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                className="block rounded-xl border border-purple-500/20 px-4 py-3 text-purple-100 hover:bg-purple-950/50"
              >
                {tool.name}
              </Link>
            ))}
          </nav>
        </aside>

        <section className="p-8">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-5xl font-black">Welcome back, {name}</h2>
              <p className="mt-2 text-purple-200">
                Role: {role} • Membership: {plan}
              </p>
            </div>

            <div className="rounded-2xl border border-purple-500/40 bg-purple-950/30 px-6 py-4 text-center">
              <p className="text-sm text-purple-300">Membership</p>
              <p className="text-2xl font-black text-purple-300">{plan}</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Stat title="Storage" value={storage} />
            <Stat title="Projects" value={isOwner ? "Unlimited" : "14"} />
            <Stat title="Exports" value={isOwner ? "Unlimited" : "37"} />
          </div>

          {isOwner && (
            <div className="mt-8 rounded-3xl border border-yellow-500/40 bg-yellow-500/10 p-6">
              <h3 className="text-3xl font-black text-yellow-400">
                👑 Owner Max Founder Access
              </h3>
              <p className="mt-2 text-yellow-100">
                You have unlocked all FurRig AI tools, unlimited storage,
                unlimited exports, admin access, and founder privileges.
              </p>
            </div>
          )}

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <Card title="Model Scanner">
              <div className="rounded-3xl border border-purple-500/30 bg-black/50 p-10 text-center">
                <h3 className="text-2xl font-black">Scan any avatar</h3>
                <p className="mt-2 text-purple-300">
                  Detect ears, tail, hair, outfit, expressions, and rigging needs.
                </p>

                <Link
                  href="/dashboard/avatar"
                  className="mt-6 inline-block rounded-xl bg-purple-600 px-6 py-3 font-bold hover:bg-purple-500"
                >
                  Open Avatar Creator
                </Link>
              </div>
            </Card>

            <Card title="Recent Projects">
              <Project name="NekoWolfVT Avatar" tag="VTuber Model" />
              <Project name="Purple Stream Overlay" tag="OBS Overlay" />
              <Project name="24 Emoji Pack" tag="Emotes" />
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-3xl border border-purple-500/30 bg-black/40 p-6">
      <p className="text-purple-300">{title}</p>
      <h3 className="mt-2 text-3xl font-black">{value}</h3>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-purple-500/30 bg-black/40 p-6">
      <h3 className="mb-6 text-2xl font-black text-purple-300">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Project({ name, tag }: { name: string; tag: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-purple-500/20 bg-black/40 p-4">
      <div>
        <h4 className="font-bold">{name}</h4>
        <p className="text-sm text-purple-300">{tag}</p>
      </div>

      <button className="rounded-xl bg-purple-600 px-4 py-2 text-sm font-bold">
        Open
      </button>
    </div>
  );
}