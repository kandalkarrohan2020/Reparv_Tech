import db from "../../config/dbconnect.js";
import moment from "moment";
import bcrypt from "bcryptjs";
import sendEmail from "../../utils/nodeMailer.js";

const saltRounds = 10;

export const getProfile = (req, res) => {
  const Id = req.salesUser?.id;
  if (!Id) {
    return res.status(400).json({ message: "Unauthorized User" });
  }

  const sql = `
    SELECT 
      sp.*, 
      pp.fullname AS projectpartnerfullname,
      pp.contact AS projectpartnercontact,
      pp.city AS projectpartnercity
    FROM salespersons sp
    LEFT JOIN projectpartner pp ON sp.projectpartnerid = pp.id
    WHERE sp.salespersonsid = ?`;

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
  const userId = req.salesUser?.id;
  if (!userId) {
    return res.status(400).json({ message: "Invalid User ID" });
  }

  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const { fullname, username, contact, email } = req.body;

  if (!fullname || !username || !contact || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Fetch existing user profile first
  db.query(
    "SELECT userimage FROM salespersons WHERE salespersonsid = ?",
    [userId],
    (err, result) => {
      if (err) {
        console.error("Error fetching user:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const existingImage = result[0].userimage;
      const finalImagePath = req.file
        ? `/uploads/${req.file.filename}`
        : existingImage;

      let updateSql = `UPDATE salespersons SET fullname = ?, username = ?, contact = ?, email = ?, userimage = ?, updated_at = ? WHERE salespersonsid = ?`;
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
          return res.status(500).json({
            message: "Database error during update",
            error: updateErr,
          });
        }

        res.status(200).json({ message: "Profile updated successfully" });
      });
    }
  );
};

export const changePassword = async (req, res) => {
  const userId = req.salesUser?.id;
  const { currentPassword, newPassword } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "Invalid User ID" });
  }

  if (!currentPassword || !newPassword) {
    return res
      .status(400)
      .json({ message: "Both current and new passwords are required" });
  }
  if (currentPassword === newPassword) {
    return res
      .status(400)
      .json({ message: "New Password Cannot be Same as Current Password" });
  }

  try {
    // Fetch user's current password from the database
    db.query(
      "SELECT password FROM salespersons WHERE salespersonsid = ?",
      [userId],
      async (err, result) => {
        if (err) {
          console.error("Error fetching user:", err);
          return res
            .status(500)
            .json({ message: "Database error", error: err });
        }

        if (result.length === 0) {
          return res.status(404).json({ message: "User not found" });
        }

        const storedPassword = result[0].password;

        // Compare provided current password with stored password
        const isMatch = await bcrypt.compare(currentPassword, storedPassword);
        if (!isMatch) {
          return res
            .status(400)
            .json({ message: "Current password is incorrect" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the password in the database
        db.query(
          "UPDATE salespersons SET password = ? WHERE salespersonsid = ?",
          [hashedPassword, userId],
          (updateErr) => {
            if (updateErr) {
              console.error("Error updating password:", updateErr);
              return res.status(500).json({
                message: "Database error during update",
                error: updateErr,
              });
            }

            res.status(200).json({ message: "Password changed successfully" });
          }
        );
      }
    );
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const updateOneSignalId = async (req, res) => {
  const { onesignalId } = req.body;

  const id = req.salesUser?.id;
  if (!onesignalId) {
    return res
      .status(400)
      .json({ success: false, message: "onesignalId is required" });
  }
  try {
    const query = `UPDATE salespersons SET onesignalid = ? WHERE salespersonsid = ?`;
    db.query(query, [onesignalId, id], (err, result) => {
      if (err) {
        console.error("OneSignal update error:", err);
        return res
          .status(500)
          .json({ success: false, message: "Database error" });
      }

      if (result.affectedRows === 0) {
        console.log("not");

        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      console.log("suucess");

      return res.json({
        success: true,
        message: "OneSignal ID stored successfully",
        onesignalId,
      });
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const updateProjectPartner = async (req, res) => {
  try {
    const userId = req.salesUser?.id;
    const { projectpartnerid } = req.body;

    if (!projectpartnerid) {
      res
        .status(500)
        .json({ success: false, message: "Project Partner Required !" });
    }
    db.query(
      "UPDATE salespersons SET projectpartnerid = ? WHERE salespersonsid = ?",
      [projectpartnerid, userId],
      (updateErr) => {
        if (updateErr) {
          console.error("Error updating Project Partner:", updateErr);
          return res.status(500).json({
            message: "Database error during update",
            error: updateErr,
          });
        }

        res
          .status(200)
          .json({ message: "Project Partner Updated Successfully " });
      }
    );
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
