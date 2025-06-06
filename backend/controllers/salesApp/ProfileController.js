// import db from "../../config/dbconnect";
import db from "../../config/dbconnect.js";
import bcrypt from "bcryptjs";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const sql = `SELECT * FROM salespersons WHERE email = ?`;
    db.query(sql, [email], (err, result) => {
      if (err) {
        console.error("Error fetching profile:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "User Not Found" });
      }

      const user = result[0];

      // Compare entered password with hashed password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error("Bcrypt compare error:", err);
          return res.status(500).json({ message: "Internal error" });
        }

        if (!isMatch) {
          return res.status(401).json({ message: "Invalid password" });
        }

        // // Optional: Remove password before sending response
        // delete user.password;

        console.log("Login successful:", user);

        return res.status(200).json({
          message: "Login successful",
          profile: user,
        });
      });
    });

    // // Send profile data (remove sensitive fields)
    // const profileData = {
    //   id: user.id,
    //   name: user.name,
    //   email: user.email,
    //   // add more fields as needed
    // };
  } catch (err) {
    console.error("eeeeeeeeeee", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
