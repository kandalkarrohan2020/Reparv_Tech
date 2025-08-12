import db from "../../config/dbconnect.js";
import moment from "moment";
import bcrypt from "bcryptjs";
import sendEmail from "../../utils/nodeMailer.js";

const saltRounds = 10;

export const getProfile = (req, res) => {
  console.log('builder');
  
  const Id = req.user?.id; 
  if (!Id) {
    return res.status(400).json({ message: "Unauthorized User" });
  }

  const sql = `SELECT * FROM builders WHERE builderid = ?`;
  
  db.query(sql, [Id], (err, result) => {
    if (err) {
      console.error("Error fetching profile:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(result[0]);
  });
};

export const editProfile = (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(400).json({ message: "Invalid User ID" });
  }

  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const { fullname, username, contact, email } = req.body;

  if (!fullname || !username || !contact || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Fetch existing user profile first
  db.query("SELECT userimage FROM builders WHERE builderid = ?", [userId], (err, result) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    
    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingImage = result[0].userimage;
    const finalImagePath = req.file ? `/uploads/${req.file.filename}` : existingImage;

    let updateSql = `UPDATE builders SET contact_person = ?, username = ?, contact = ?, email = ?, userimage = ?, updated_at = ? WHERE builderid = ?`;
    const updateValues = [
      fullname,
      username,
      contact,
      email,
      finalImagePath,
      currentdate,
      userId,
    ];

    db.query(updateSql, updateValues, (updateErr, updateResult) => {
      if (updateErr) {
        console.error("Error updating profile:", updateErr);
        return res.status(500).json({ message: "Database error during update", error: updateErr });
      }

      res.status(200).json({ message: "Profile updated successfully" });
    });
  });
};

export const changePassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    //Securely hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    //  Update password in your salesperson  table
    const query = `UPDATE builders SET password = ? WHERE email = ?`;
    db.query(query, [hashedPassword, email], (err, result) => {
      if (err) throw err;
console.log("Password updated successfully for email:", email);

      return res.json({
        success: true,
        message: "Password updated successfully. You can now log in.",
      });
    });
  } catch (error) {
    console.error("Password reset error:", error);
    res.status(500).json({ success: false, message: "Something went wrong." });
  }
};