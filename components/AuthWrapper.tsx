"use client";
import { rootStore } from "@/store/root.store";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loadingOfCookies } = rootStore.auth;
  const { push } = useRouter();

  useEffect(() => {
    if (!loadingOfCookies && !isAuthenticated) {
      push("/login");
    } else if (!loadingOfCookies && isAuthenticated) {
      push("/dashboard");
    }
  }, [isAuthenticated, loadingOfCookies, push]);

  if (loadingOfCookies) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default observer(AuthWrapper);
