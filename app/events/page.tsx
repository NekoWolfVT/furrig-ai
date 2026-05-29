import Link from "next/link";

const events = [
  {
    title: "Monthly Creator Contest",
    reward: "1 Month Enterprise Membership",
    date: "This Month",
    level: "Lv.15+",
    icon: "🏆",
  },
  {
    title: "VTuber Avatar Challenge",
    reward: "Featured in World Library",
    date: "Weekly",
    level: "All Levels",
    icon: "🧬",
  },
  {
    title: "Riggy Pet Showcase",
    reward: "Special Riggy Badge",
    date: "Coming Soon",
    level: "Lv.5+",
    icon: "🐺",
  },
  {
    title: "AI Music Video Jam",
    reward: "Creator Spotlight",
    date: "Weekend Event",
    level: "Lv.10+",
    icon: "🎵",
  },
];

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-[#05000d] px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <Link href="/" className="text-purple-300 hover:text-purple-200">
          ← Back Home
        </Link>

        <div className="mt-6 flex items-center justify-between">
          <div>
            <h1 className="text-6xl font-black">
              FurRig <span className="text-purple-500">Events</span>
            </h1>

            <p className="mt-4 max-w-2xl text-xl text-purple-200">
              Join contests, creator challenges, avatar showcases, and community
              events.
            </p>
          </div>

          <Link
            href="/profile"
            className="rounded-2xl border border-purple-500 px-6 py-3 font-bold hover:bg-purple-950"
          >
            My Profile
          </Link>
        </div>

        <section className="mt-12 rounded-[2rem] border border-yellow-500/40 bg-black/50 p-8 shadow-[0_0_50px_#eab30833]">
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <p className="text-yellow-300">Featured Event</p>

              <h2 className="mt-3 text-5xl font-black">
                Monthly Creator Contest
              </h2>

              <p className="mt-5 max-w-2xl text-xl text-purple-100">
                Create. Share. Win. Submit your best avatar, music video,
                overlay, or AI movie scene for a chance to win a free Enterprise
                membership.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <span className="rounded-full border border-purple-500/40 px-5 py-2">
                  Reward: 1 Month Enterprise
                </span>

                <span className="rounded-full border border-purple-500/40 px-5 py-2">
                  Level: Lv.15+
                </span>

                <span className="rounded-full border border-purple-500/40 px-5 py-2">
                  Ends: End of Month
                </span>
              </div>

              <button className="mt-8 rounded-2xl bg-purple-600 px-8 py-4 text-xl font-black hover:bg-purple-500">
                Join Event
              </button>
            </div>

            <div className="flex items-center justify-center text-9xl">
              🏆
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {events.map((event) => (
            <div
              key={event.title}
              className="rounded-[2rem] border border-purple-500/30 bg-black/50 p-6 shadow-[0_0_35px_#7c3aed22]"
            >
              <div className="flex h-36 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-700 to-black text-7xl">
                {event.icon}
              </div>

              <h2 className="mt-5 text-2xl font-black">{event.title}</h2>

              <p className="mt-3 text-purple-300">{event.reward}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-purple-500/30 px-3 py-1 text-sm">
                  {event.date}
                </span>

                <span className="rounded-full border border-purple-500/30 px-3 py-1 text-sm">
                  {event.level}
                </span>
              </div>

              <button className="mt-6 w-full rounded-xl bg-purple-600 py-3 font-bold hover:bg-purple-500">
                View Event
              </button>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}