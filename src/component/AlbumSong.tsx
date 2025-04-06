"use client"
import { MyAppHook } from '@/hook/userContext'
import React, { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient';
import toast from 'react-hot-toast';
import { Albums } from '@/interface/song';
import Swal from "sweetalert2";
import { Button, CardMedia, Grid, ImageListItem, Paper, Typography } from '@mui/material';
function AlbumSong() {
    const {setIsLoading,setAuthToken, setIsLoggedIn}=MyAppHook();
     const [album, setAlbum] = useState<Albums[] | null>(null);
     const [user, setUserId] = useState<any>(null);
     useEffect(() => {
        const handelLoginSession = async () => {
          const { data, error } = await supabase.auth.getSession();
          if (error) {
            toast.error("failed to get used data");
            return;
          }
          setIsLoading(true);
          if (data.session?.access_token) {
            console.log(data);
            setAuthToken(data.session.access_token);
            setUserId(data.session.user.id);
            localStorage.setItem("access_token", data.session.access_token);
            setIsLoggedIn(true);
            fetchAllAlbum(data.session?.user.id);
          }
        };
        handelLoginSession();
      }, [album,setAuthToken,setIsLoading,setIsLoggedIn]);
      const fetchAllAlbum = async (userId: string) => {
        const { data, error } = await supabase
          .from("albums")
          .select("*")
          .eq("user_id", userId);
          console.error(error)
        // console.log("data", data);
        if (data) {
          setAlbum(data);
        }
      };
    
      const handelDelete = async (id: number) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const { data, error } = await supabase
              .from("albums")
              .delete()
              .eq("id", id);
              console.log(data);
              
            if (error) {
              toast.error("failed");
            } else {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          }
        });
        
        setIsLoading(true)
      };
      console.log(user);
  return (
    <Grid
    container
    spacing={3}
    columnSpacing={3}
  >
    {album &&
      album.map((data: Albums | any) => (
        <Grid
          key={data?.id}
          sx={{ marginTop: "20px" }}
          size= {{ xs: 12,sm: 6, md: 4, lg: 3 }}
        >
          <ImageListItem key={data?.id} sx={{ height: "100px" }}>
            <Paper elevation={8}>
              <CardMedia  src={`${data?.cover_img}`} component='img' sx={{height:"160px"}}/>
            </Paper>
            <Typography variant="body2" sx={{ margin: "8px 0px" }}>
              {data?.title}
            </Typography>
            <Button
              size="small"
              color="secondary"
              onClick={() => handelDelete(data?.id)}
            >
              delete
            </Button>
          </ImageListItem>
        </Grid>
      ))}
  </Grid>
  )
}

export default AlbumSong