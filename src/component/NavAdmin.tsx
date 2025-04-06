"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import HomeIcon from "@mui/icons-material/Home";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import InstagramIcon from "@mui/icons-material/Instagram";
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
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid container spacing={2} size={{ xs: 6, md: 7, lg: 5 }}>
          <Grid size={{ xs: 12, lg: 3 }}>
            <Item
              sx={{
                backgroundColor: "rgb(255, 54, 54)",
                color: "white",
                position: "fixed",
                borderRadius: "19px",
              }}
            >
             
              <Box component="ul" aria-labelledby="category-a" sx={{ pl: 1 }}>
                <Typography sx={{ margin: "20px 0px 45px 0px" ,width:"80px"}}>
                <Link href='/'>
                 
                  <CardMedia src="assert/logo (1).png" alt="logo" component='img'/>
                  </Link>
                </Typography>
              
                <Link href="/home">
                  {" "}
                  <Typography sx={{ fontSize: "11px" }}>
                    <li>
                      <HomeIcon />
                    </li>
                    Home
                  </Typography>
                </Link>
                <Link href="/submitMusic">
                  {" "}
                  <Typography sx={{ marginTop: "30px", fontSize: "10px" }}>
                    {" "}
                    <li>
                      <FileCopyIcon />
                    </li>
                    Submission
                  </Typography>
                </Link>
                <Link href="/submission">
                  <Typography sx={{ marginTop: "30px", fontSize: "10px" }}>
                    <li>
                      <MusicNoteIcon />
                    </li>
                    Submit Music
                  </Typography>{" "}
                </Link>
                <Link href="/albumsubmit">
                  {" "}
                  <Typography sx={{ marginTop: "30px", fontSize: "10px" }}>
                    <li>
                      <InstagramIcon />
                    </li>
                    Submit Art
                  </Typography>{" "}
                </Link>
                <Link href="/joinus">
                  <Typography sx={{ marginTop: "30px", fontSize: "10px" }}>
                    <li>
                      <CoffeeIcon />
                    </li>
                    Join Us
                  </Typography>{" "}
                </Link>
                <Link href="/contactus">
                  {" "}
                  <Typography sx={{ marginTop: "30px", fontSize: "10px" }}>
                    <li>
                      <CallIcon />
                    </li>
                    Contact Us
                  </Typography>
                </Link>
                <Link href="/profile">
                  {" "}
                  <Typography sx={{ marginTop: "30px", fontSize: "10px" }}>
                    {" "}
                    <li>
                      <AccountCircleIcon />
                    </li>
                    Account
                  </Typography>
                </Link>
              </Box>
            </Item>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
