import { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Card,
  CardContent,
  CardHeader,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    height: "",
    weight: "",
    fitnessGoal: "",
    dietaryPreferences: [],
  });
  const [aiPlans, setAiPlans] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const handleGeneratePlans = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/ai/generate-plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.plans);
        setAiPlans(data.plans);
      } else {
        alert("Error generating plans");
      }
    } catch (error) {
      console.error("Error generating plans:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User Dashboard
      </Typography>
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
          setUserData({
            ...userData,
            dietaryPreferences: e.target.value.split(", "),
          })
        }
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={handleGeneratePlans}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Workout & Diet Plans"}
      </Button>

      {aiPlans ? (
        <>
          {/* Workout Plan */}
          {aiPlans.workout &&
            aiPlans.workout.days &&
            aiPlans.workout.days.length > 0 && (
              <Card sx={{ marginTop: 3, padding: 2 }}>
                <CardHeader
                  title="Workout Plan"
                  sx={{
                    textAlign: "center",
                    backgroundColor: "#1976d2",
                    color: "white",
                    padding: 1,
                    borderRadius: "5px",
                  }}
                />
                <CardContent>
                  {aiPlans.workout.days.map((day, index) => (
                    <Paper
                      key={index}
                      sx={{
                        padding: 2,
                        marginBottom: 2,
                        backgroundColor: "#f5f5f5",
                      }}
                    >
                      <Typography variant="h6">{day.day}</Typography>
                      <List>
                        {day.exercises.map((exercise, idx) => (
                          <ListItem key={idx}>
                            <ListItemText
                              primary={`${exercise.name} - ${exercise.sets} sets x ${exercise.reps} reps`}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Paper>
                  ))}
                </CardContent>
              </Card>
            )}

          {/* Diet Plan */}
          {aiPlans.diet &&
            aiPlans.diet.meals &&
            aiPlans.diet.meals.length > 0 && (
              <Card sx={{ marginTop: 3, padding: 2 }}>
                <CardHeader
                  title="Diet Plan"
                  sx={{
                    textAlign: "center",
                    backgroundColor: "#2e7d32",
                    color: "white",
                    padding: 1,
                    borderRadius: "5px",
                  }}
                />
                <CardContent>
                  {aiPlans.diet.meals.map((meal, index) => (
                    <Paper
                      key={index}
                      sx={{
                        padding: 2,
                        marginBottom: 2,
                        backgroundColor: "#f5f5f5",
                      }}
                    >
                      <Typography variant="h6">{meal.name}</Typography>
                      <List>
                        {meal.items.map((item, idx) => (
                          <ListItem key={idx}>
                            <ListItemText primary={item} />
                          </ListItem>
                        ))}
                      </List>
                    </Paper>
                  ))}
                </CardContent>
              </Card>
            )}
        </>
      ) : (
        <Typography variant="h6" sx={{ color: "red", marginTop: 2 }}>
          No plans generated. Please try again.
        </Typography>
      )}
    </Container>
  );
};

export default Dashboard;
