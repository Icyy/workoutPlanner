import { Container, Typography, Button } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
const Home = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <Container sx={{display:'flex',justifyContent: 'center',alignItems: 'center',flexDirection: 'column'}}>
      <Container sx={{display:'flex',justifyContent: 'center',alignItems: 'center',flexDirection: 'column'}}>
      <Typography variant="h2" sx={{marginTop:'150px', color:'rgb(82, 52, 15)'}}>AI-Powered</Typography>
      <Typography variant="h1" sx={{marginBottom:'10px', color:'rgb(82, 52, 15)'}}>Workout & Diet Planner💪</Typography>
      </Container>
      
      <Typography variant="h4" sx={{marginTop:'90px',marginBottom:'50px', color:'rgb(218, 126, 14)'}}>Login to get started today!</Typography>
      <Button variant="contained" color="rgb(223, 139, 38)" sx={{border:'1px solid rgb(223, 139, 38)'}} onClick={handleGoogleLogin}>
        <GoogleIcon sx={{marginRight:'1vw'}}/>
          <Typography>Login with Google</Typography>
      </Button>
    </Container>
  );
};

export default Home;
