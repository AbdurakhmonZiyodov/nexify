"use client";
import { rootStore } from "@/store/root.store";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = rootStore.auth;
  const { push } = useRouter();

  useEffect(() => {
    push(isAuthenticated ? "/dashboard" : "/login");
  }, [isAuthenticated, push]);

  return <>{children}</>;
};

export default observer(AuthWrapper);
