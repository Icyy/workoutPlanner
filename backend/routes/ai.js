const express = require("express");
const axios = require("axios");
const router = express.Router();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const getAIResponse = async (height, weight, fitnessGoal, dietaryPreferences) => {
  const prompt = `
      Generate a structured JSON response for a workout and diet plan.
      {
        "workout": {
          "days": [
            { "day": "Monday", "exercises": [{ "name": "Squats", "sets": 3, "reps": "12-15" }, ...] },
            { "day": "Tuesday", "exercises": [...] }
          ]
        },
        "diet": {
          "meals": [
            { "name": "Breakfast", "items": ["Oatmeal with banana", "Boiled eggs"] },
            { "name": "Lunch", "items": ["Grilled chicken", "Brown rice", "Steamed broccoli"] },
            { "name": "Dinner", "items": ["Salmon", "Quinoa", "Mixed salad"] }
          ]
        }
      }
      Based on:
      - Height: ${height} cm
      - Weight: ${weight} kg
      - Fitness goal: ${fitnessGoal}
      - Dietary preferences: ${dietaryPreferences.join(", ")}
    `;

  const messages = [
    {
      role: "system",
      content:
        "You are a helpful assistant that creates workout and diet plans.",
    },
    {
      role: "user",
      content: prompt,
    },
  ];

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: messages,
        max_tokens: 1500,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    console.log("AI response:", response.data);
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error(
      "Error generating AI plans:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Error with OpenAI API request");
  }
};

router.post("/generate-plans", async (req, res) => {
  console.log(req.body);
  const { height, weight, fitnessGoal, dietaryPreferences } = req.body;

  try {
    const aiResponse = await getAIResponse(height, weight, fitnessGoal, dietaryPreferences);
    res.json({ plans: aiResponse });
  } catch (error) {
    console.error("Error generating AI plans:", error);
    res.status(500).json({ error: "Failed to generate plans" });
  }
});

module.exports = router;
