"use client";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { supabase } from "../../../../lib/supabaseClient";
import { MyAppHook } from "@/hook/userContext";
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import '@/style/style.css'

interface SignIN {
  email: string;
  password: string;
}

function SignIn() {
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn, setAuthToken } = MyAppHook();
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
      return;
    }
  }, [isLoggedIn,router]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit:SubmitHandler<Partial<SignIN>>  = async (formData:Partial<SignIN>) => {
    const { email, password } = formData;
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }  
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error("invalid details");
    } else {
      if (data.session?.access_token) {
        setAuthToken(data.session?.access_token);
        localStorage.setItem("access_token", data.session?.access_token);
        setIsLoggedIn(true);
        toast.success("user logged successfully");
        const { data: profileData } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("user_id", data?.user?.id)
        .single();
        // Check if user is an admin 
        if (profileData?.is_admin) {
          router.push("/home");
        } else {
         
          router.push("/");
        }
      }
    }
  };
  const handelsignUp = () => {
    router.push("/signUp");
  };
  

  return (
    <Box>
    <Link href='/'>
    <ArrowBackSharpIcon/>
    </Link>
    <Container maxWidth="sm" component="main">
      <Paper elevation={10} sx={{ marginTop: 2, padding: "6px 70px 6px 70px" }}>
        <Avatar
          sx={{
            mx: "auto",
            bgcolor: "rgba(37, 37, 37, 1)",
            textAlign: "center",
            mb: 1,
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h3"
          sx={{
            textAlign: "center",
            Color: "rgba(37, 37, 37, 1)",
            fontWeight: 900,
            fontSize: 32,
            letterSpacing: "0.75px",
            font: "Robot",
          }}
        >
          Sign In
        </Typography>
        <Typography
          variant="body2"
          sx={{ textAlign: "center", margin: "10px 13px 25px 20px" }}
        >
          To upload music and images, you must accept our{" "}
          <Link href="/">terms and conditions</Link> on the registration website
        </Typography>
        <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            placeholder="Email"
            fullWidth
            sx={{ mb: 2 }}
            type="email"
            {...register("email", {
              required: "*Email is required",
              pattern: {
                value: /^([a-z0-9.-_]+)@([a-z]{5,15}).([a-z]{2,10})$/i,
                message: "Invalid Email address",
              },
            })}
          />
                {errors.email && <Box className='error'>{errors.email?.message?.toString()}</Box>}
          <TextField
            placeholder="Password"
            fullWidth
            sx={{ mb: 2 }}
            type="password"
            {...register("password", {
              required: "*password is required",
            })}
          />
            {errors.password && <Box className='error'>{errors.password?.message?.toString()}</Box>}
          <Grid sx={{ display: "flex" }}>
            {/* <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 1,
                width: "150px",
                height: "48px",
                borderRadius: "14px",
                margin: "8px 8px 7px 5px",
                backgroundColor: "white",
                border: "1px solid black",
              }}
            >
              <GoogleIcon sx={{ color: "black", fontSize: "32px" }} />
            </Button> */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 1,
                backgroundColor: "rgba(37, 37, 37, 1)",
                width: "415px",
                height: "48px",
                borderRadius: "14px",
              }}
            >
              Sign In
            </Button>
          </Grid>
          <Link href="/forgetPassword">
            <Button variant="text" sx={{ fontSize: "10px", fontWeight: 600 }}>
              Forgot your password?
            </Button>
          </Link>
        </Box>
      </Paper>
      <Typography
        sx={{
          fontSize: "15px",
          fontWeight: 400,
          marginTop: "10px",
          marginBottom: 5,
        }}
      >
        Not a member?{" "}
        <Button variant="text" onClick={handelsignUp}>
          Sign Up
        </Button>
      </Typography>
    </Container>
    </Box>
  );
}

export default SignIn;
