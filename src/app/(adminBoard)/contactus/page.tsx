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
import { useForm } from "react-hook-form";
import { supabase } from "../../../../lib/supabaseClient";
import toast from "react-hot-toast";
import { ContactType } from "@/interface/song";
import "@/style/style.css";
import Admin from "@/component/Admin";
import Image from "next/image";
export default function Submission() {
  const [userId, setUserId] = useState<number | null | string>(null);
  const { setAuthToken, setIsLoggedIn, setIsLoading } = MyAppHook();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
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
        console.log(data);
        setAuthToken(data.session.access_token);
        setUserId(data.session.user.id);
        localStorage.setItem("access_token", data.session.access_token);
        setIsLoggedIn(true);
      }
    };
    handelLoginSession();
  }, [setIsLoggedIn,setAuthToken,setIsLoading]);

  // form submit
  const onSubmit = async (formData: ContactType | any) => {
    // console.log("form data", formData);
    setIsLoading(true);
    const { data, error } = await supabase.from("contact").insert({
      ...formData,
      user_id: userId,
    });
    console.log(data);
    
    if (error) {
      toast.error("Data not submitted");
    } else {
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
            <Admin />
            <Grid size={12} sx={{ display: "block" }}>
              <Typography
                variant="h3"
                component="h3"
                gutterBottom
                sx={{
                  fontSize: "19px",
                  fontWeight: "600",
                  marginBottom: "15px",
                }}
              >
                Contact Us
              </Typography>
              <Typography variant="body2">
                We are very happy to be contact with you. You can contact us in
                the following ways
              </Typography>
              <Grid container columnSpacing={3} spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    sx={{ margin: "10px 0px" }}
                  >
                    Address
                  </Typography>
                  <Typography variant="body2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing Lorem
                    ipsum dolor sit amet, consectetur adipiscing{" "}
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    sx={{ margin: "10px 0px" }}
                  >
                    Phone Number
                  </Typography>
                  <Typography variant="body2">+98 903 028 6976</Typography>
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    sx={{ margin: "10px 0px" }}
                  >
                    Email
                  </Typography>
                  <Typography variant="body2">music12@gmail.com</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Image src="/assert/images 1.png" alt="Image " width={400} height={300} />

                </Grid>
              </Grid>

              <Box
                component="form"
                sx={{ mt: 1 }}
                onSubmit={handleSubmit(onSubmit)}
              >
                <Grid container columnSpacing={3} spacing={3} marginTop={5}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Full Name"
                      variant="filled"
                      fullWidth
                      sx={{ marginBottom: "20px" }}
                      {...register("fullname", {
                        required: "*Full name is requird",
                        pattern: {
                          value: /^[a-zA-Z]+ [a-zA-Z]+$/,
                          message: "Invalid full name format",
                        },
                      })}
                    />
                    {errors.fullName && (
                      <Box className="error">
                        {errors.fullName?.message?.toString()}
                      </Box>
                    )}
                    <TextField
                      label="Email"
                      variant="filled"
                      fullWidth
                      sx={{ marginBottom: "20px" }}
                      {...register("email", {
                        required: "*Email is required",
                        pattern: {
                          value:
                            /^([a-z0-9.-_]+)@([a-z]{5,15}).([a-z]{2,10})$/i,
                          message: "Invalid Email address",
                        },
                      })}
                    />
                    {errors.email && (
                      <Box className="error">
                        {errors.email?.message?.toString()}
                      </Box>
                    )}
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Message Text"
                      variant="filled"
                      fullWidth
                      multiline
                      rows={4}
                      sx={{ marginBottom: "20px" }}
                      {...register("message", {
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
