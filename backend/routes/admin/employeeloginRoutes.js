import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../../config/dbconnect.js";

const router = express.Router();

// ✅ Employee Login Route
router.post("/employee/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const query = "SELECT * FROM employee WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // ✅ Generate JWT Token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // ✅ Set session data
    req.session.user = { id: user.id, email: user.email, name: user.name, role: user.role };
    

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      message: "Login successful",
      token,
      user: req.session.user,
    });
  });
});

// ✅ Get Current User's Session Data
router.get("/session-data", (req, res) => {
    if (req.session.user) {
      res.json({ message: "Session Active", user: req.session.user });
    } else {
      res.status(401).json({ message: "No active session" });
    }
});

// ✅ Logout Route
router.post("/employee/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.clearCookie("token").json({ message: "Logged out successfully" });
    });
});

export default  router;
