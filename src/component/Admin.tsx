"use client"
import React, { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient';
import { MyAppHook } from '@/hook/userContext';
import toast from 'react-hot-toast';
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { User } from '@supabase/supabase-js';

function Admin() {
    const { setAuthToken, setIsLoading, setIsLoggedIn } = MyAppHook();
    const [userId, setUserId] = useState<number | null | string>(null);
    const [user, setUser] = useState<User | null>(null);
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
          setUser(data.session.user);
          setAuthToken(data.session.access_token);
          setUserId(data.session.user.id);
          localStorage.setItem("access_token", data.session.access_token);
          setIsLoggedIn(true);
        }
      };
      handelLoginSession();
    }, [setAuthToken,setIsLoading,setIsLoggedIn]);
  
    // console.log(user);
    // console.log(userId);
    
  return (
    <Box
    sx={{
      width: '100%',
      display: 'grid',
      gap: 2,
    }}
  >
      <Card sx={{backgroundColor:"rgb(96, 150, 212)", }} >
        <CardActionArea
          sx={{
            height: '100%',
            '&[data-active]': {
              backgroundColor: 'action.selected',
              '&:hover': {
                backgroundColor: 'action.selectedHover',
              },
            },
          }}
        >
          <CardContent sx={{ height: '100%', }}>
            <Typography  variant="h4"  sx={{color:"white"}}>
            Hello,  { user?.user_metadata?.fullName}
            </Typography>
            <Typography variant="body1" component="div" sx={{color:"white"}}>
           Welcome Back!
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
  </Box>
  )
}

export default Admin
// import React from 'react'

// function Admin() {
//   return (
//     <div>Admin</div>
//   )
// }

// export default Admin