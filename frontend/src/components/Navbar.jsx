import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleAuth = () => {
    if (token) {
      localStorage.removeItem("token");
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "rgb(223, 139, 38)",
          width: "100%",
          marginBottom: 5,
          left: 0,
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", color:'rgb(87, 50, 5)' }}>
            AI Fitness Planner
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "white",
              color: "rgb(223, 139, 38)",
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
            onClick={handleAuth}
          >
            {token ? "Logout" : "Login"}
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ height: "64px", marginBottom: 2 }} />
    </>
  );
};

export default Navbar;
