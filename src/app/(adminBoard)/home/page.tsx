"use client"

import Admin from "@/component/Admin";
import NavAdmin from "@/component/NavAdmin";
import {
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
function Home() {
  return (
    <Container maxWidth="xl" component="main">
      <Box sx={{ display: "flex" }}>
        <NavAdmin />
        <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
          <Container maxWidth="lg" sx={{mt:2,mb:2,ml:5}}>
          <Grid container spacing={2} sx={{ marginLeft: 9 }}>
           <Admin/>

            <Grid>
              <Typography
                variant="h4"
                component="h4"
                gutterBottom
                sx={{ fontSize: "19px", fontWeight: "600" }}
              >
                About our website
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{
                  color: "rgba(123, 123, 123, 1)",
                  margin: "20px 0px 50px 0px",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing
              </Typography>
              <hr />
            </Grid>
            <Grid>
              <Typography
                variant="h3"
                component="h2"
                gutterBottom
                sx={{ fontSize: "19px", fontWeight: "600" }}
              >
                Terms and conditions
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{
                  color: "rgba(123, 123, 123, 1)",
                  margin: "20px 0px 50px 0px",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Typography>
              <hr />
            </Grid>
            <Grid>
              <Typography
                variant="h3"
                component="h2"
                gutterBottom
                sx={{ fontSize: "19px", fontWeight: "600" }}
              >
                privacy and policy of website
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{
                  color: "rgba(123, 123, 123, 1)",
                  margin: "20px 0px 50px 0px",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Typography>
            </Grid>
          </Grid>
          </Container>
        </Container>
      </Box>
    </Container>
  );
}

export default Home;
