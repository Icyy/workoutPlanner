import { Container, Typography, Button } from "@mui/material";

const Home = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <Container>
      <Typography variant="h3" sx={{marginBottom:'20px'}}>AI-Powered Workout & Diet Planner</Typography>
      <Button variant="contained" color="primary" onClick={handleGoogleLogin}>
        Login with Google
      </Button>
    </Container>
  );
};

export default Home;
