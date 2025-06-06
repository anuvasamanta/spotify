"use client";
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
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import toast from "react-hot-toast";
import { ContactType } from "@/interface/song";
import "@/style/style.css";
import Image from "next/image";
import { supabase } from "../../../lib/supabaseClient";
import Link from "next/link";

export default function Submission() {
  const [userId, setUserId] = useState<number | null | string>(null);
  const { setAuthToken, setIsLoggedIn, setIsLoading } = MyAppHook();
  const [isClient,setIsClient]=useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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
        setAuthToken(data.session.access_token);
        setUserId(data.session.user.id);
        localStorage.setItem("access_token", data.session.access_token);
        setIsLoggedIn(true);
      }
    };
    handelLoginSession();
  }, [setIsLoggedIn, setAuthToken, setIsLoading]);

  const onSubmit: SubmitHandler<Partial<ContactType>> = async (formData) => {
    setIsLoading(true);
    const { error } = await supabase.from("contact").insert({
      ...formData,
      user_id: userId,
    });

    if (error) {
      toast.error("Data not submitted");
    } else {
      toast.success("Data is submitted successfully");
    }
    reset();
  };
  if (!isClient) {
    return null;
  }
  return (
    <Container maxWidth="xl" component="main" sx={{ bgcolor: "black", py: 4 }}>
         <Box sx={{ mb: 4 }}>
    <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
      <Button 
        startIcon={<ArrowBackSharpIcon />}
        sx={{ 
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.1)'
          }
        }}
      >
        Home
      </Button>
    </Link>
  </Box>
      <Box sx={{ display: "flex" }}>
       
            <Grid container spacing={2} sx={{ marginLeft: 2 }}>
              <Grid size={12} sx={{ display: "block" }}>
                <Typography
                  variant="h3"
                  component="h3"
                  gutterBottom
                  sx={{
                    fontSize: "19px",
                    fontWeight: "600",
                    marginBottom: "15px",
                    color: "white",
                  }}
                >
                  Contact Us
                </Typography>
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                  We are very happy to be contact with you. You can contact us
                  in the following ways
                </Typography>
                <Grid container columnSpacing={3} spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography
                      variant="body1"
                      fontWeight={600}
                      sx={{ margin: "10px 0px", color: "white" }}
                    >
                      Address
                    </Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing Lorem
                      ipsum dolor sit amet, consectetur adipiscing{" "}
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight={600}
                      sx={{ margin: "10px 0px", color: "white" }}
                    >
                      Phone Number
                    </Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>+98 903 028 6976</Typography>
                    <Typography
                      variant="body1"
                      fontWeight={600}
                      sx={{ margin: "10px 0px", color: "white" }}
                    >
                      Email
                    </Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>music12@gmail.com</Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Image
                      src="/assert/images 1.png"
                      alt="Image "
                      width={400}
                      height={300}
                      style={{ borderRadius: "8px" }}
                    />
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
                        sx={{ 
                          marginBottom: "20px",
                          "& .MuiFilledInput-root": {
                            backgroundColor: "rgba(255,255,255,0.1)",
                            "&:hover": {
                              backgroundColor: "rgba(255,255,255,0.15)",
                            },
                          },
                          "& .MuiInputLabel-root": {
                            color: "rgba(255,255,255,0.7)",
                          },
                          "& .MuiFilledInput-input": {
                            color: "white",
                          },
                        }}
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
                        sx={{ 
                          marginBottom: "20px",
                          "& .MuiFilledInput-root": {
                            backgroundColor: "rgba(255,255,255,0.1)",
                            "&:hover": {
                              backgroundColor: "rgba(255,255,255,0.15)",
                            },
                          },
                          "& .MuiInputLabel-root": {
                            color: "rgba(255,255,255,0.7)",
                          },
                          "& .MuiFilledInput-input": {
                            color: "white",
                          },
                        }}
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
                        sx={{ 
                          marginBottom: "20px",
                          "& .MuiFilledInput-root": {
                            backgroundColor: "rgba(255,255,255,0.1)",
                            "&:hover": {
                              backgroundColor: "rgba(255,255,255,0.15)",
                            },
                          },
                          "& .MuiInputLabel-root": {
                            color: "rgba(255,255,255,0.7)",
                          },
                          "& .MuiFilledInput-input": {
                            color: "white",
                          },
                        }}
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
                        backgroundColor: "rgb(248, 247, 247)",
                        width: "170px",
                        height: "50px",
                        color:"black",
                        borderRadius: "20px",
                        fontSize: "15px",
                        "&:hover": {
                          backgroundColor: "rgba(125, 125, 125, 0.8)",
                        }
                      }}
                    >
                      submit
                    </Button>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          
      </Box>
    </Container>
  );
}