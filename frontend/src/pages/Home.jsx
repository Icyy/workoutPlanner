import { Container, Typography, Button } from "@mui/material";

const Home = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <Container sx={{display:'flex',justifyContent: 'center',alignItems: 'center',flexDirection: 'column'}}>
      <Typography variant="h2" sx={{marginTop:'150px',marginBottom:'10px', color:'rgb(218, 126, 14)'}}>AI-Powered Workout & Diet Planner💪</Typography>
      <Typography variant="h4" sx={{marginTop:'120px',marginBottom:'50px', color:'rgb(218, 126, 14)'}}>Login to get started today!</Typography>
      <Button variant="contained" color="rgb(223, 139, 38)" sx={{border:'1px solid rgb(223, 139, 38)'}} onClick={handleGoogleLogin}>
        Login with Google
      </Button>
    </Container>
  );
};

export default Home;
