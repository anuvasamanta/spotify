"use client"
import {
  Button,
  Typography,
  Grid,
  ImageListItem,
  Paper,
  CardMedia,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { SongType } from "@/interface/song";
import { MyAppHook } from "@/hook/userContext";
import toast from "react-hot-toast";
import '@/style/style.css'
import Swal from "sweetalert2";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";
import { User } from "@supabase/supabase-js";
function SubmittedSong() {
  const [user, setUserId] = useState<User | string | null>(null);
  const [song, setSong] = useState<SongType[] | null >(null);
  const { setAuthToken, setIsLoggedIn, setIsLoading } = MyAppHook();
  useEffect(() => {
    const handelLoginSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        toast.error("failed to get used data");
        return;
      }
      setIsLoading(true);
      if (data.session?.access_token) {
        // console.log(data);
        setAuthToken(data.session.access_token);
        setUserId(data.session.user.id);
        localStorage.setItem("access_token", data.session.access_token);
        setIsLoggedIn(true);
        fetchAllSong(data.session?.user.id);
      }
    };
    handelLoginSession();
  }, [setAuthToken,setIsLoading,setIsLoggedIn]);

  const fetchAllSong = async (userId: string) => {
    const { data,error} = await supabase
      .from("song")
      .select("*")
      .eq("user_id", userId);
      // console.error(error)
    // console.log("data", data);
    if(error){
      toast.error("fetch error");
    }
    if (data) {
      setSong(data);
    }
  };
  // console.log("song", song);
console.log("user",user);

  const handelDelete = async (id: number | string) => {
    setIsLoading(true); // Start loading
    
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
          toast.error("Failed to delete");
        } else {
          await Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          window.location.reload(); // Refresh the page after successful deletion
        }
      }
    } catch (err) {
      toast.error("An error occurred");
      console.error(err);
    } finally {
      setIsLoading(false); // End loading
    }
  };
  return (

    <Grid
      container
      spacing={3}
      columnSpacing={3}
    >
      {song &&
        song.map((data: SongType | null  ) => (
          <Grid
            key={data?.id}
            sx={{ marginTop: "20px" }}
            size={{ xs: 12,sm: 6, md: 4, lg: 3 }}
          >
            <ImageListItem key={data?.id} sx={{ height: "100px" }}>
              <Paper elevation={8}>
                <CardMedia src={`${data?.song_img}`} component='img' alt="img" sx={{height:"160px"}}/>
              </Paper>
              <Typography variant="body2" sx={{ margin: "8px 0px" }}>
                {data?.song_title}
              </Typography>
              <Button
                size="small"
                color="secondary"
                onClick={() => data?.id && handelDelete(data.id)}
              >
                delete
              </Button>
              <Link href={`/submitMusic/${data?.id}`}>
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
