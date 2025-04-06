"use client";
import { myAppHook } from "@/hook/userContext";
import {
  CardMedia,
  Grid,
  ImageListItem,
  Paper,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";

function Albums() {
  const { albums } = myAppHook();

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {albums &&
        albums.map((data: any) => (
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
                  <CardMedia alt="Image " sx={{height:"200px"}} component="img" src={`${data?.cover_img}`} />
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
        ))}
    </Grid>
  );
}

export default Albums;
