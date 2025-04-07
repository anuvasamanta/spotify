"use client";
import {
  Button,
  Typography,
  Grid,
  ImageListItem,
  Paper,
  CardMedia,
} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import { SongType } from "@/interface/song";
import "@/style/style.css";
import { MyAppHook } from "@/hook/userContext";
const titleDescription = (song_title: string, wordLimit: number) => {
  const words = song_title.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return song_title;
};
function Songs() {
  const { song, currentSong, isPlaying, audioRef, handlePlay, setIsPlaying } =
    MyAppHook();
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {song &&
        song.map((data: SongType) => (
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
                <CardMedia
                  component="img"
                  src={`${data?.song_img}`}
                  alt="img"
                  sx={{ height: "160px" }}
                />
                <Typography variant="body1" sx={{ margin: "10px 10px" }}>
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
        ))}
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
    </Grid>
  );
}

export default Songs;
