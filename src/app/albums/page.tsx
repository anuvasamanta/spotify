"use client";
import { MyAppHook } from "@/hook/userContext";
import { Albums } from "@/interface/song";
import {
  Box,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";

function Album() {
  const { albums } = MyAppHook();

  return (
   <Grid
  container
  spacing={{ xs: 2, md: 3 }}
  sx={{
    padding: { xs: '10px', sm: '15px', md: '20px' },
    justifyContent: { xs: 'center', sm: 'flex-start' }
  }}
>
  {albums?.map((data: Albums | null) => (
    <Grid
      size={{ xs:6,
      sm:6,
      md:4,
      lg:3}}
      key={data?.id}
      sx={{
        marginTop: { xs: '15px', md: '20px' },
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)'
        }
      }}
    >
      <Link href={`/albums/${data?.id}`} style={{ textDecoration: 'none' }}>
        <Paper
          elevation={4}
          sx={{
            backgroundColor: 'rgb(43, 43, 43)',
            color: 'white',
            borderRadius: '12px',
            overflow: 'hidden',
            height: '100%',
            width:"100%",
            display: 'flex',
            flexDirection: 'column',
            '&:hover': {
              boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
              '& .album-image': {
              }
            }
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <CardMedia
              className="album-image"
              component="img"
              image={`${data?.cover_img || '/default-album.jpg'}`}
              alt={data?.title || 'Album cover'}
              sx={{
                height: { xs: '160px', sm: '180px', md: '200px', lg: '220px' },
                width: '100%',
                objectFit: 'cover',
                transition: 'transform 0.5s ease',
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }}
            />
          </Box>
          
          <Box sx={{ 
            p: 2,
            textAlign: 'center',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                lineHeight: 1.2,
                mb: 0.5
              }}
            >
              {data?.title}
            </Typography>
          
          </Box>
        </Paper>
      </Link>
    </Grid>
  ))}
</Grid>
  );
}

export default Album;
