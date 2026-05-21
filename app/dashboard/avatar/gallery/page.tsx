const avatars = [
  { name: "NekoWolfVT", type: "Wolf VTuber", image: "/creator1.png" },
  { name: "LunaTheWolf", type: "Silver Wolf", image: "/creator2.png" },
  { name: "ShadowFox21", type: "Overlay Creator", image: "/creator3.png" },
];

export default function AvatarGalleryPage() {
  return (
    <main className="min-h-screen bg-[#05000d] p-8 text-white">
      <div className="mx-auto max-w-7xl">
        <a href="/dashboard/avatar" className="text-purple-300">
          ← Back to Avatar Creator
        </a>

        <h1 className="mt-6 text-5xl font-black">
          Avatar <span className="text-purple-400">Gallery</span>
        </h1>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {avatars.map((avatar) => (
            <div
              key={avatar.name}
              className="overflow-hidden rounded-[2rem] border border-purple-500/30 bg-black/40"
            >
              <img
                src={avatar.image}
                alt={avatar.name}
                className="h-80 w-full object-cover"
              />

              <div className="p-6">
                <h2 className="text-2xl font-black">{avatar.name}</h2>
                <p className="text-purple-300">{avatar.type}</p>

                <button className="mt-6 w-full rounded-xl bg-purple-600 py-3 font-bold">
                  Open Avatar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}