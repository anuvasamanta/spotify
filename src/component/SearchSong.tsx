"use client";
import { myAppHook } from "@/hook/userContext";
import {
  Box,
  Button,
  Grid,
  ImageListItem,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import Link from "next/link";
const titleDescription = (song_title: string, wordLimit: number) => {
  const words = song_title.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return song_title;
};
function SearchSong() {
  const {
    song,
    currentSong,
    isPlaying,
    audioRef,
    handlePlay,
    setIsPlaying,
    selectedSong,
    albums,
  } = myAppHook();
  return (
    <Box>
      {selectedSong && (
        <Grid>
          <Typography>searching....</Typography>
          {song &&
            song.map((data: any) => {
              if (data?.id === selectedSong.id) {
                return (
                  <Grid
                    key={data?.id}
                    sx={{ margin: "20px 0px" }}
                    size={{ xs: 6, md: 4, lg: 3 }}
                  >
                    <ImageListItem key={data?.id} sx={{ height: "100px" }}>
                      <Paper
                        className="play"
                        elevation={8}
                        sx={{
                          backgroundColor: "rgb(43, 43, 43)",
                          color: "white",
                          borderRadius: "10px",
                        }}
                      >
                        <img
                          className="img"
                          height="70px"
                          src={`${data?.song_img}?w=164&h=164&fit=crop&auto=format`}
                          alt="song"
                          loading="lazy"
                        />

                        <Typography
                          variant="body1"
                          sx={{ margin: "10px 10px" }}
                        >
                          {titleDescription(data?.song_title, 4)}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ margin: "0px 10px", paddingBottom: "10px" }}
                        >
                          By {data?.artist_name}
                        </Typography>
                        <Button onClick={() => handlePlay(data)}>
                          {currentSong?.id === data.id && isPlaying ? (
                            <PauseCircleIcon />
                          ) : (
                            <PlayCircleOutlineIcon />
                          )}
                        </Button>
                      </Paper>
                    </ImageListItem>
                  </Grid>
                );
              }
            })}{" "}
          {" "}
          <Grid>
            {albums &&
              albums.map((data: any) => {
                if (data.id === selectedSong.id) {
                  return (
                    <Grid
                      key={data?.id}
                      sx={{ marginTop: "20px" }}
                      size={{ xs: 6, md: 4, lg: 3 }}
                    >
                      <Link href={`/albums/${data?.id}`}>
                        <ImageListItem sx={{ height: "100px" }}>
                          <Paper
                            className="play"
                            elevation={8}
                            sx={{
                              backgroundColor: "rgb(43, 43, 43)",
                              color: "white",
                              borderRadius: "10px",
                            }}
                          >
                            <img
                              className="img"
                              height="70px"
                              src={`${data?.cover_img}?w=164&h=164&fit=crop&auto=format`}
                              alt="song"
                              loading="lazy"
                            />

                            <Typography
                              variant="body1"
                              sx={{
                                margin: "10px 10px",
                                textAlign: "center",
                                paddingBottom: "10px",
                              }}
                            >
                              {data?.title}
                            </Typography>
                          </Paper>
                        </ImageListItem>
                      </Link>
                    </Grid>
                  );
                }
              })}
          </Grid>
        </Grid>
      )}
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
    </Box>
  );
}

export default SearchSong;
