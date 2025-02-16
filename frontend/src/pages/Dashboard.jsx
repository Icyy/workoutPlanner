import { useState, useEffect } from "react";
import { Container, TextField, Button, Typography, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    height: "",
    weight: "",
    fitnessGoal: "",
    dietaryPreferences: [],
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/");

      try {
        const response = await fetch("http://localhost:5000/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setUserData({
            height: data.height || "",
            weight: data.weight || "",
            fitnessGoal: data.fitnessGoal || "",
            dietaryPreferences: data.dietaryPreferences || [],
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        alert("Error updating profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User Dashboard
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Height (cm)"
          name="height"
          type="number"
          value={userData.height}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Weight (kg)"
          name="weight"
          type="number"
          value={userData.weight}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          select
          label="Fitness Goal"
          name="fitnessGoal"
          value={userData.fitnessGoal}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          <MenuItem value="weight loss">Weight Loss</MenuItem>
          <MenuItem value="muscle gain">Muscle Gain</MenuItem>
          <MenuItem value="maintenance">Maintenance</MenuItem>
        </TextField>
        <TextField
          label="Dietary Preferences (comma separated)"
          name="dietaryPreferences"
          value={userData.dietaryPreferences.join(", ")}
          onChange={(e) =>
            setUserData({ ...userData, dietaryPreferences: e.target.value.split(", ") })
          }
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Save Profile
        </Button>
      </form>
    </Container>
  );
};

export default Dashboard;
