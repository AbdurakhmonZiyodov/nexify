"use client";
import { rootStore } from "@/store/root.store";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = rootStore.auth;
  const { push } = useRouter();

  useEffect(() => {
    if (!loading) {
      push(isAuthenticated ? "/dashboard" : "/login");
    }
  }, [loading, isAuthenticated, push]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default observer(AuthWrapper);
