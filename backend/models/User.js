const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  name: String,
  email: { type: String, required: true, unique: true },
  picture: String,
  height: Number,  // Height in cm
  weight: Number,  // Weight in kg
  fitnessGoal: String, // "weight loss", "muscle gain", etc.
  dietaryPreferences: [String], // ["vegetarian", "high protein"]
});

module.exports = mongoose.model("User", UserSchema);
