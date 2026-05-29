import Link from "next/link";

const friends = [
  { name: "CyberKitten", status: "Online", avatar: "🐱" },
  { name: "ShadowFox", status: "Online", avatar: "🦊" },
  { name: "NovaWolf", status: "Away", avatar: "🐺" },
  { name: "CrystalDragon", status: "Online", avatar: "🐉" },
];

export default function MessagesPage() {
  return (
    <main className="min-h-screen bg-[#05000d] text-white p-8">
      <div className="mx-auto max-w-7xl">
        <Link href="/" className="text-purple-300 hover:text-purple-200">
          ← Back Home
        </Link>

        <h1 className="mt-6 text-6xl font-black">
          FurRig <span className="text-purple-500">Messages</span>
        </h1>

        <p className="mt-4 text-xl text-purple-200">
          Chat with friends, creators, and your FurRig community.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-[320px_1fr]">
          <div className="rounded-3xl border border-purple-500/30 bg-black/50 p-5">
            <h2 className="text-2xl font-black">Friends</h2>

            <div className="mt-5 space-y-3">
              {friends.map((friend) => (
                <div
                  key={friend.name}
                  className="flex items-center gap-4 rounded-2xl border border-purple-500/20 p-4"
                >
                  <div className="text-4xl">{friend.avatar}</div>

                  <div>
                    <p className="font-bold">{friend.name}</p>
                    <p className="text-sm text-green-400">
                      ● {friend.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-purple-500/30 bg-black/50 p-6">
            <h2 className="text-3xl font-black">Global Chat</h2>

            <div className="mt-6 space-y-4">
              <Message
                name="CyberKitten"
                text="Just finished my VTuber avatar!"
              />

              <Message
                name="NovaWolf"
                text="Working on a new FurRig project 🐺"
              />

              <Message
                name="CrystalDragon"
                text="The Riggy Builder is awesome!"
              />
            </div>

            <div className="mt-8 flex gap-3">
              <input
                placeholder="Type a message..."
                className="flex-1 rounded-2xl border border-purple-500/30 bg-black/40 px-5 py-4 outline-none"
              />

              <button className="rounded-2xl bg-purple-600 px-8 py-4 font-black hover:bg-purple-500">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Message({
  name,
  text,
}: {
  name: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-purple-500/20 bg-black/40 p-4">
      <p className="font-bold text-pink-300">{name}</p>
      <p className="mt-1 text-purple-100">{text}</p>
    </div>
  );
}