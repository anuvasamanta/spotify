"use client";
import NavAdmin from "@/component/NavAdmin";
import {
  Box,
  Button,
  Container,
  Grid,
  InputLabel,
  ListItem,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Albums, SongType } from "@/interface/song";
import { myAppHook } from "@/hook/userContext";
import { useForm } from "react-hook-form";
import { supabase } from "../../../../lib/supabaseClient";
import toast from "react-hot-toast";
import Admin from "@/component/Admin";
import '@/style/style.css'
export default function Submission() {
  const [userId, setUserId] = useState<number | null | string>(null);
  const { setAuthToken, setIsLoggedIn, isLoggedIn, setIsLoading } = myAppHook();
  const [album, setAlbums] = useState<Albums[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<number | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    const fetchAlbum = async () => {
      const { data, error } = await supabase.from("albums").select("*");
      if (error) {
        console.error("error fetch album", error);
      } else {
        setAlbums(data);
      }
    };
    fetchAlbum();
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
      }
    };
    handelLoginSession();
  }, []);

  // upload Image
  const uploadImageFile = async (file: File) => {
    const fileExtension = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExtension}`;
    const { data, error } = await supabase.storage
      .from("song-image")
      .upload(fileName, file);
    if (error) {
      toast.error("failed to upload");
      return null;
    }
    return supabase.storage.from("song-image").getPublicUrl(fileName).data
      .publicUrl;
  };
  // upload audio
  const uploadAudioFile = async (file: File) => {
    const fileExtension = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExtension}`;
    const { data, error } = await supabase.storage
      .from("song-url")
      .upload(fileName, file);
    if (error) {
      toast.error("fialed to upload audio");
      return null;
    }
    return supabase.storage.from("song-url").getPublicUrl(fileName).data
      .publicUrl;
  };
  // form submit
  const onSubmit = async (formData: SongType | any) => {
    // console.log("form data", formData);
    setIsLoading(true);
    let imagePath = formData.song_img;
    let audioPath = formData.song_url;
    if (formData.song_img instanceof File) {
      imagePath = await uploadImageFile(formData.song_img);
      if (!imagePath) return;
    }
    if (formData.song_url instanceof File) {
      audioPath = await uploadAudioFile(formData.song_url);
      if (!audioPath) return;
    }
    if (selectedAlbum) {
      const { data, error } = await supabase.from("song").insert({
        ...formData,
        user_id: userId,
        song_img: imagePath,
        song_url: audioPath,
        album_id:selectedAlbum
      });
      // console.log(selectedAlbum);
      
      if (error) {
        toast.error("failed to add  song");
      } else {
        toast.success("song is submitted successfully");
      }
      reset();
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ display: "flex" }}>
        <NavAdmin />
        <Container maxWidth="xl" sx={{ mt: 2, mb: 2 }}>
          <Grid container spacing={2} sx={{ marginLeft: 9 }} rowSpacing={3}>
               <Admin/>
            <Grid size={12} sx={{ display: "block" }}>
              <Typography
                variant="h3"
                component="h2"
                gutterBottom
                sx={{
                  fontSize: "19px",
                  fontWeight: "600",
                  marginBottom: "15px",
                }}
              >
                Submit Music
              </Typography>
              <Typography variant="body2">
                To upload musics click on box or drop file image here!
              </Typography>
              <Box
                component="form"
                sx={{ mt: 1 }}
                onSubmit={handleSubmit(onSubmit)}
              >
                <Box  sx={{height: "120px",
                    width: "190px",margin: "20px 0px",}}>
                <TextField
                  type="file"
                  name="song_img"
                  onChange={(event: any) => {
                    setValue("song_img", event.target.files[0]);
                  }}
                     helperText="Please select your song image"
                >
                  <img src="assert/fi_upload-cloud.png" alt="upload" />
                </TextField>
                </Box>
                <Grid
                  sx={{ display: "flex", gap: 2, marginBottom: 2 }}
                  columnSpacing={3}
                  container
                  spacing={3}
                >
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Artist Name"
                      variant="filled"
                      fullWidth
                      {...register("artist_name", {
                        required: {
                          value: true,
                          message: "required",
                        },
                      })}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      id="album-select"
                      select
                      fullWidth
                      variant="filled"
                      label="Album Title"
                      helperText="Please select your album"
                      {...register("album_title", {
                        required: {
                          value: true,
                          message: "required",
                        },
                      })}
                      value={selectedAlbum || ""}
                      onChange={(event)=>setSelectedAlbum(Number(event.target.value))}
                    >
                      {
                        album.map((albums:Albums)=>(
                          <MenuItem key={albums?.id} value={albums.id}>
                          {albums?.title}
                        </MenuItem>
                        ))
                      }
                    </TextField>
                  </Grid>
                </Grid>
                <Grid
                  sx={{ display: "flex", gap: 2, marginBottom: 2 }}
                  columnSpacing={3}
                  container
                  spacing={3}
                >
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Song Title"
                      variant="filled"
                      fullWidth
                      {...register("song_title", {
                        required: {
                          value: true,
                          message: "song_title",
                        },
                      })}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      type="date"
                      label="Release Date"
                      variant="filled"
                      fullWidth
                      {...register("release_date", {
                        required: {
                          value: true,
                          message: "release_date",
                        },
                      })}
                    />
                  </Grid>
                </Grid>
                <Grid sx={{ display: "flex", gap: 2, marginBottom: 2 }}
                 columnSpacing={3}
                 container
                 spacing={3}
                >
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="song category"
                      variant="filled"
                      fullWidth
                      {...register("song_category", {
                        required: true,
                      })}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      type="file"
                      variant="filled"
                      fullWidth
                      helperText="Please select your song file"
                      onChange={(event: any) => {
                        setValue("song_url", event.target.files[0]);
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid sx={{ display: "flex", justifyContent: "right" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: "rgba(244, 56, 90, 1)",
                      width: "170px",
                      height: "50px",
                      borderRadius: "20px",
                      fontSize: "15px",
                    }}
                  >
                    Upload MP3
                  </Button>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Container>
  );
}
