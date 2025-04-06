"use client";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { myAppHook } from "@/hook/userContext";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchBar() {
  const {
    searchQuery,
    setSearchQuery,
    handelSearch
  } = myAppHook();
  return (
   
      <Box sx={{ flexGrow: 1 }} component="form" onSubmit={handelSearch}>
        <Search>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <SearchIconWrapper></SearchIconWrapper>
              <StyledInputBase
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Box>
            <Box sx={{ marginTop: "6px", marginRight: "7px" }}>
              <button type="submit">
                <SearchIcon />
              </button>
            </Box>
          </Box>
        </Search>
      </Box>
  );
}
