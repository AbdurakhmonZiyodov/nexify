"use client";

import useVisibility from "@/hooks/useVisibility";
import { rootStore } from "@/store/root.store";
import { useEffect } from "react";
import styles from "./dashboard.module.css";
import { DashboardContent, DashboardHeader, DashboardSidebar } from "./ui";

function Dashboard() {
  const sidebarVisibility = useVisibility();
  const { didMount } = rootStore;

  useEffect(() => {
    didMount();
  }, [didMount]);

  return (
    <div className={styles.container}>
      <DashboardHeader
        className={styles.header}
        isSidebarVisible={sidebarVisibility.visible}
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
