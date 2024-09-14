"use client";

import useVisibility from "@/hooks/useVisibility";
import { rootStore } from "@/store/root.store";
import { useEffect } from "react";
import styles from "./dashboard.module.css";
import { DashboardContent, DashboardHeader, DashboardSidebar } from "./ui";

function Dashboard() {
  const sidebarVisibility = useVisibility(true);
  const { fetchAllData } = rootStore.dashboard;

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  return (
    <div className={styles.container}>
      <DashboardHeader
        className={styles.header}
        username="John Doe"
        isSidebarVisible={sidebarVisibility.visible}
        image="https://avatars.githubusercontent.com/u/67115618?v=4"
      />
      <div className={styles.content}>
        <DashboardSidebar
          className={styles.sidebar}
          isOpen={sidebarVisibility.visible}
          onToggle={sidebarVisibility.toggle}
        />
        <DashboardContent className={styles.mainContent} />
      </div>
    </div>
  );
}

export default Dashboard;
