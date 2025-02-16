const express = require("express");
const axios = require("axios");
const router = express.Router();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const getAIResponse = async (userInput) => {
  const prompt = `
    Based on the user's input, generate a personalized workout and diet plan.
    User details:
    Height: ${userInput.height} cm
    Weight: ${userInput.weight} kg
    Fitness goal: ${userInput.fitnessGoal}
    Dietary preferences: ${userInput.dietaryPreferences.join(", ")}

    Return a diet plan with meals (including calories) and a workout plan (with exercises, sets, reps, and rest).
  `;

  const messages = [
    {
      role: "system",
      content: "You are a helpful assistant that creates workout and diet plans.",
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
        model: "gpt-3.5-turbo", // or "gpt-4" if you prefer
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
    console.error("Error generating AI plans:", error.response ? error.response.data : error.message);
    throw new Error("Error with OpenAI API request");
  }
};

router.post("/generate-plans", async (req, res) => {
  const { height, weight, fitnessGoal, dietaryPreferences } = req.body;

  try {
    const aiResponse = await getAIResponse({ height, weight, fitnessGoal, dietaryPreferences });
    res.json({ plans: aiResponse });
  } catch (error) {
    console.error("Error generating AI plans:", error);
    res.status(500).json({ error: "Failed to generate plans" });
  }
});

module.exports = router;
