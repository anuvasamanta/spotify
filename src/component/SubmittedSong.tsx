
"use client";
import {
  Button,
  Typography,
  Grid,
  ImageListItem,
  Paper,
  CardMedia,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { SongType } from "@/interface/song";
import { MyAppHook } from "@/hook/userContext";
import toast from "react-hot-toast";
import '@/style/style.css';
import Swal from "sweetalert2";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";
import { User } from "@supabase/supabase-js";

function SubmittedSong() {
  const [user, setUser] = useState<User | null>(null);
  const [song, setSong] = useState<SongType[] | null>(null);
  const [isClient, setIsClient] = useState(false);
  const { setAuthToken, setIsLoggedIn, setIsLoading } = MyAppHook();

  useEffect(() => {
    setIsClient(true);
    const handelLoginSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        toast.error("Failed to get user data");
        return;
      }
      setIsLoading(true);
      if (data.session?.access_token) {
        setAuthToken(data.session.access_token);
        setUser(data.session.user);
        localStorage.setItem("access_token", data.session.access_token);
        setIsLoggedIn(true);
        fetchAllSong(data.session.user.id);
      }
      setIsLoading(false);
    };
    handelLoginSession();
  }, [setAuthToken, setIsLoading, setIsLoggedIn]);

  const fetchAllSong = async (userId: string) => {
    const { data, error } = await supabase
      .from("song")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      toast.error("Failed to fetch songs");
      return;
    }
    setSong(data);
  };

  const handelDelete = async (id: string | number) => {
    setIsLoading(true);
    
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const { error } = await supabase
          .from("song")
          .delete()
          .eq("id", id);

        if (error) {
          toast.error("Failed to delete song");
        } else {
          await Swal.fire({
            title: "Deleted!",
            text: "Your song has been deleted.",
            icon: "success",
          });
          if (user) {
            fetchAllSong(user.id); // Refresh the list instead of reloading the page
          }
        }
      }
    } catch (err) {
      toast.error("An error occurred");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Prevent rendering on server to avoid hydration mismatch
  if (!isClient) {
    return null;
  }

  return (
    <Grid container spacing={3} columnSpacing={3}>
      {song?.map((data: SongType) => (
        <Grid
          key={data.id}
          size={{xs:12,sm:6,md:4,lg:3}}
          sx={{ marginTop: "20px" }}
        >
          <ImageListItem sx={{ height: "100px" }}>
            <Paper elevation={8}>
              <CardMedia 
                src={data.song_img as string} 
                component='img' 
                alt="song cover" 
                sx={{ height: "160px" }}
              />
            </Paper>
            <Typography variant="body2" sx={{ margin: "8px 0px" }}>
              {data.song_title}
            </Typography>
            <Button
              size="small"
              color="secondary"
              onClick={() =>  data?.id && handelDelete(data.id)}
            >
              Delete
            </Button>
            <Link href={`/submitMusic/${data.id}`} passHref>
              <Button size="small" color="secondary">
                Edit
              </Button>
            </Link>
          </ImageListItem>
        </Grid>
      ))}
    </Grid>
  );
}

export default SubmittedSong;