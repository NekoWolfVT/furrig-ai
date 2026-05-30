import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    features: ["5GB Storage", "Basic avatar tools", "Watermarked exports"],
  },
  {
    name: "Creator",
    price: "$12",
    features: ["500GB Storage", "No watermarks", "Creator Hub publishing"],
  },
  {
    name: "Pro",
    price: "$29",
    features: ["1TB Storage", "AI rigging", "VRChat export", "OBS Riggy"],
  },
  {
    name: "Enterprise",
    price: "$99",
    features: ["5TB+ Storage", "Marketplace selling", "Priority rendering"],
  },
];

export default function SubscriptionsPage() {
  return (
    <main className="min-h-screen bg-[#05000d] px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <Link href="/dashboard" className="text-purple-300 hover:text-purple-200">
          ← Back Dashboard
        </Link>

        <h1 className="mt-6 text-6xl font-black">
          Membership <span className="text-purple-500">Plans</span>
        </h1>

        <p className="mt-4 max-w-2xl text-xl text-purple-200">
          Upgrade FurRig AI to unlock more storage, exports, Riggy tools,
          marketplace selling, and creator features.
        </p>

        <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl border p-6 ${
                plan.name === "Pro"
                  ? "border-purple-400 bg-purple-950/40 shadow-[0_0_40px_#7c3aed]"
                  : "border-purple-500/30 bg-black/50"
              }`}
            >
              <h2 className="text-3xl font-black">{plan.name}</h2>

              <p className="mt-4 text-5xl font-black">
                {plan.price}
                <span className="text-lg text-purple-200">/month</span>
              </p>

              <ul className="mt-6 space-y-3 text-purple-100">
                {plan.features.map((feature) => (
                  <li key={feature}>✓ {feature}</li>
                ))}
              </ul>

              <button className="mt-8 w-full rounded-2xl bg-purple-600 py-4 font-black hover:bg-purple-500">
                {plan.name === "Free" ? "Current Plan" : `Upgrade to ${plan.name}`}
              </button>
            </div>
          ))}
        </section>

        <section className="mt-10 rounded-3xl border border-pink-500/40 bg-black/50 p-8">
          <h2 className="text-3xl font-black text-pink-300">
            Billing Settings
          </h2>

          <p className="mt-4 text-purple-200">
            Stripe billing portal connection coming soon.
          </p>

          <Link
            href="/"
            className="mt-6 inline-block rounded-2xl border border-purple-500 px-8 py-4 font-black hover:bg-purple-950"
          >
            Back to Home
          </Link>
        </section>
      </div>
    </main>
  );
}