import moment from "moment";
import db from "../../config/dbconnect.js";

export const add = (req, res) => {
  try {
    const { fullname, contact } = req.body;
    const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");

    // Input validation
    if (!fullname || !contact) {
      return res
        .status(400)
        .json({ message: "Full name and contact are required." });
    }

    // Step 1: Check if contact already exists
    const checkSql =
      "SELECT user_id, fullname, contact FROM mobileusers WHERE contact = ?";
    db.query(checkSql, [contact], (checkErr, checkResults) => {
      if (checkErr) {
        console.error("Error during user check:", checkErr);
        return res
          .status(500)
          .json({ message: "Database error", error: checkErr });
      }

      // Step 2: If user exists, return existing data
      if (checkResults.length > 0) {
        const existingUser = checkResults[0];
        return res.status(200).json({
          message: "User already exists",
          data: {
            id: existingUser.user_id,
            fullname: existingUser.fullname,
            contact: existingUser.contact,
          },
        });
      }

      // Step 3: Insert new user
      const insertSql = `INSERT INTO mobileusers (fullname, contact, updated_at, created_at) VALUES (?, ?, ?, ?)`;
      db.query(
        insertSql,
        [fullname, contact, currentdate, currentdate],
        (insertErr, result) => {
          if (insertErr) {
            console.error("Error during Sign Up:", insertErr);
            return res
              .status(500)
              .json({ message: "Database error", error: insertErr });
          }

          return res.status(201).json({
            message: "Successfully Signed Up",
            data: {
              id: result.insertId,
              fullname,
              contact,
            },
          });
        }
      );
    });
  } catch (error) {
    console.error("Unexpected error in Sign Up:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};