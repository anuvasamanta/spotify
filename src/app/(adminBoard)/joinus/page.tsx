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
import { useEffect, useState } from "react";
import { MyAppHook } from "@/hook/userContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { supabase } from "../../../../lib/supabaseClient";
import toast from "react-hot-toast";
import { JoinUs } from "@/interface/song";
import Admin from "@/component/Admin";

export default function Join() {
  const [userId, setUserId] = useState<number | null | string>(null);
  const { setAuthToken, setIsLoggedIn, setIsLoading } = MyAppHook();
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

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
      }
    };
    handelLoginSession();
  }, [setAuthToken,setIsLoading,setIsLoggedIn]);

  // form submit
  const onSubmit:SubmitHandler<Partial<JoinUs>>  = async (formData) => {
    // console.log("form data", formData);
    setIsLoading(true);
    const { error } = await supabase.from("joinus").insert({
      ...formData,
      user_id: userId,
    });
    
    if (error) {
      toast.error("Data not submitted");
    }else{
      toast.success("Data is submitted successfully");
    }
    reset();
  };

  return (
    <Container maxWidth="xl" component="main">
      <Box sx={{ display: "flex" }}>
        <NavAdmin />
        <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
        <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
          <Grid container spacing={2} sx={{ marginLeft: 9 }}>
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
                Join Us
              </Typography>
              <Typography variant="body2">
                If you think your place in our team is empty, fill in all the
                fields because we will check and let you know.
              </Typography>
              <Box
                component="form"
                sx={{ mt: 1 }}
                onSubmit={handleSubmit(onSubmit)}
              >
                <Grid
                  sx={{ display: "flex", gap: 2, marginBottom: 2 }}
                  container
                  columnSpacing={3}
                  spacing={3}
                >
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Full Name"
                      variant="filled"
                      fullWidth
                      {...register("fullname", {
                        required: {
                          value: true,
                          message: "required",
                        },
                      })}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Age"
                      variant="filled"
                      fullWidth
                      {...register("age", {
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
                  container
                  columnSpacing={3}
                  spacing={3}
                >
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Location"
                      variant="filled"
                      fullWidth
                      {...register("location", {
                        required: {
                          value: true,
                          message:"*location is requird"
                        },
                      })}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Discode Account"
                      variant="filled"
                      fullWidth
                      {...register("discodeaccount", {
                        required: {
                          value: true,
                          message: "*requird",
                        },
                      })}
                    />
                  </Grid>
                </Grid>
                <hr />
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
                  Social Media
                </Typography>
                <Grid
                  sx={{
                    display: "flex",
                    gap: 2,
                    marginBottom: 2,
                    flexDirection: "row",
                  }}
                  container
                  columnSpacing={3}
                  spacing={3}
                >
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Facebook"
                      variant="filled"
                      fullWidth
                      {...register("facebook", {
                        required: true,
                      })}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Instagram"
                      variant="filled"
                      fullWidth
                      {...register("instagram", {
                        required: true,
                      })}
                    />
                  </Grid>
                </Grid>
                <Grid
                  sx={{ display: "flex", gap: 2, marginBottom: 2 }}
                  container
                  columnSpacing={3}
                  spacing={3}
                >
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Twitter"
                      variant="filled"
                      fullWidth
                      {...register("twitter", {
                        required: true,
                      })}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Spotify"
                      variant="filled"
                      fullWidth
                      {...register("spotify", {
                        required: true,
                      })}
                    />
                  </Grid>
                </Grid>
                <hr />
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
                  Questions
                </Typography>
                <Grid
                  sx={{ display: "flex", gap: 2, marginBottom: 2 }}
                  container
                  columnSpacing={3}
                  spacing={3}
                >
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography
                      variant="body2"
                      gutterBottom
                      sx={{
                        fontSize: "13px",
                        fontWeight: "400",
                        marginBottom: "15px",
                      }}
                    >
                      What makes you passionate about KLOUD and becoming a KLOUD
                      ambassador?
                    </Typography>
                    <TextField
                      label="Share a reply"
                      variant="filled"
                      rows={4}
                      fullWidth
                      multiline
                      {...register("Q1", {
                        required: true,
                      })}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography
                      variant="body2"
                      gutterBottom
                      sx={{
                        fontSize: "13px",
                        fontWeight: "400",
                        marginBottom: "15px",
                      }}
                    >
                      Have you had any experience with online promotion before?{" "}
                      If so, explain. This could include using your
                      social media influence to promote a product or brand.
                    </Typography>
                    <TextField
                      label="Share a reply"
                      variant="filled"
                      fullWidth
                      multiline
                      rows={4}
                      {...register("Q2", {
                        required: true,
                      })}
                    />
                  </Grid>
                </Grid>
                <Grid
                  sx={{ display: "flex", gap: 2, marginBottom: 2 }}
                  container
                  columnSpacing={3}
                  spacing={3}
                >
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography
                      variant="body2"
                      gutterBottom
                      sx={{
                        fontSize: "13px",
                        fontWeight: "400",
                        marginBottom: "15px",
                      }}
                    >
                      Do you have any other skills which could benefit the
                      ambassador programme?
                    </Typography>
                    <TextField
                      label="Share a reply"
                      variant="filled"
                      fullWidth
                      multiline
                      rows={4}
                      {...register("Q3", {
                        required: true,
                      })}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography
                      variant="body2"
                      gutterBottom
                      sx={{
                        fontSize: "13px",
                        fontWeight: "400",
                        marginBottom: "15px",
                      }}
                    >
                      How would you help advertising in your community?
                    </Typography>
                    <TextField
                      label="Share a reply"
                      variant="filled"
                      rows={4}
                      fullWidth
                      multiline
                      {...register("Q4", {
                        required: true,
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
                    submit
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
