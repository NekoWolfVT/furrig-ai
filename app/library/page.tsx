import Link from "next/link";

const creators = [
  {
    name: "Luna Eclipse",
    likes: "24.8K",
    category: "VTuber",
  },
  {
    name: "Crystal Wave",
    likes: "21.3K",
    category: "Avatar",
  },
  {
    name: "Starlight Miyu",
    likes: "16.2K",
    category: "Music",
  },
  {
    name: "Shadow Zero",
    likes: "21.1K",
    category: "VRChat",
  },
  {
    name: "Aurora Night",
    likes: "18.7K",
    category: "Model",
  },
  {
    name: "CyberKitten",
    likes: "14.5K",
    category: "Overlay",
  },
];

export default function LibraryPage() {
  return (
    <main className="min-h-screen bg-[#05000d] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="text-purple-300 hover:text-purple-200">
          ← Back Home
        </Link>

        <h1 className="mt-6 text-6xl font-black">
          World <span className="text-purple-500">Library</span>
        </h1>

        <p className="mt-4 text-xl text-purple-200">
          Discover avatars, VTubers, overlays, music videos, movies and creator
          projects from the FurRig community.
        </p>

        <div className="mt-10 flex gap-4 flex-wrap">
          <button className="px-5 py-2 rounded-xl bg-purple-600">
            Trending
          </button>

          <button className="px-5 py-2 rounded-xl border border-purple-500">
            Featured
          </button>

          <button className="px-5 py-2 rounded-xl border border-purple-500">
            New
          </button>

          <button className="px-5 py-2 rounded-xl border border-purple-500">
            Following
          </button>
        </div>

        <div className="grid gap-6 mt-10 md:grid-cols-2 xl:grid-cols-3">
          {creators.map((creator) => (
            <div
              key={creator.name}
              className="rounded-3xl border border-purple-500/30 bg-black/50 p-5"
            >
              <div className="h-48 rounded-2xl bg-gradient-to-br from-purple-700 to-black flex items-center justify-center text-6xl">
                🐺
              </div>

              <h2 className="mt-4 text-2xl font-bold">
                {creator.name}
              </h2>

              <p className="text-purple-300">
                {creator.category}
              </p>

              <p className="mt-2 text-pink-400">
                ♥ {creator.likes}
              </p>

              <button className="mt-4 w-full rounded-xl bg-purple-600 py-3 font-bold hover:bg-purple-500">
                View Creator
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-purple-500/30 bg-black/50 p-8">
          <h2 className="text-3xl font-black">
            Publish Your Work
          </h2>

          <p className="mt-3 text-purple-200">
            Upload avatars, overlays, emotes, music videos, movies, and
            showcase your creativity to the FurRig community.
          </p>

          <button className="mt-6 rounded-xl bg-purple-600 px-6 py-3 font-bold hover:bg-purple-500">
            Upload Project
          </button>
        </div>
      </div>
    </main>
  );
}