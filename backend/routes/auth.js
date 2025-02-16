const express = require("express");
const passport = require("passport");
const router = express.Router();

// Google OAuth Login Route
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google OAuth Callback Route
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    // Redirect to frontend with the token
    res.redirect(`http://localhost:3000/login-success?token=${req.user.token}`);
  }
);

module.exports = router;
