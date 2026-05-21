import { UserProfile } from "@clerk/nextjs";

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-[#05000d] p-8 text-white">
      <a href="/dashboard/profile" className="text-purple-300">
        ← Back to Profile
      </a>

      <h1 className="mt-6 text-5xl font-black">
        Account <span className="text-purple-400">Settings</span>
      </h1>

      <p className="mt-3 text-purple-200">
        Change password, email, security, and 2FA here.
      </p>

      <div className="mt-10">
        <UserProfile />
      </div>
    </main>
  );
}