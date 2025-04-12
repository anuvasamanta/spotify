"use client"
import { Box, Typography } from "@mui/material";
import React from "react";

function CurrentTime() {
  return (
    <Box sx={{ color: "white" }}>
      <Typography variant="h4" sx={{ marginTop: "10px" }}>
        Hello, Listen your favorite music !
      </Typography>
      <Typography variant="body2">Welcom back</Typography>
    </Box>
  );
}

export default CurrentTime;
