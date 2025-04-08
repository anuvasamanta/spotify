"use client"

import { MyAppHook } from "@/hook/userContext";
import React, { useEffect, useState } from "react";
import PauseIcon from "@mui/icons-material/Pause";
import Box from "@mui/material/Box";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import { Button, CardMedia, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material";
import "@/style/style.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Link from "next/link";
import { SongType } from "@/interface/song";

interface AlbumsType {
  id?: number | undefined;
  cover_img?: string | File | null; // Make cover_img optional
  title: string;
}

type CustomPageProps = {
  params: {
    songId: string;
  };
};

function AlbumSong({ params }: CustomPageProps) {
  const [unwrappedParams, setUnwrappedParams] = useState<CustomPageProps["params"] | null>(null);

  // Unwrap the params asynchronously using React.useEffect
  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params; // Assuming params is a promise here
      setUnwrappedParams(resolvedParams);
    };
    fetchParams();
  }, [params]);

  // Call MyAppHook unconditionally here, so the hook's order stays the same across renders
  const {
    song,
    albums,
    currentSong,
    isPlaying,
    audioRef,
    handlePlay,
    setIsPlaying,
  } = MyAppHook();

  if (!unwrappedParams) {
    return <div>Loading...</div>; // Show loading until params are unwrapped
  }

  const { songId } = unwrappedParams;

  // Utility function to handle src for CardMedia
  const getImageSrc = (image: string | File | null | undefined): string => {
    if (image === null || image === undefined) {
      return "/default-image.png"; // Default image if null or undefined
    }
    if (typeof image === "string") {
      return image; // Return the image string if it's a URL
    }
    if (image instanceof File) {
      return URL.createObjectURL(image); // Convert File to URL
    }
    return "/default-image.png"; // Fallback default image
  };

  return (
    <Box className="coverColor">
      <Link href="/">
        <ArrowBackSharpIcon />
      </Link>
      
      <Box>
        {/* Display album info */}
        {albums && albums.length > 0 && albums.map((data: AlbumsType) => {
          // Type guard to ensure it's safe to access cover_img
          if (songId === String(data?.id)) {
            return (
              <Box key={data?.id}>
                <Grid container spacing={3} columnSpacing={3} className="imagecover">
                  <Grid size={{ xs: 12, md: 3 }} sx={{ borderRadius: "10px", margin: "20px" }}>
                    <CardMedia
                      sx={{ height: "200px" }}
                      component="img"
                      src={getImageSrc(data?.cover_img)}  // Use utility function to handle src
                      alt="Image"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="h2" sx={{ textAlign: "center", marginTop: "70px" }}>
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
          return null;  // Prevent rendering anything when no match
        })}
      </Box>
      
      <hr />
      
      <Box>
        {/* Display song list */}
        {song && song.length > 0 && song.map((data: SongType) => {
          if (data.album_id === Number(songId)) {
            return (
              <List key={data?.id} className="play" sx={{ width: "100%", maxWidth: "100%" }} aria-label="contacts">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Paper sx={{ height: "50px", width: "60px", backgroundColor: "rgb(41, 40, 40)" }}>
                        <CardMedia
                          src={getImageSrc(data?.song_img)}  // Use utility function to handle song_img src
                          component="img"
                          alt="img"
                        />
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
          return null;  // Prevent rendering anything when no match
        })}
        
        {/* Audio Player */}
        <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
      </Box>
    </Box>
  );
}

export default AlbumSong;
