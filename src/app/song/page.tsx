"use client";
import {
  Button,
  Typography,
  Grid,
  Paper,
  CardMedia,
  IconButton,
  Box,
} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "@/style/style.css";
import { MyAppHook } from "@/hook/userContext";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { supabase } from "../../../lib/supabaseClient";
import { AlbumSongType } from "@/interface/song";

const titleDescription = (song_title: string, wordLimit: number): string => {
  const words = song_title.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return song_title;
};

function Songs() {
  const { song, currentSong, isPlaying, audioRef, handlePlay, setIsPlaying } =
    MyAppHook();
  const [likes, setLikes] = useState<Record<string, boolean>>({});
  const [visibleSongs, setVisibleSongs] = useState(8); // Start with 8 songs visible

  const handleLoadMore = () => {
    setVisibleSongs((prev) => prev + 4); // Load 4 more songs
  };

  // Check initial like status for all songs
  useEffect(() => {
    const checkLikeStatus = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("likes")
        .select("song_id")
        .eq("user_id", user.id);

      if (!error && data) {
        const likedSongs = data.reduce(
          (acc: Record<string, boolean>, item: { song_id: string }) => {
            acc[item.song_id] = true;
            return acc;
          },
          {}
        );
        setLikes(likedSongs);
      }
    };

    checkLikeStatus();
  }, []);

  const handleLike = async (songId: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast.error("Please login to like songs");
      return;
    }

    try {
      if (likes[songId]) {
        // Unlike
        const { error } = await supabase
          .from("likes")
          .delete()
          .eq("user_id", user.id)
          .eq("song_id", songId);

        if (!error) {
          setLikes((prev) => ({ ...prev, [songId]: false }));
          toast.success("Removed from your likes");
        }
      } else {
        // Like
        const { error } = await supabase.from("likes").insert({
          user_id: user.id,
          song_id: songId,
        });

        if (!error) {
          setLikes((prev) => ({ ...prev, [songId]: true }));
          toast.success("Added to your likes");
        }
      }
    } catch (error) {
      toast.error("Failed to update like");
      console.error("Like error:", error);
    }
  };
  // console.log("likes",likes);

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      sx={{
        padding: { xs: "10px", md: "20px" },
        justifyContent: { xs: "center", sm: "flex-start" },
      }}
    >
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        sx={{
          padding: { xs: "5px", md: "5px" },
          justifyContent: { xs: "center", sm: "flex-start" },
          minHeight: "calc(100vh - 64px)", // Adjust based on your header height
        }}
      >
        {song?.slice(0, visibleSongs).map((data: AlbumSongType) => (
          <Grid
            size={{ xs: 6, sm: 6, md: 4, lg: 3 }}
            key={data?.id}
            sx={{
              margin: { xs: "10px 0", md: "15px 0" },
              position: "relative",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-5px)",
                "& .play-button": {
                  opacity: 1,
                  transform: "scale(1.1)",
                },
              },
            }}
          >
            <Paper
              elevation={4}
              sx={{
                backgroundColor: "rgba(30, 30, 30, 0.8)",
                color: "white",
                borderRadius: "12px",
                height: "95%",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                position: "relative",
                transition: "all 0.3s ease",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                "&:hover": {
                  boxShadow: "0 10px 20px rgba(0,0,0,0.4)",
                  backgroundColor: "rgba(40, 40, 40, 0.9)",
                },
              }}
            >
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  src={data?.song_img as string}
                  alt={data?.song_title}
                  sx={{
                    height: { xs: "140px", sm: "160px", md: "130px" },
                    width: "100%",
                    objectFit: "cover",
                    transition: "all 0.5s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                />
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    if (data.id) handleLike(data.id.toString());
                  }}
                  sx={{
                    position: "absolute",
                    top: 2,
                    right: 8,
                    color:
                      data.id && likes[data.id.toString()]
                        ? "#ff4081"
                        : "rgba(255,255,255,0.8)",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  {data.id && likes[data.id.toString()] ? (
                    <FavoriteIcon fontSize="small" />
                  ) : (
                    <FavoriteBorderIcon fontSize="small" />
                  )}
                </IconButton>
              </Box>

              <Box sx={{ p: 2, flexGrow: 1 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    mb: 1,
                    fontSize: "1rem",
                    letterSpacing: "0.5px",
                  }}
                >
                  {titleDescription(data?.song_title, 4)}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255,255,255,0.6)",
                    mb: 0,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontSize: "0.85rem",
                  }}
                >
                  By {data?.artist_name}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  p: 1,
                  pr: 2,
                }}
              >
                <Button
                  className="play-button"
                  onClick={() => handlePlay(data)}
                  sx={{
                    color: "#1db954",
                    padding: "8px",
                    minWidth: 0,
                    opacity: currentSong?.id === data.id ? 1 : 0.8,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(29, 185, 84, 0.1)",
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  {currentSong?.id === data.id && isPlaying ? (
                    <PauseCircleIcon fontSize="large" />
                  ) : (
                    <PlayCircleOutlineIcon fontSize="large" />
                  )}
                </Button>
              </Box>

              {/* Active song indicator */}
              {currentSong?.id === data.id && (
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    backgroundColor: "#1db954",
                    animation: "pulse 2s infinite",
                  }}
                />
              )}
            </Paper>
          </Grid>
        ))}

        {song && song.length > visibleSongs && (
          <Grid
            size={{ xs: 12 }}
            sx={{ display: "flex", justifyContent: "center", mt: 3 }}
          >
            <Button
              variant="contained"
              onClick={handleLoadMore}
              sx={{
                backgroundColor: "#1db954",
                color: "white",
                borderRadius: "20px",
                px: 4,
                py: 1,
                "&:hover": {
                  backgroundColor: "#1ed760",
                  transform: "scale(1.03)",
                },
              }}
            >
              Load More
            </Button>
          </Grid>
        )}

        <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
      </Grid>
    </Grid>
  );
}

export default Songs;
