import Link from "next/link";

export default function DashboardMarketplacePage() {
  return (
    <main className="min-h-screen bg-[#05000d] px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <Link href="/dashboard" className="text-purple-300 hover:text-purple-200">
          ← Back Dashboard
        </Link>

        <h1 className="mt-6 text-6xl font-black">
          Creator <span className="text-purple-500">Marketplace</span>
        </h1>

        <p className="mt-4 max-w-2xl text-xl text-purple-200">
          Sell avatars, Riggy companions, overlays, music video packs, and digital creator assets.
        </p>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          <Card title="My Store" icon="🏪" text="Manage your creator storefront." />
          <Card title="Products" icon="📦" text="Upload and manage digital assets." />
          <Card title="Sales" icon="💸" text="Track sales, orders, and payouts." />
        </section>

        <div className="mt-10 rounded-3xl border border-pink-500/40 bg-black/50 p-8">
          <h2 className="text-3xl font-black text-pink-300">Start Selling</h2>
          <p className="mt-4 text-purple-200">
            Marketplace selling can be unlocked for Pro and Enterprise creators.
          </p>

          <Link
            href="/dashboard/publish"
            className="mt-6 inline-block rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-xl font-black"
          >
            Publish First Product
          </Link>
        </div>
      </div>
    </main>
  );
}

function Card({ title, icon, text }: { title: string; icon: string; text: string }) {
  return (
    <div className="rounded-3xl border border-purple-500/30 bg-black/50 p-6">
      <div className="text-5xl">{icon}</div>
      <h2 className="mt-4 text-2xl font-black">{title}</h2>
      <p className="mt-2 text-purple-200">{text}</p>
    </div>
  );
}