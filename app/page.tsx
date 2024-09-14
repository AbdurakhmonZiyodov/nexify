"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "authenticated") {
    router.push("/dashboard");
  }

  if (status === "unauthenticated") {
    router.push("/login");
  }

  return (
    <main className="max-w-7xl mx-auto my-12">
      <h1 className="text-4xl font-bold text-center">
        Welcome to the Next.js Starter
      </h1>
      <p className="text-center mt-4">
        This is a starter template for a Next.js project with Tailwind CSS.
      </p>
    </main>
  );
}
