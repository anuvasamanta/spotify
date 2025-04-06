"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, CardMedia, ListItem, ListItemText } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Link from "next/link";
import { myAppHook } from "@/hook/userContext";
import { supabase } from "../../lib/supabaseClient";
import toast from "react-hot-toast";
import "@/style/style.css";
import SearchIcon from "@mui/icons-material/Search";
import SearchBar from "./SearchBar";
const drawerWidth = 240;

export default function SideBar() {

  // LogOut
  const { isLoggedIn, setIsLoggedIn, setAuthToken } = myAppHook();
  const handelLogOut = async () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
    setAuthToken(null);
    await supabase.auth.signOut();
    toast.success("user logged out successfully");
  };

  // hanel search
  const [showSearch, setShowSearch] = React.useState(false);
  const handelSearch = () => {
    setShowSearch((prev) => !prev);
  };
  // mui settings

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const drawer = (
    <Box sx={{ backgroundColor: "black", color: "white", height: 650 }}>
      <Toolbar>
        <Box sx={{width:"100px"}}>
       {/* <img src="assert/logo (1).png" alt="logo" /> */}
       <CardMedia src="assert/logo (1).png" alt="logo" component='img'/>
       </Box>
      </Toolbar>
      <List>
        <List>
          <Link href="/" className="hovering">
            <ListItem>
              <HomeIcon />
              <ListItemText className="Navbar">Home</ListItemText>
            </ListItem>
          </Link>
          <Link href="/" className="hovering" onClick={handelSearch}>
            <ListItem>
              <SearchIcon />{" "}
              <ListItemText className="Navbar">Search</ListItemText>
            </ListItem>
          </Link>
          <Link href="/likedSong" className="hovering">
            <ListItem>
              <FavoriteBorderOutlinedIcon />
              <ListItemText className="Navbar">Liked Song</ListItemText>
            </ListItem>
          </Link>
        </List>
      </List>
    </Box>
  );

  // Remove this const when copying and pasting into your project.

  return (
    <Box sx={{ display: "flex", blockOverflow: "clip" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "rgba(24, 24, 24, 1)",
        }}
      >
        <Toolbar sx={{ justifyContent: "right" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          {showSearch && <SearchBar/>}
          <Typography variant="h6" noWrap component="div">
            {isLoggedIn ? (
              <Typography variant="h6" noWrap component="div">
                <Link href="/">
                  {" "}
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "rgba(24, 24, 24, 1)",
                      "&:hover": {
                        backgroundColor: "white",
                        color: "black",
                      },
                    }}
                    onClick={handelLogOut}
                  >
                    Log Out
                  </Button>
                </Link>
              </Typography>
            ) : (
              <Typography variant="h6" noWrap component="div">
                <Link href="/signIn">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "rgba(24, 24, 24, 1)",
                      "&:hover": {
                        backgroundColor: "white",
                        color: "black",
                      },
                    }}
                  >
                    Sign in
                  </Button>
                </Link>
                <Link href="/signUp">
                  {" "}
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "rgba(24, 24, 24, 1)",
                      "&:hover": {
                        backgroundColor: "white",
                        color: "black",
                      },
                    }}
                  >
                    Sign up
                  </Button>
                </Link>
              </Typography>
            )}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          slotProps={{
            root: {
              keepMounted: true, // Better open performance on mobile.
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
