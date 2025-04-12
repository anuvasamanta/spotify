"use client";
import NavAdmin from "@/component/NavAdmin";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent,useEffect, useState } from "react";
import { MyAppHook } from "@/hook/userContext";
import {  SubmitHandler, useForm } from "react-hook-form";
import { supabase } from "../../../../lib/supabaseClient";
import toast from "react-hot-toast";
import { Albums } from "@/interface/song";
import Admin from "@/component/Admin";

export default function AlbumSubmit() {
  const [userId, setUserId] = useState<number | null | string>(null);
  const { setAuthToken, setIsLoggedIn, setIsLoading } = MyAppHook();
  const { register, handleSubmit, setValue, reset } = useForm();
  const [isClient,setIsClient]=useState(false);
  useEffect(() => {
    setIsClient(true);
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
      }
    };
    handelLoginSession();
  }, [setIsLoading, setIsLoggedIn, setAuthToken]);

  // upload Image
  const uploadImageFile = async (file: File) => {
    const fileExtension = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExtension}`;
    const { data, error } = await supabase.storage
      .from("album-cover")
      .upload(fileName, file);
    // console.log(data);
    if (error) {
      toast.error("failed to upload");
      return null;
    }if(data){
      return supabase.storage.from("album-cover").getPublicUrl(fileName).data
      .publicUrl;
    }
  };

  // form submit
  const onSubmit:SubmitHandler<Partial<Albums>> = async (formData) => {
    // console.log("form data", formData);
    setIsLoading(true);
    let imagePath = formData.cover_img;
    if (formData.cover_img instanceof File) {
      imagePath = await uploadImageFile(formData.cover_img);
      if (!imagePath) return;
    }

    const { error } = await supabase.from("albums").insert({
      ...formData,
      user_id: userId,
      cover_img: imagePath,
    });

    if (error) {
      toast.error("failed to add  album");
    } else {
      toast.success("album is submitted successfully");
    }
    reset();
  };
  if (!isClient) {
    return null;
  }
  return (
    <Container maxWidth="xl">
      <Box sx={{ display: "flex" }}>
        <NavAdmin />
        <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
          <Container maxWidth="lg" sx={{ mt: 2, mb: 2,ml:4 }}>
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
                  Submit Album
                </Typography>
                <Typography variant="body2">
                  To upload albums click on box or drop cover Image here!
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
                      name="cover_img"
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        const file = event.target.files?.[0];
                        if (file) {
                          setValue("cover_img", file);
                        }
                      }}
                      helperText="Please select your cover image"
                    ></TextField>
                  </Box>
                  <Grid
                    sx={{ display: "flex", gap: 2, marginBottom: 2 }}
                    columnSpacing={3}
                    container
                    spacing={3}
                  >
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        label="Title"
                        variant="filled"
                        fullWidth
                        {...register("title", {
                          required: {
                            value: true,
                            message: "required",
                          },
                        })}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        label="Artist"
                        variant="filled"
                        fullWidth
                        {...register("artist", {
                          required: {
                            value: true,
                            message: "required",
                          },
                        })}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    sx={{ display: "flex", gap: 2, marginBottom: 2 }}
                    columnSpacing={3}
                    container
                    spacing={3}
                  >
                    <Grid size={{ xs: 12, md: 12 }}>
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
        </Container>
      </Box>
    </Container>
  );
}
