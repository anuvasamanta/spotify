"use client"

import { MyAppHook } from "@/hook/userContext";
import React, { useEffect, useState } from "react";
import PauseIcon from "@mui/icons-material/Pause";
import Box from "@mui/material/Box";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import { Button, CardMedia, Divider, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import "@/style/style.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Link from "next/link";
import { SongType } from "@/interface/song";

// interface AlbumsType {
//   id?: number | undefined;
//   cover_img?: string | File | null; // Make cover_img optional
//   title: string;
// }

// type CustomPageProps = {
//   params?: {
//     songId: string
//   };
// }; 

// function AlbumSong({ params }: CustomPageProps) {
//   const [unwrappedParams, setUnwrappedParams] = useState<CustomPageProps["params"] | null>(null);

//   // Unwrap the params asynchronously using React.useEffect
//   useEffect(() => {
//     const fetchParams = async () => {
//       const resolvedParams = await params; // Assuming params is a promise here
//       setUnwrappedParams(resolvedParams);
//     };
//     fetchParams();
//   }, [params]);

//   // Call MyAppHook unconditionally here, so the hook's order stays the same across renders
//   const {
//     song,
//     albums,
//     currentSong,
//     isPlaying,
//     audioRef,
//     handlePlay,
//     setIsPlaying,
//   } = MyAppHook();

//   if (!unwrappedParams) {
//     return <div>Loading...</div>; // Show loading until params are unwrapped
//   }

//   const { songId } = unwrappedParams;

//   // Utility function to handle src for CardMedia
//   const getImageSrc = (image: string | File | null | undefined): string => {
//     if (image === null || image === undefined) {
//       return "/default-image.png"; // Default image if null or undefined
//     }
//     if (typeof image === "string") {
//       return image; // Return the image string if it's a URL
//     }
//     if (image instanceof File) {
//       return URL.createObjectURL(image); // Convert File to URL
//     }
//     return "/default-image.png"; // Fallback default image
//   };
import { useParams } from 'next/navigation';

interface AlbumsType {
  id?: number;
  cover_img?: string | File | null;
  title: string;
}

 function AlbumSong() {
  const params = useParams();
  const [songId, setSongId] = useState<string | null>(null);

  // Get the songId from params
  useEffect(() => {
    if (params?.songId) {
      // Handle case where songId might be an array
      const id = Array.isArray(params.songId) ? params.songId[0] : params.songId;
      setSongId(id);
    }
  }, [params]);

  const {
    song,
    albums,
    currentSong,
    isPlaying,
    audioRef,
    handlePlay,
    setIsPlaying,
  } = MyAppHook();

  if (!songId) {
    return <div>Loading...</div>;
  }

  const getImageSrc = (image: string | File | null | undefined): string => {
    if (image === null || image === undefined) {
      return "/default-image.png";
    }
    if (typeof image === "string") {
      return image;
    }
    if (image instanceof File) {
      return URL.createObjectURL(image);
    }
    return "/default-image.png";
  }
  
  return (
  <Box className="coverColor" sx={{ 
  // backgroundColor: 'rgba(0,0,0,0.8)',
  color: 'white',
  minHeight: '100vh',
  padding: { xs: 2, md: 4 }
}}>
  {/* Back Button */}
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

  {/* Album Header */}
  {albums?.map((data: AlbumsType) => (
    songId === String(data?.id) && (
      <Box key={data?.id} sx={{ mb: 4 }}>
        <Grid container spacing={3} alignItems="center">
          {/* Album Cover */}
          <Grid size={{xs:12, md:3}} >
            <CardMedia
              component="img"
              src={getImageSrc(data?.cover_img)}
              alt={data?.title}
              sx={{
                height: { xs: '200px', md: '250px' },
                width: '100%',
                objectFit: 'cover',
                borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
              }}
            />
          </Grid>
          
          {/* Album Info */}
          <Grid size={{xs:12, md:9}} sx={{ 
            textAlign: { xs: 'center', md: 'left' },
            mt: { xs: 2, md: 0 }
          }}>
            <Typography variant="h3" sx={{ 
              fontWeight: 700,
              mb: 1,
              fontSize: { xs: '1.8rem', md: '2.5rem' }
            }}>
              {data?.title}
            </Typography>
            <Typography variant="subtitle1" sx={{ 
              color: 'rgba(255,255,255,0.7)',
              mb: 2
            }}>
              {/* Album • {data?.artist_name || 'Various Artists'} */}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    )
  ))}

  {/* Divider */}
  <Divider sx={{ 
    borderColor: 'rgba(255,255,255,0.1)',
    my: 3
  }} />

  {/* Songs List */}
  <Box component="section">
    <Typography variant="h5" sx={{ 
      fontWeight: 600,
      mb: 2,
      pl: 1
    }}>
      Songs
    </Typography>
    
    <List sx={{ width: '100%' }}>
      {song?.map((data: SongType) => (
        data.album_id === Number(songId) && (
          <ListItem 
            key={data?.id}
            disablePadding
            sx={{
              borderRadius: '8px',
              mb: 1,
              transition: 'background-color 0.2s',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.05)'
              }
            }}
          >
            <ListItemButton 
              sx={{ 
                py: 1.5,
                px: { xs: 1, sm: 2 }
              }}
            >
              {/* Song Thumbnail */}
              <ListItemIcon sx={{ minWidth: 60, mr: { xs: 1, sm: 2 } }}>
                <CardMedia
                  component="img"
                  src={getImageSrc(data?.song_img)}
                  alt={data?.song_title}
                  sx={{
                    height: '50px',
                    width: '50px',
                    borderRadius: '4px',
                    objectFit: 'cover'
                  }}
                />
              </ListItemIcon>
              
              {/* Song Info */}
              <ListItemText 
                primary={
                  <Typography 
                    variant="body1"
                    sx={{ 
                      fontWeight: 500,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {data?.song_title}
                  </Typography>
                }
                secondary={
                  <Typography 
                    variant="body2"
                    sx={{ 
                      color: 'rgba(255,255,255,0.6)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {data?.artist_name}
                  </Typography>
                }
                sx={{ 
                  mr: 2,
                  '& .MuiListItemText-secondary': {
                    display: { xs: 'none', sm: 'block' }
                  }
                }}
              />
              
              {/* Play Button */}
              <ListItemIcon sx={{ minWidth: 'auto' }}>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlay(data);
                  }}
                  sx={{
                    color: currentSong?.id === data.id && isPlaying ? 'primary.main' : 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  {currentSong?.id === data.id && isPlaying ? (
                    <PauseIcon fontSize="medium" />
                  ) : (
                    <PlayArrowIcon fontSize="medium" />
                  )}
                </IconButton>
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        )
      ))}
    </List>
  </Box>

  {/* Audio Player (hidden) */}
  <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
</Box>
  );
}

export default AlbumSong;
