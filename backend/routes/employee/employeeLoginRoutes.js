import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../../config/dbconnect.js";

const router = express.Router();

//  User Login Route (Supports Email or Username)
router.post("/login", async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //  Query to check both email and username
    const user = await new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM employees 
         INNER JOIN roles ON roles.roleid = employees.roleid 
         WHERE (employees.email = ? OR employees.username = ?) 
         AND employees.status='Active'`,
        [emailOrUsername, emailOrUsername], // Bind both email and username
        (err, results) => {
          if (err)
            reject({ status: 500, message: "Database error", error: err });
          else if (results.length === 0)
            reject({ status: 401, message: "Invalid Email | Username" });
          else resolve(results[0]);
        }
      );
    });

    //  Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Wrong Password try again! " });
    }

    //  Generate JWT Token
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        adharId: user.uid,
        assignMenus: JSON.parse(user.menus),
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "10d",
      }
    );

    //  Store session data
    req.session.user = {
      id: user.id,
      email: user.email,
      username: user.username,
      name: user.name,
      contact: user.contact,
      role: user.role,
      assignMenus: JSON.parse(user.menus),
    };

    //  Set secure cookie
    res.cookie("employeeToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 10 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      message: "Login successful",
      token,
      user: req.session.user,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
});

//  Get Current User's Session Data
router.get("/session-data", (req, res) => {
  if (req.session.user) {
    res.json({ message: "Session Active", user: req.session.user });
  } else {
    res.status(401).json({ message: "No active session" });
  }
});

//  Logout Route
router.post("/logout", (req, res) => {
  res.clearCookie("employeeToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  console.log("Logout Successfully");
  return res.json({ message: "Logout successful." });
});

export default router;
