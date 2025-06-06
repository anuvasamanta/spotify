"use client";
import {
  Paper,
  Typography,
  CardMedia,
  IconButton,
  Box,
  Button,
  Link,
} from "@mui/material";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { MyAppHook } from "@/hook/userContext";
import { AlbumSongType } from "@/interface/song";
import { toast } from "react-hot-toast";
import "@/style/style.css";


function LikedSongs() {
  const { currentSong, isPlaying, audioRef, handlePlay, setIsPlaying} =
    MyAppHook();
  const [likedSongs, setLikedSongs] = useState<AlbumSongType[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch liked songs
  useEffect(() => {
  const fetchLikedSongs = async () => {
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      setLoading(false);
      return;
    }

    try {
      // 1. Get liked song IDs
      const { data: likesData, error: likesError } = await supabase
        .from("likes")
        .select("song_id")
        .eq("user_id", user.id);

      if (likesError) throw likesError;
      if (!likesData?.length) {
        setLikedSongs([]);
        return;
      }

      // 2. Get song details - USING CORRECT TABLE NAME
      const songIds = likesData.map(like => like.song_id);
      const { data: songsData, error: songsError } = await supabase
        .from("song") // or whatever your actual table name is
        .select("*")
        .in("id", songIds);

      if (songsError) throw songsError;

      setLikedSongs(songsData || []);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to load liked songs");
      
    } finally {
      setLoading(false);
    }
  };

  fetchLikedSongs();
}, []);

  const handleUnlike = async (songId: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast.error("Please login to modify likes");
      return;
    }

    try {
      const { error } = await supabase
        .from("likes")
        .delete()
        .eq("user_id", user.id)
        .eq("song_id", songId);

      if (!error) {
        setLikedSongs((prev) => prev.filter((song) => song.id !== songId));
        toast.success("Removed from your likes");
       window.location.reload(); 
      }
    } catch (error) {
      toast.error("Failed to update like");
      console.error("Unlike error:", error);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <Typography variant="h6">Loading your liked songs...</Typography>
      </Box>
    );
  }

  if (likedSongs.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
          flexDirection: "column",
        }}
      >
         <Box sx={{ mb: 4 }}>
    <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
      <Button 
        startIcon={<ArrowBackSharpIcon />}
        sx={{ 
          color: 'black',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.1)'
          }
        }}
      >
        Back
      </Button>
    </Link>
  </Box>
        <Typography variant="h5" sx={{ mb: 2 }}>
          No liked songs yet
        </Typography>
        <Typography variant="h5" sx={{ mb: 2 }}>
         You need to logIn
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Like some songs to see them here
        </Typography>
      </Box>
    );
  }

  return (
<Box
  sx={{
    padding: { xs: "10px", md: "20px" },
    width: "100%",
    backgroundColor: "#000", // Full black background
    minHeight: "100vh" // Ensure full height
  }}
>
     <Box sx={{ mb: 4 }}>
    <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
      <Button 
        startIcon={<ArrowBackSharpIcon />}
        sx={{ 
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.1)'
          }
        }}
      >
        Back
      </Button>
    </Link>
  </Box>

  <Paper
    elevation={0}
    sx={{
      backgroundColor: "rgba(20, 20, 20, 0.9)", // Darker background for paper
      borderRadius: "12px",
      overflow: "hidden",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.05)",
    }}
  >
    {likedSongs?.map((data: AlbumSongType) => (
      <Box
        key={data?.id}
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "12px 16px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "rgba(40, 40, 40, 0.7)",
            "& .play-button": {
              opacity: 1,
            },
          },
          position: "relative",
        }}
      >
        {/* Album Cover - Left Aligned */}
        <Box sx={{ 
          marginRight: "16px", 
          minWidth: "56px", // Fixed width for image container
          position: "relative"
        }}>
          <CardMedia
            component="img"
            src={data?.song_img as string}
            alt={data?.song_title}
            sx={{
              width: "56px",
              height: "56px",
              borderRadius: "4px",
              objectFit: "cover",
            }}
          />
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              if (data.id) handleUnlike(data.id.toString());
            }}
            sx={{
              position: "absolute",
              top: -8,
              right: -8,
              color: "#ff4081",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
              },
            }}
          >
            <FavoriteIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Song Details - Centered */}
        <Box sx={{ 
          flexGrow: 1,
          textAlign: "center", // Center text alignment
          padding: "0 16px", // Add some padding
          minWidth: 0 // Allow text truncation
        }}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: currentSong?.id === data.id ? "#1db954" : "white",
            }}
          >
            {data?.song_title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "rgba(255,255,255,0.6)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {data?.artist_name}
          </Typography>
        </Box>

        {/* Action Buttons - Right Aligned */}
        <Box sx={{ 
          display: "flex",
          alignItems: "center",
          minWidth: "80px", // Fixed width for buttons
          justifyContent: "flex-end" // Right align
        }}>
          <IconButton
            className="play-button"
            onClick={() => handlePlay(data)}
            sx={{
              color: "#1db954",
              opacity: currentSong?.id === data.id ? 1 : 0.7,
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
          </IconButton>
        </Box>

        {/* Current song indicator */}
        {currentSong?.id === data.id && (
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "2px",
              backgroundColor: "#1db954",
            }}
          />
        )}
      </Box>
    ))}
    <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
  </Paper>
</Box>
  );
}

export default LikedSongs;
