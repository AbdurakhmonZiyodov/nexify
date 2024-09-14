"use client";

import { User } from "@/api/api.types";
import { Avatar, Box, Toolbar, Typography } from "@mui/material";
import { FC } from "react";
import { getSidebarWidth } from "../dashboard.utils";

type HeaderProps = Pick<User, "username" | "image"> & {
  className?: string;
  isSidebarVisible: boolean;
};

const Header: FC<HeaderProps> = ({
  image,
  username,
  className,
  isSidebarVisible,
}) => {
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
            <Avatar src={image} sx={{ width: "35px", height: "35px" }} />
            <Typography variant="body2" color="info">
              {username}
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </div>
  );
};

export default Header;
