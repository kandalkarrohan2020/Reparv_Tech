import jwt from "jsonwebtoken";
import db from "../config/db.js";

const loginUser = (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }
  
    const query = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.query(query, [email, password], (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).json({ message: "Internal server error." });
      }
  
      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid email or password." });
      }
  
      const user = results[0];
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
  
      res.status(200).json({ message: "Login successful.", token });
    });
  };

export {loginUser}