"use client";

import { ClerkProvider, SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <ClerkProvider>
      <div className="flex min-h-screen items-center justify-center bg-[#05000d]">
        <SignUp />
      </div>
    </ClerkProvider>
  );
}