"use client";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "@/style/style.css";
import { Button, Grid } from "@mui/material";
import { myAppHook } from "@/hook/userContext";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import { SongType } from "@/interface/song";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
const titleDescription = (song_title: string, wordLimit: number) => {
  const words = song_title.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return song_title;
};

export default function CardSong() {
  const { song, currentSong, isPlaying, audioRef, handlePlay, setIsPlaying } =
    myAppHook();
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {song &&
        song.map((data: any) => {
          if (data?.song_category === "Hindi" && data?.id <= 15) {
            return (
              <Grid size={{ xs: 6, md: 4 }} key={data?.id}>
                <Card
                  sx={{
                    display: "flex",
                    height: "100px",
                    margin: "20px 0px",
                    justifyContent: "space-between",
                  }}
                  className="play"
                >
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography component="div" variant="h5">
                        {titleDescription(data?.song_title, 1)}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        component="div"
                        sx={{ color: "text.secondary" }}
                      >
                        {data?.artist_name}
                      </Typography>
                    </CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        pl: 1,
                        pb: 1,
                      }}
                    >
                      <Button onClick={() => handlePlay(data)}>
                        {currentSong?.id === data.id && isPlaying ? (
                          <PauseCircleIcon />
                        ) : (
                          <PlayCircleOutlineIcon />
                        )}
                      </Button>
                    </Box>
                  </Box>
                  <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image={`${data?.song_img}`}
                    alt="song"
                  />
                </Card>
              </Grid>
            );
          }
        })}
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
    </Grid>
  );
}
