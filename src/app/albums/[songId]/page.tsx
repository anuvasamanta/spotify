"use client";
import { myAppHook } from "@/hook/userContext";
import React, { useRef, useState } from "react";
import PauseIcon from "@mui/icons-material/Pause";
import Box from "@mui/material/Box";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import "@/style/style.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Link from "next/link";

function AlbumSong({ params }: { params: { songId: string } }) {
  const {
    song,
    albums,
    currentSong,
    isPlaying,
    audioRef,
    handlePlay,
    setIsPlaying,
  } = myAppHook();
  //   console.log(song);
  //   console.log(albums);
  console.log(params.songId);

  return (
    <Box className="coverColor">
      <Link href="/">
        <ArrowBackSharpIcon />
      </Link>
      <Box>
        {albums &&
          albums.map((data: any) => {
            if (params.songId == data?.id) {
              return (
                <Box key={data?.id}>
                  <Grid
                    container
                    spacing={3}
                    columnSpacing={3}
                    className="imagecover"
                  >
                    <Grid
                      size={{ xs: 12, md: 3 }}
                      sx={{ borderRadius: "10px", margin: "20px" }}
                    >
                      <img src={`${data?.cover_img}`} alt="" />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Typography
                        variant="h2"
                        sx={{ textAlign: "center", marginTop: "70px" }}
                      >
                        {data?.title}
                      </Typography>
                      <Typography variant="body2" sx={{ textAlign: "center" }}>
                        Album
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              );
            }
          })}
      </Box>
      <hr />
      <Box>
        {song &&
          song.map((data: any) => {
            if (data.album_id == params.songId) {
              return (
                <List
                  key={data?.id}
                  className="play"
                  sx={{ width: "100%", maxWidth: "100%" }}
                  aria-label="contacts"
                >
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <Paper
                          sx={{
                            height: "50px",
                            width: "60px",
                            backgroundColor: "rgb(41, 40, 40)",
                          }}
                        >
                          <img src={`${data?.song_img}`} alt="" />
                        </Paper>
                      </ListItemIcon>
                      <ListItemText sx={{ textAlign: "center" }}>
                        {data?.song_title}
                        <p>By {data?.artist_name}</p>
                      </ListItemText>
                      <ListItemIcon>
                        <Button onClick={() => handlePlay(data)}>
                          {currentSong?.id === data.id && isPlaying ? (
                            <PauseIcon />
                          ) : (
                            <PlayArrowIcon />
                          )}
                        </Button>
                      </ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                </List>
              );
            }
          })}
        <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
      </Box>
    </Box>
  );
}

export default AlbumSong;
