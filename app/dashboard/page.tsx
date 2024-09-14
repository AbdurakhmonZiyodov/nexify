"use client";

import React from "react";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data } = useSession();
  return (
    <>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
