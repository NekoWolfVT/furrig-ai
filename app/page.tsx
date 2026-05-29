"use client";

import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

async function checkout(plan: string) {
  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ plan }),
  });

  const data = await response.json();
  if (data.url) window.location.href = data.url;
}

const pricingPlans = [
  {
    title: "Free",
    price: "$0",
    yearly: "$0/year",
    storage: "5GB Storage",
    button: "Start Free",
    features: [
      "Starter VTuber model",
      "Basic avatar creator",
      "Watermarked exports",
      "5 emoji exports",
      "Static starter overlay",
      "Basic profile picture tools",
    ],
  },
  {
    title: "Creator",
    price: "$12",
    yearly: "$99/year",
    storage: "500GB Storage",
    button: "Choose Creator",
    features: [
      "Everything in Free",
      "No watermarks",
      "AI VTuber creator",
      "Static overlay packs",
      "Emoji pack generator",
      "Creator Hub publishing",
    ],
  },
  {
    title: "Pro Studio",
    price: "$29",
    yearly: "$290/year",
    storage: "1TB Storage",
    button: "Start Pro Trial",
    features: [
      "Everything in Creator",
      "AI auto-rigging",
      "VRChat export",
      "Advanced animation tools",
      "AI movie studio",
      "3-Day Free Trial",
    ],
  },
  {
    title: "Enterprise",
    price: "$99",
    yearly: "$999/year",
    storage: "5TB+ Storage",
    button: "Contact Sales",
    features: [
      "Everything in Pro",
      "Commercial rights",
      "Marketplace selling",
      "Priority rendering",
      "VIP support",
      "Future API access",
    ],
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#05000d] text-white">
      <nav className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-purple-500/20 bg-black/70 px-6 py-4 backdrop-blur">
        <Link href="/" className="text-2xl font-black">
          FurRig <span className="text-purple-500">AI</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="#features" className="hover:text-purple-300">
            Features
          </Link>

          <Link href="#pricing" className="hover:text-purple-300">
            Pricing
          </Link>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="rounded-xl border border-purple-500 px-4 py-2 font-bold hover:bg-purple-950">
                Sign In
              </button>
            </SignInButton>

            <SignUpButton mode="modal">
              <button className="rounded-xl bg-purple-600 px-4 py-2 font-bold hover:bg-purple-500">
                Join Free
              </button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <Link
              href="/dashboard"
              className="rounded-xl bg-purple-600 px-4 py-2 font-bold hover:bg-purple-500"
            >
              Dashboard
            </Link>

            <Link
              href="/dashboard/profile"
              className="rounded-xl border border-purple-500 px-4 py-2 font-bold hover:bg-purple-950"
            >
              Edit Profile
            </Link>

            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-10 w-10",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>

      <section className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 pt-32 text-center">
        <div className="rounded-full border border-purple-500/40 bg-purple-500/10 px-5 py-2 text-sm text-purple-200">
          Welcome to FurRig AI
        </div>

        <h1 className="mt-8 text-6xl font-black md:text-8xl">
          Build Your Dream{" "}
          <span className="text-purple-500">VTuber Avatar</span>
        </h1>

        <p className="mt-6 max-w-3xl text-xl text-purple-200">
          Create furry avatars, stream pets, overlays, VRChat-ready characters,
          and AI-powered creator tools for your online world.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <SignedOut>
            <SignUpButton mode="modal">
              <button className="rounded-2xl bg-purple-600 px-8 py-4 font-bold hover:bg-purple-500">
                Start Creating Free
              </button>
            </SignUpButton>

            <SignInButton mode="modal">
              <button className="rounded-2xl border border-purple-500 px-8 py-4 font-bold hover:bg-purple-950">
                Login
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Link
              href="/dashboard"
              className="rounded-2xl bg-purple-600 px-8 py-4 font-bold hover:bg-purple-500"
            >
              Open Dashboard
            </Link>

            <Link
              href="/dashboard/profile"
              className="rounded-2xl border border-purple-500 px-8 py-4 font-bold hover:bg-purple-950"
            >
              Edit My Profile
            </Link>
          </SignedIn>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-24">
        <h2 className="text-center text-5xl font-black">
          What You Can Create
        </h2>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <Feature title="Avatar Creator" text="Create furry and VTuber characters." />
          <Feature title="AI Rigging" text="Auto-rig avatars for movement and expressions." />
          <Feature title="Riggy Pets" text="Make stream pets and OBS companions." />
          <Feature title="VRChat Tools" text="Prepare avatars for VRChat-style workflows." />
          <Feature title="Overlay Studio" text="Create starting, BRB, and ending screens." />
          <Feature title="Creator Profiles" text="Build your FurRig creator profile." />
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <h2 className="text-6xl font-black">
            FurRig <span className="text-purple-500">AI</span> Plans
          </h2>

          <p className="mt-6 text-xl text-purple-200">
            Choose the creator tier that fits your FurRig journey.
          </p>
        </div>

        <div className="mt-24 grid gap-8 lg:grid-cols-4">
          {pricingPlans.map((plan) => (
            <div
              key={plan.title}
              className={`rounded-[2rem] border p-8 ${
                plan.title === "Pro Studio"
                  ? "border-purple-500 bg-purple-950/30"
                  : plan.title === "Enterprise"
                  ? "border-yellow-500/40 bg-black/50"
                  : "border-purple-500/20 bg-black/40"
              }`}
            >
              <h3
                className={`text-4xl font-black ${
                  plan.title === "Enterprise" ? "text-yellow-400" : "text-white"
                }`}
              >
                {plan.title}
              </h3>

              <div className="mt-6">
                <span className="text-6xl font-black">{plan.price}</span>
                <span className="text-2xl text-purple-200">/month</span>
              </div>

              <p className="mt-2 text-purple-300">{plan.yearly}</p>

              <div className="mt-6 inline-block rounded-full border border-purple-500/30 px-4 py-2 text-sm">
                {plan.storage}
              </div>

              <ul className="mt-8 space-y-4 text-purple-100">
                {plan.features.map((feature) => (
                  <li key={feature}>✓ {feature}</li>
                ))}
              </ul>

              <button
                onClick={() =>
                  plan.title === "Free"
                    ? (window.location.href = "/sign-up")
                    : checkout(
                        plan.title === "Creator"
                          ? "creator"
                          : plan.title === "Pro Studio"
                          ? "pro"
                          : "enterprise"
                      )
                }
                className={`mt-10 w-full rounded-2xl py-4 font-bold ${
                  plan.title === "Enterprise"
                    ? "bg-yellow-500 text-black hover:bg-yellow-400"
                    : "bg-purple-600 hover:bg-purple-500"
                }`}
              >
                {plan.button}
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-purple-500/30 bg-white/5 p-8">
      <h3 className="text-2xl font-black text-purple-300">{title}</h3>
      <p className="mt-4 text-purple-100">{text}</p>
    </div>
  );
}