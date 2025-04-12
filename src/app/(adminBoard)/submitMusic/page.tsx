"use client";
import NavAdmin from "@/component/NavAdmin";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import AlbumIcon from '@mui/icons-material/Album';
import SubmittedSong from "@/component/SubmittedSong";
import AlbumSong from "@/component/AlbumSong";
import Admin from "@/component/Admin";
function Music() {
  const [activeTab,setActiveTab]=useState('tab1');
  const handelTabChange=(tab:string)=>{
    setActiveTab(tab)
  }
  return (
    <Container maxWidth="xl" component="main">
      <Box sx={{ display: "flex" }}>
        <NavAdmin />
        <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
          <Container maxWidth="lg" sx={{mt:2, mb:2,ml:5}}>
          <Grid container spacing={2} sx={{ marginLeft: 9 }}>
           <Admin/>
            <Grid size={12} sx={{ display: "block" }}>
              <Typography
                variant="h3"
                component="h2"
                gutterBottom
                sx={{
                  fontSize: "19px",
                  fontWeight: "600",
                  marginBottom: "30px",
                }}
              >
                My submissions
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <Grid container spacing={2} gap={0} sx={{ fontSize: "13px" }}>
                  <MusicNoteIcon />
                  <Grid size={6}>
                    <Button
                      variant="text"
                      sx={{ color: "black", padding: "0px",   '&:hover':{
                        color:"#fc2b2b;"
                      } }}
                      onClick={()=>handelTabChange('tab1')}
                    >
                      {" "}
                      Musics
                    </Button>
                  </Grid>
                </Grid>
                <Grid container spacing={2} gap={0} sx={{ fontSize: "13px" }}>
               
                  <AlbumIcon/>
                  <Grid size={6}>
                    <Button
                      variant="text"
                      sx={{ color: "black", padding: "0px",'&:hover':{
                        color:"#fc2b2b;"
                      } }}
                      onClick={()=>handelTabChange('tab2')}
                    >
                      Arts
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              <hr />
              {
                activeTab == 'tab1' && 
                  <SubmittedSong />
                
              }
              {
                activeTab === 'tab2' &&
                <AlbumSong/>
              }
            </Grid>
          </Grid>
          </Container>
        </Container>
      </Box>
    </Container>
  );
}

export default Music;
