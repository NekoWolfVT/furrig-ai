import Link from "next/link";

const products = [
  {
    title: "Gothic Wolf VTuber",
    creator: "NekoWolfVT",
    price: "$15",
    icon: "🐺",
  },
  {
    title: "Cyber Bunny Riggy",
    creator: "CyberKitten",
    price: "$8",
    icon: "🐰",
  },
  {
    title: "Dragon OBS Overlay",
    creator: "CrystalDragon",
    price: "$12",
    icon: "🐉",
  },
  {
    title: "Fox VTuber Pack",
    creator: "ShadowFox",
    price: "$20",
    icon: "🦊",
  },
];

export default function MarketplacePage() {
  return (
    <main className="min-h-screen bg-[#05000d] px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <Link href="/" className="text-purple-300 hover:text-purple-200">
          ← Back Home
        </Link>

        <h1 className="mt-6 text-6xl font-black">
          FurRig <span className="text-purple-500">Marketplace</span>
        </h1>

        <p className="mt-4 text-xl text-purple-200">
          Buy and sell avatars, Riggy companions, overlays, assets, and creator tools.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.title}
              className="rounded-3xl border border-purple-500/30 bg-black/50 p-6"
            >
              <div className="flex h-40 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-700 to-black text-7xl">
                {product.icon}
              </div>

              <h2 className="mt-5 text-2xl font-black">
                {product.title}
              </h2>

              <p className="mt-2 text-purple-200">
                by {product.creator}
              </p>

              <p className="mt-4 text-2xl font-black text-pink-400">
                {product.price}
              </p>

              <button className="mt-5 w-full rounded-2xl bg-purple-600 py-3 font-black hover:bg-purple-500">
                View Item
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-pink-500/40 bg-black/50 p-8">
          <h2 className="text-3xl font-black text-pink-300">
            Become a Seller
          </h2>

          <p className="mt-4 text-purple-200">
            Publish your VTubers, overlays, Riggy companions, and digital assets.
          </p>

          <Link
            href="/dashboard/publish"
            className="mt-6 inline-block rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-xl font-black"
          >
            Start Selling
          </Link>
        </div>
      </div>
    </main>
  );
}