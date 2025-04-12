"use client";
import { use } from "react";
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
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Albums, EditType, SongType } from "@/interface/song";
import { MyAppHook } from "@/hook/userContext";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { supabase } from "../../../../../lib/supabaseClient";
import Admin from "@/component/Admin";

interface PageParams {
  musicId: string;
}

export default function Edit({ params }: { params: Promise<PageParams> }) {
  const { musicId } = use(params);
  const [userId, setUserId] = useState<string | null>(null);
  const [edit, setEdit] = useState<EditType | null>(null);
  const [isClient, setIsClient] = useState(false);
  const { setAuthToken, setIsLoggedIn, setIsLoading } = MyAppHook();
  const [album, setAlbums] = useState<Albums[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<number | null>(null);
  const { register, handleSubmit, setValue, reset } =
    useForm<Partial<SongType>>();

  const fetchSong = useCallback(async () => {
    if (!musicId) return;

    try {
      const { data, error } = await supabase
        .from("song")
        .select("*")
        .eq("id", musicId)
        .single();

      if (error) throw error;

      setEdit(data);
      setSelectedAlbum(data.album_id || null);
      Object.entries(data).forEach(([key, value]) => {
        setValue(key as keyof SongType, value as string | number | null);
      });
    } catch (error) {
      console.error("Error fetching song:", error);
      toast.error("Failed to load song data");
    }
  }, [musicId, setValue]);

  useEffect(() => {
    setIsClient(true);

    const fetchAlbum = async () => {
      try {
        const { data, error } = await supabase.from("albums").select("*");
        if (error) throw error;
        setAlbums(data || []);
      } catch (error) {
        console.error("Error fetching albums:", error);
        toast.error("Failed to load albums");
      }
    };

    const handelLoginSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;

        if (data.session?.access_token) {
          setAuthToken(data.session.access_token);
          setUserId(data.session.user.id);
          localStorage.setItem("access_token", data.session.access_token);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Login session error:", error);
        toast.error("Failed to verify session");
      }
    };

    fetchAlbum();
    handelLoginSession();
    fetchSong();
  }, [musicId, setIsLoggedIn, setAuthToken, fetchSong]);

  const uploadImageFile = async (file: File): Promise<string | null> => {
    try {
      const fileExtension = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExtension}`;
      const { error } = await supabase.storage
        .from("song-image")
        .upload(fileName, file);

      if (error) throw error;
      return supabase.storage.from("song-image").getPublicUrl(fileName).data
        .publicUrl;
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Failed to upload image");
      return null;
    }
  };

  const uploadAudioFile = async (file: File): Promise<string | null> => {
    try {
      const fileExtension = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExtension}`;
      const { error } = await supabase.storage
        .from("song-url")
        .upload(fileName, file);

      if (error) throw error;
      return supabase.storage.from("song-url").getPublicUrl(fileName).data
        .publicUrl;
    } catch (error) {
      console.error("Audio upload error:", error);
      toast.error("Failed to upload audio");
      return null;
    }
  };

  const onSubmit: SubmitHandler<Partial<SongType>> = async (formData) => {
    if (!musicId || !selectedAlbum) {
      toast.error("Missing required fields");
      return;
    }

    setIsLoading(true);
    try {
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

      const { error } = await supabase
        .from("song")
        .update({
          ...formData,
          song_img: imagePath,
          song_url: audioPath,
          album_id: selectedAlbum,
        })
        .eq("id", musicId);

      if (error) throw error;

      toast.success("Song updated successfully");
      await fetchSong();
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update song");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ display: "flex" }}>
        <NavAdmin />
        <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
          <Container maxWidth="lg" sx={{ mt: 2, mb: 2, ml: 3 }}>
            <Grid container spacing={2} sx={{ marginLeft: 9 }} rowSpacing={3}>
              <Admin />
              <Grid size={{ xs: 12 }} sx={{ display: "block" }}>
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
                  Edit Music
                </Typography>
                <Typography variant="body2">
                  To update music click on box or drop file here!
                </Typography>
                <Box
                  component="form"
                  sx={{ mt: 1 }}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Box
                    sx={{ height: "120px", width: "190px", margin: "20px 0px" }}
                  >
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
                    />
                  </Box>
                  <Grid container spacing={3} sx={{ marginBottom: 2 }}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        label="Artist Name"
                        variant="filled"
                        fullWidth
                        defaultValue={edit?.artist_name}
                        {...register("artist_name", {
                          required: "Artist name is required",
                        })}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        select
                        fullWidth
                        variant="filled"
                        label="Album Title"
                        helperText="Please select your album"
                        value={selectedAlbum || ""}
                        onChange={(event) =>
                          setSelectedAlbum(Number(event.target.value))
                        }
                      >
                        {album.map((album) => (
                          <MenuItem key={album.id} value={album.id}>
                            {album.title}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>
                  <Grid container spacing={3} sx={{ marginBottom: 2 }}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        label="Song Title"
                        variant="filled"
                        defaultValue={edit?.song_title}
                        fullWidth
                        {...register("song_title", {
                          required: "Song title is required",
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
                          required: "Release date is required",
                        })}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={3} sx={{ marginBottom: 2 }}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        label="Song Category"
                        variant="filled"
                        fullWidth
                        defaultValue={edit?.song_category}
                        {...register("song_category", {
                          required: "Category is required",
                        })}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        type="file"
                        variant="filled"
                        fullWidth
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
                      Update
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
