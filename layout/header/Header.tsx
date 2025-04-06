
import Dashboard from "@/component/Mode";
import SideBar from "@/component/SideBar";
import { Box } from "@mui/material";
import React from "react";

function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <SideBar />
    </Box>
  );
}

export default Header;