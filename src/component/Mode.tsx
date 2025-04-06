"use client"
import { Button } from '@mui/material';
import React, { useState } from 'react';

const Mode = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={theme}>
      <Button onClick={toggleTheme}>Toggle Theme</Button>
      <h1>Welcome to my app!</h1>
    </div>
  );
};

export default Mode;
