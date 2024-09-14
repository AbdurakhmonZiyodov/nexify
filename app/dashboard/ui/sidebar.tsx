"use client";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { map } from "lodash";
import { observer } from "mobx-react-lite";
import { FC, useCallback, useMemo } from "react";
import { dashboardTabs } from "../dashboard.constants";
import { getSidebarWidth } from "../dashboard.utils";
import { rootStore } from "@/store/root.store";

type SidebarProps = {
  className?: string;
  isOpen: boolean;
  onToggle: () => void;
};

const Sidebar: FC<SidebarProps> = ({ className, isOpen, onToggle }) => {
  const { tab: activeDashboardTab, setTab: onChangeActiveDashboardTab } =
    rootStore.dashboard;

  const textStyle = useMemo(
    () => ({ opacity: isOpen ? 1 : 0, transition: "opacity 0.3s" }),
    [isOpen]
  );
  const sidebarWidth = useMemo(() => getSidebarWidth(isOpen), [isOpen]);

  const renderTab = useCallback(
    ({ Icon, type }: (typeof dashboardTabs)[0]) => {
      const isActive = type === activeDashboardTab;
      return (
        <ListItem
          key={type}
          component="button"
          onClick={() => onChangeActiveDashboardTab(type)}
          className={`${
            isActive
              ? "bg-blue-500 text-white" // Active state styles
              : "text-gray-700 hover:bg-gray-100"
          } transition-all duration-300 ease-in-out`}
        >
          <ListItemIcon
            className={`${isActive ? "text-white" : "text-gray-700"}`}
          >
            <Icon />
          </ListItemIcon>
          <ListItemText
            primary={isOpen ? type : ""}
            sx={textStyle}
            className={`${isActive ? "font-semibold" : ""}`}
          />
        </ListItem>
      );
    },
    [activeDashboardTab, isOpen, onChangeActiveDashboardTab, textStyle]
  );

  return (
    <Drawer
      className={className}
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: sidebarWidth,
          boxSizing: "border-box",
          transition: "width 0.3s",
        },
      }}
      variant="persistent"
      anchor="left"
      open={true}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: 2,
          justifyContent: "flex-end",
        }}
      >
        <IconButton onClick={onToggle}>
          {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Box>
      <Divider />
      <List>{map(dashboardTabs, renderTab)}</List>
      <Divider />
    </Drawer>
  );
};

export default observer(Sidebar);
