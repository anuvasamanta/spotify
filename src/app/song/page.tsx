
"use client";
import {
  Button,
  Typography,
  Grid,
  ImageListItem,
  Paper,
  CardMedia,
  IconButton,
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

// interface AlbumSongType {
//   user_id?: number | string;
//   album_title: string;
//   artist_name: string;
//   song_title: string;
//   song_category: string;
//   song_img: string | File | null;
//   song_url: string | File | null;
//   id?: string | number | null;
//   album_id?: number;
// }

const titleDescription = (song_title: string, wordLimit: number): string => {
  const words = song_title.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return song_title;
};

function Songs() {
  const { song, currentSong, isPlaying, audioRef, handlePlay, setIsPlaying } = MyAppHook();
  const [likes, setLikes] = useState<Record<string, boolean>>({});

  // Check initial like status for all songs
  useEffect(() => {
    const checkLikeStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('likes')
        .select('song_id')
        .eq('user_id', user.id);

      if (!error && data) {
        const likedSongs = data.reduce((acc: Record<string, boolean>, item: { song_id: string }) => {
          acc[item.song_id] = true;
          return acc;
        }, {});
        setLikes(likedSongs);
      }
    };

    checkLikeStatus();
  }, []);

  const handleLike = async (songId: string) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      toast.error('Please login to like songs');
      return;
    }

    try {
      if (likes[songId]) {
        // Unlike
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('user_id', user.id)
          .eq('song_id', songId);

        if (!error) {
          setLikes(prev => ({ ...prev, [songId]: false }));
          toast.success('Removed from your likes');
        }
      } else {
        // Like
        const { error } = await supabase
          .from('likes')
          .insert({
            user_id: user.id,
            song_id: songId
          });

        if (!error) {
          setLikes(prev => ({ ...prev, [songId]: true }));
          toast.success('Added to your likes');
        }
      }
    } catch (error) {
      toast.error('Failed to update like');
      console.error('Like error:', error);
    }
  };

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {song &&
        song.map((data: AlbumSongType) => (
          <Grid
            key={data?.id}
          size={{xs:6,md:4,lg:3}}
            sx={{ margin: "20px 0px" }}
          >
            <ImageListItem key={data?.id} sx={{ height: "100px" }}>
              <Paper
                className="play"
                elevation={8}
                sx={{
                  backgroundColor: "rgb(43, 43, 43)",
                  color: "white",
                  borderRadius: "10px",
                  position: 'relative',
                }}
              >
                <CardMedia
                  component="img"
                  src={data?.song_img as string}
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
              <IconButton 
                onClick={(e) => {
                  e.stopPropagation();
                  if (data.id) handleLike(data.id.toString());
                }}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  color: data.id && likes[data.id.toString()] ? 'red' : 'white',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  }
                }}
              >
                {data.id && likes[data.id.toString()] ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </ImageListItem>
          </Grid>
        ))}
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
    </Grid>
  );
}

export default Songs;