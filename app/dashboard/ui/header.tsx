"use client";

import { Avatar, Box, Toolbar, Typography } from "@mui/material";
import { getSidebarWidth } from "../dashboard.utils";
import { rootStore } from "@/store/root.store";
import { observer } from "mobx-react-lite";

const Header = ({
  isSidebarVisible,
  className,
}: {
  className?: string;
  isSidebarVisible: boolean;
}) => {
  const { user } = rootStore.auth;
  return (
    <div
      className={`${className} shadow pb-2`}
      style={{
        width: `calc(100% - ${getSidebarWidth(isSidebarVisible)}px)`,
      }}
    >
      <Toolbar>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          width={"100%"}
        >
          <Typography variant="h6" color="error" textTransform={"uppercase"}>
            Nexify
          </Typography>
          <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Avatar src={user.image} sx={{ width: "35px", height: "35px" }} />
            <Typography variant="body2" color="info">
              {user.username}
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </div>
  );
};

export default observer(Header);
