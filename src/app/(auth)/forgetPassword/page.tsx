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
import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import GoogleIcon from "@mui/icons-material/Google";
import { supabase } from "../../../../lib/supabaseClient";
import "@/style/style.css"
import { Forget } from "@/interface/song";


function ForgotPassword() {
  const {register,handleSubmit,formState:{errors
  }}=useForm();
  const onSubmit:SubmitHandler<Partial<Forget>> =async(formData)=>{
    const {email}=formData;
    const {data,error}=await supabase.auth.resetPasswordForEmail(email as string);
    console.log(data);

    if(error){
    toast.error("invalid Email")
    }
    else{
      toast.success("Email is send to your address");
    }
  }
 
  return (

    <Container maxWidth="sm" component="main" >
      <Paper elevation={10} sx={{ marginTop: 2,
         padding:"6px 70px 6px 70px"
         }}>
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
            fontSize: 28,
            letterSpacing: "0.75px",
            font: "Robot",
          }}
        >
          Forgot Password
        </Typography>
        <Typography
          variant="body2"
          sx={{ textAlign: "center", margin: "10px 13px 25px 20px" }}
        >
          Enter your email address below and we ll email you a link to reset your password.
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
             {errors.email && <Box className="error">{errors.email?.message?.toString()}</Box>}
          <Grid sx={{ display: "flex" }}>
            <Button
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
              <GoogleIcon sx={{ color: "black",fontSize:"32px" }} />
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
             Send Email
            </Button>
          </Grid>
        </Box>
      </Paper>
      <Typography sx={{ fontSize: "15px", fontWeight: 400, marginTop: "10px",marginBottom:5 }}>
        Not a member? <Button variant="text">Sign Up</Button>
      </Typography>
    </Container>
  );
}

export default ForgotPassword;
