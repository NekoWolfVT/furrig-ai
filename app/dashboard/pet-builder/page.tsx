import Link from "next/link";

export default function PetBuilderPage() {
  return (
    <main className="min-h-screen bg-[#05000d] p-10 text-white">
      <Link href="/" className="text-purple-300 hover:text-purple-200">
        ← Back Home
      </Link>

      <h1 className="mt-6 text-5xl font-black">
        Riggy <span className="text-purple-500">Pet Builder</span>
      </h1>

      <p className="mt-4 max-w-2xl text-xl text-purple-200">
        Build your OBS stream pet, chatbot companion, and animated FurRig mascot.
      </p>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        <Card title="Idle Animation" text="Set Riggy’s default idle pose." icon="🐰" />
        <Card title="Chat Reactions" text="Riggy reacts to followers, subs, chat, and events." icon="💬" />
        <Card title="OBS Overlay" text="Use Riggy as a transparent browser source in OBS." icon="📺" />
      </section>

      <div className="mt-10 flex gap-4">
        <Link
          href="/overlay/pet"
          className="rounded-2xl bg-purple-600 px-6 py-3 font-bold hover:bg-purple-500"
        >
          Open OBS Overlay
        </Link>

        <Link
          href="/dashboard/pet"
          className="rounded-2xl border border-purple-500 px-6 py-3 font-bold hover:bg-purple-950"
        >
          Back to Pets
        </Link>
      </div>
    </main>
  );
}

function Card({
  title,
  text,
  icon,
}: {
  title: string;
  text: string;
  icon: string;
}) {
  return (
    <div className="rounded-3xl border border-purple-500/30 bg-black/50 p-6">
      <div className="text-5xl">{icon}</div>
      <h2 className="mt-4 text-2xl font-black">{title}</h2>
      <p className="mt-2 text-purple-200">{text}</p>
    </div>
  );
}