"use client";
import NavAdmin from "@/component/NavAdmin";
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, use, useEffect, useState } from "react";
import { Albums, EditType, SongType } from "@/interface/song";
import { MyAppHook } from "@/hook/userContext";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { supabase } from "../../../../../lib/supabaseClient";
import Admin from "@/component/Admin";

// Assuming this is where you get params as a Promise.
type CustomPageProps = {
  params: Promise<{
    musicId: string;
  }>;
};

export default function Edit({ params }: CustomPageProps) {
  // Unwrap the `params` Promise with `React.use()`.
  const { musicId } = use(params);

  const [userId, setUserId] = useState<string | number | null>(null);
  const [edit, setEdit] = useState<EditType | null>(null);
  const { setAuthToken, setIsLoggedIn, setIsLoading } = MyAppHook();
  const [album, setAlbums] = useState<Albums[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<number | null>(null);
  const { register, handleSubmit, setValue, reset } = useForm();

  const fetchSong = async () => {
    const { data, error } = await supabase
      .from("song")
      .select("*")
      .eq("id", musicId);
    if (error) {
      toast.error("error");
    } else {
      setEdit(data[0]);
    }
  };

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
      if (data.session?.access_token) {
        console.log(data);
        setAuthToken(data.session.access_token);
        setUserId(data.session.user.id);
        localStorage.setItem("access_token", data.session.access_token);
        setIsLoggedIn(true);
      }
    };
    handelLoginSession();
    fetchSong();
  }, [musicId, setIsLoggedIn, setAuthToken, setAlbums]);

  // upload Imag
  const uploadImageFile = async (file: File) => {
    const fileExtension = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExtension}`;
    const { data, error } = await supabase.storage
      .from("song-image")
      .upload(fileName, file);

    if (error) {
      toast.error("failed to upload");
      return null;
    }if(data){
      return supabase.storage.from("song-image").getPublicUrl(fileName).data
      .publicUrl;
    }
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
    }if(data){
      return supabase.storage.from("song-url").getPublicUrl(fileName).data
      .publicUrl;
    }
  };

  // form submit
  const onSubmit: SubmitHandler<Partial<SongType>> = async (formData) => {
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
      const { data, error } = await supabase
        .from("song")
        .update({
          ...formData,
          id: musicId,
          song_img: imagePath,
          song_url: audioPath,
          album_id: selectedAlbum,
        })
        .eq("id", musicId);

      if (error) {
        toast.error("failed to update  song");
      }
      if (data) {
        toast.success("song is updated successfully");
      }
      reset();
    }
  };
console.log("user ID",userId);

  return (
    <Container maxWidth="xl">
      <Box sx={{ display: "flex" }}>
        <NavAdmin/>
        <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
          <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
            <Grid container spacing={2} sx={{ marginLeft: 9 }} rowSpacing={3}>
              <Admin />
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
                  To update musics click on box or drop file here!
                </Typography>
                <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit(onSubmit)}>
                  <Box sx={{ height: "120px", width: "190px", margin: "20px 0px" }}>
                    <TextField
                      type="file"
                      name="song_img"
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        const file = event.target.files?.[0];
                        if (file) {
                          setValue("song_img", file);
                        }
                      }}
                      helperText="Please select your song image"
                    ></TextField>
                  </Box>
                  <Grid sx={{ display: "flex", gap: 2, marginBottom: 2 }} columnSpacing={3} container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        label="Artist Name"
                        variant="filled"
                        fullWidth
                        defaultValue={edit?.artist_name}
                        {...register("artist_name", {
                          required: {
                            value: false,
                            message: "not required",
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
                        defaultValue={edit?.album_title}
                        helperText="Please select your album"
                        {...register("album_title", {
                          required: {
                            value:false,
                            message: " not required",
                          },
                        })}
                        value={selectedAlbum || ""}
                        onChange={(event) => setSelectedAlbum(Number(event.target.value))}
                      >
                        {album.map((albums: Albums) => (
                          <MenuItem key={albums?.id} value={albums.id}>
                            {albums?.title}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>
                  <Grid sx={{ display: "flex", gap: 2, marginBottom: 2 }} columnSpacing={3} container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        label="Song Title"
                        variant="filled"
                        defaultValue={edit?.song_title}
                        fullWidth
                        {...register("song_title", {
                          required: {
                            value: false,
                            message: "not requird",
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
                        defaultValue={edit?.release_date}
                        {...register("release_date", {
                          required: {
                            value: false,
                            message: "not requird",
                          },
                        })}
                      />
                    </Grid>
                  </Grid>
                  <Grid sx={{ display: "flex", gap: 2, marginBottom: 2 }} columnSpacing={3} container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        label="song category"
                        variant="filled"
                        fullWidth
                        defaultValue={edit?.song_category}
                        {...register("song_category", {
                          required: false,
                        })}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        type="file"
                        variant="filled"
                        fullWidth
                        defaultValue={edit?.song_url}
                        helperText="Please select your song file"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                          const file = event.target.files?.[0];
                          if (file) {
                            setValue("song_url", file);
                          }
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
                      updated
                    </Button>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Container>
      </Box>
    </Container>
  );
}
