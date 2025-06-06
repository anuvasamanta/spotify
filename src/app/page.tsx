"use client"
import {
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import Header from "../../layout/header/Header";
import CurrentTime from "@/component/CurrentTime";
import Songs from "./song/page";
import CardSong from "@/component/CardSong";
import Albums from "./albums/page";
import SearchSong from "@/component/SearchSong";
import Bengali from "@/component/Bengali";
import Tranding from "@/component/Tranding";


export default function Home() {
  return (
    <Container maxWidth="xl" component="main" sx={{backgroundColor:"rgb(30, 30, 30)",color:"white" ,marginTop:6,marginLeft:"0px!important"}}>
      <Box sx={{ display: "flex" }}>
       <Header/>
        <Container maxWidth="lg" sx={{ mt: 2, mb: 2}}>
          <Grid container spacing={2}>
          <CurrentTime/>
            <Grid size={12} sx={{ display: "block" }}>
              <SearchSong/>
              {/* first section */}
            <CardSong/>
            {/* second section */}
              <Box sx={{ marginBottom: 4 }}>
            <Typography 
              variant="h4" 
              sx={{
                fontWeight: 600,
                marginBottom: 1,
                position: "relative",
                "&:after": {
                  content: '""',
                  position: "absolute",
                  bottom: -8,
                  left: 0,
                  width: "40px",
                  height: "3px",
                  background: "linear-gradient(90deg, #1db954, transparent)",
                  borderRadius: 3
                }
              }}
            >
              Music PlayList
            </Typography>
            <Songs/>
          </Box>
             {/* third section */}
             <Box sx={{ marginBottom: 4 }}>
            <Typography 
              variant="h4" 
              sx={{
                fontWeight: 600,
                marginBottom: 1,
                position: "relative",
                "&:after": {
                  content: '""',
                  position: "absolute",
                  bottom: -8,
                  left: 0,
                  width: "40px",
                  height: "3px",
                  background: "linear-gradient(90deg, #1db954, transparent)",
                  borderRadius: 3
                }
              }}
            >
             Popular Albums
            </Typography>
            <Albums/>
          </Box>
          {/* fourth section */}
          <Box sx={{ marginBottom: 4 }}>
            <Typography 
              variant="h4" 
              sx={{
                fontWeight: 600,
                marginBottom: 0,
                position: "relative",
                "&:after": {
                  content: '""',
                  position: "absolute",
                  bottom:0,
                  left: 0,
                  width: "40px",
                  height: "3px",
                  background: "linear-gradient(90deg, #1db954, transparent)",
                  borderRadius: 3
                }
              }}
            >
              Most Popular Bengali Songs
            </Typography>
            <Bengali/>
          </Box>
          {/* fifth section */}
          <Box sx={{ marginBottom: 4 }}>
            <Typography 
              variant="h4" 
              sx={{
                fontWeight: 600,
                marginBottom: 1,
                position: "relative",
                "&:after": {
                  content: '""',
                  position: "absolute",
                  bottom: -8,
                  left: 0,
                  width: "40px",
                  height: "3px",
                  background: "linear-gradient(90deg, #1db954, transparent)",
                  borderRadius: 3
                }
              }}
            >
              Recent Most Tranding Songs
            </Typography>
            <Tranding/>
          </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Container>
  );
}