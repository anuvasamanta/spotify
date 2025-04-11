
"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import HomeIcon from "@mui/icons-material/Home";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import AlbumIcon from '@mui/icons-material/Album';
import CoffeeIcon from "@mui/icons-material/Coffee";
import CallIcon from "@mui/icons-material/Call";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { CardMedia, Typography } from "@mui/material";
import Link from "next/link";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function NavAdmin() {
  return (
    <Box sx={{ flexGrow: 1,marginTop:"20px"}}>
      <Grid container spacing={1}>
        <Grid container spacing={2} size={{ xs: 6, md: 7, lg: 5 }}>
          <Grid size={{ xs: 12, lg: 3 }}>
            <Item
              sx={{
                backgroundColor: "rgb(8, 8, 87)",
                color: "white",
                position: "fixed",
                borderRadius: "19px",
                marginBottom: "40px"
              }}
            >
              <Box component="ul" aria-labelledby="category-a" sx={{ pl: 1 }}>
                <Typography component="li" sx={{ margin: "20px 0px 55px 0px", width: "80px", listStyle: "none" }}>
                  <Link href='/'>
                    <CardMedia src="assert/logo (1).png" alt="logo" component='img'/>
                  </Link>
                </Typography>
              
                <li>
                  <Link href="/home">
                    <Typography sx={{ fontSize: "11px", display: "flex", alignItems: "center", gap: 1,margin: "20px 0px 35px 0px" }}>
                      <HomeIcon />
                      Home
                    </Typography>
                  </Link>
                </li>
                
                <li>
                  <Link href="/submitMusic">
                    <Typography sx={{ marginTop: "30px", fontSize: "10px", display: "flex", alignItems: "center", gap: 1,margin: "20px 0px 35px 0px"}}>
                      <FileCopyIcon />
                      Submission
                    </Typography>
                  </Link>
                </li>
                
                <li>
                  <Link href="/submission">
                    <Typography sx={{ marginTop: "30px", fontSize: "10px", display: "flex", alignItems: "center", gap: 1,margin: "20px 0px 35px 0px" }}>
                      <MusicNoteIcon />
                      Submit Music
                    </Typography>
                  </Link>
                </li>
                
                <li>
                  <Link href="/albumsubmit">
                    <Typography sx={{ marginTop: "30px", fontSize: "10px", display: "flex", alignItems: "center", gap: 1,margin: "20px 0px 35px 0px" }}>
                      <AlbumIcon/>
                      Submit Art
                    </Typography>
                  </Link>
                </li>
                
                <li>
                  <Link href="/joinus">
                    <Typography sx={{ marginTop: "30px", fontSize: "10px", display: "flex", alignItems: "center", gap: 1,margin: "20px 0px 35px 0px"}}>
                      <CoffeeIcon />
                      Join Us
                    </Typography>
                  </Link>
                </li>
                
                <li>
                  <Link href="/contactus">
                    <Typography sx={{ marginTop: "30px", fontSize: "10px", display: "flex", alignItems: "center", gap: 1,margin: "20px 0px 35px 0px" }}>
                      <CallIcon />
                      Contact Us
                    </Typography>
                  </Link>
                </li>
                
                <li>
                  <Link href="/profile">
                    <Typography sx={{ marginTop: "30px", fontSize: "10px", display: "flex", alignItems: "center", gap: 1,margin: "20px 0px 20px 0px" }}>
                      <AccountCircleIcon />
                      Account
                    </Typography>
                  </Link>
                </li>
              </Box>
            </Item>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
