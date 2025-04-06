"use client";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import GoogleIcon from "@mui/icons-material/Google";
import { useRouter } from "next/navigation";
import { supabase } from "../../../../lib/supabaseClient";
import '@/style/style.css'
function SignUp() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = async (formData: any) => {
    const { fullName, email, password } = formData;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          fullName,
        },
      },
    });
    console.log("data", data);

    if (error) {
      toast.error("user sign up error");
    } else {
      toast.success("user sign up successfully");
    }
  };
  const handelsignIn = () => {
    router.push("/signIn");
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
          Sign Up
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
            placeholder="Full Name"
            fullWidth
            sx={{ mb: 2 }}
            {...register("fullName", {
              required: "*Full name is requird",
              pattern: {
                value: /^[a-zA-Z]+ [a-zA-Z]+$/,
                message: "Invalid full name format",
              },
            })}
          />
          {errors.fullName && <Box className='error'>{errors.fullName?.message?.toString()}</Box>}
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
              pattern: {
                value: /^(?=.*)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/i,
                message: "Invalid password",
              },
            })}
          />
            {errors.password && <Box className='error'>{errors.password?.message?.toString()}</Box>}
          <Grid sx={{ display: "flex" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 1,
                width: "150px",
                height: "48px",
                borderRadius: "14px",
                margin: "8px 8px 20px 5px",
                backgroundColor: "white",
                border: "1px solid black",
              }}
            >
              <GoogleIcon sx={{ color: "black", fontSize: "32px" }} />
            </Button>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 1,
                backgroundColor: "rgba(37, 37, 37, 1)",
                width: "376px",
                height: "48px",
                borderRadius: "14px",
              }}
            >
              Sign Up
            </Button>
          </Grid>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label=" I read and accepted the terms and conditions"
          ></FormControlLabel>
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
        Already a member?{" "}
        <Button variant="text" onClick={handelsignIn}>
          Sign In
        </Button>
      </Typography>
    </Container>
    </Box>
  );
}

export default SignUp;
