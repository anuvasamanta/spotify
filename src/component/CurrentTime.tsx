"use client"
import { Box, Typography } from "@mui/material";
import React from "react";

function CurrentTime() {
  const CurrentTime: string | number = new Date().getHours();
  let greetingMessage: string | number;
  if (CurrentTime>=0 && CurrentTime <12) {
    greetingMessage = "Good Morning!";
  } else if (CurrentTime >=12 && CurrentTime<17) {
    greetingMessage = "Good Afternoon!";
  } else if(CurrentTime>=17 && CurrentTime<20) {
    greetingMessage = "Good Evening!";
  }else{
    greetingMessage='Good Night !'
  }
  return (
    <Box sx={{ color: "white" }}>
      <Typography variant="h4" sx={{ marginTop: "10px" }}>
        Hello, {greetingMessage}
      </Typography>
      <Typography variant="body2">Welcom back</Typography>
    </Box>
  );
}

export default CurrentTime;
