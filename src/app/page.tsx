
import {
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import Header from "../../layout/header/Header";
import CurrentTime from "@/component/CurrentTime";
import Songs from "./song/page";
import CardSong from "@/component/CardSong";
import Albums from "./albums/page";
import SearchSong from "@/component/SearchSong";


export default function Home() {
  return (
    <Container maxWidth="xl" component="main" sx={{backgroundColor:"rgb(30, 30, 30)",color:"white" ,marginTop:6,marginLeft:"0px!important"}}>
      <Box sx={{ display: "flex" }}>
       <Header/>
        <Container maxWidth="lg" sx={{ mt: 2, mb: 2}}>
          <Grid container spacing={2}>
          <CurrentTime/>
            <Grid size={12} sx={{ display: "block" }}>
              <SearchSong/>
              {/* first section */}
            <CardSong/>
            {/* second section */}
              <Typography variant="h5">
              Music PlayList
              </Typography>
             <Songs/>
             {/* third section */}
             <Typography variant="h5">
             Popular albums
              </Typography>
              <Albums/>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Container>
  );
}
