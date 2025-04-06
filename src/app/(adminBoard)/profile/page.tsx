"use client";

import { myAppHook } from "@/hook/userContext";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabaseClient";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import NavAdmin from "@/component/NavAdmin";
import Admin from "@/component/Admin";

function Account() {
  const router=useRouter();
  const { setAuthToken, setIsLoading, setIsLoggedIn } = myAppHook();
  const [userId, setUserId] = useState<number | null | string>(null);
  const [user, setUser] = useState<any | null>(null);
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
  }, []);

  console.log(user);
  const handelLogOut = async () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
    setAuthToken(null);
    await supabase.auth.signOut();
    toast.success("user logged out successfully");
    router.push("/")
  };

  return (
    <Container maxWidth="xl" component="main">
    <Box sx={{ display: "flex" }}>
      <NavAdmin />
      <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
        <Grid container spacing={2} sx={{ marginLeft: 9 }}>
          <Admin/>
          <Grid size={12} sx={{ display: "block" }}>
          <Paper variant="elevation">
       <Card sx={{ minWidth: 275 }}>
         <CardContent>
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 18 }}
          >
            Profile
           </Typography>
           <Typography variant="body1" component="div">
             Full Name: {user?.user_metadata?.fullName}
           </Typography>
           <Typography
             variant="body1"
             component="div"
             sx={{ margin: "20px 0px" }}
           >
             Email: {user?.email}
            </Typography>
           <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
             {user?.last_sign_in_at}
           </Typography>
           <Typography variant="body2">
              Role: {user?.role}
             <br />
           </Typography>
         </CardContent>
         <CardActions>
           <Button size="small" onClick={handelLogOut}>Log out</Button>
         </CardActions>
       </Card>
      </Paper> 
          </Grid>
        </Grid>
      </Container>
    </Box>
  </Container>
    // <Box>
    //   <Container maxWidth="xl">
       
    //     <Paper variant="elevation">
    //       <Card sx={{ minWidth: 275 }}>
    //         <CardContent>
    //           <Typography
    //             gutterBottom
    //             sx={{ color: "text.secondary", fontSize: 18 }}
    //           >
    //             Profile
    //           </Typography>
    //           <Typography variant="body1" component="div">
    //             Full Name: {user?.user_metadata?.fullName}
    //           </Typography>
    //           <Typography
    //             variant="body1"
    //             component="div"
    //             sx={{ margin: "20px 0px" }}
    //           >
    //             Email: {user?.email}
    //           </Typography>
    //           <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
    //             {user?.last_sign_in_at}
    //           </Typography>
    //           <Typography variant="body2">
    //             Role: {user?.role}
    //             <br />
    //           </Typography>
    //         </CardContent>
    //         <CardActions>
    //           <Button size="small" onClick={handelLogOut}>Log out</Button>
    //         </CardActions>
    //       </Card>
    //     </Paper>
    //   </Container>
    // </Box>
  );
}

export default Account;
