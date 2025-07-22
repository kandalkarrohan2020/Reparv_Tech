import moment from "moment";
import db from "../../config/dbconnect.js";

export const add = (req, res) => {
  try {
    const { fullname, contact } = req.body;
    const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
    // Input validation updated_at, created_at
    if (!fullname || !contact) {
      return res
        .status(400)
        .json({ message: "Full name and contact are required." });
    }

    const sql = `INSERT INTO mobileusers (fullname, contact,updated_at, created_at) VALUES (?, ?,?,?)`;
    db.query(
      sql,
      [fullname, contact, currentdate, currentdate],
      (err, result) => {
        if (err) {
          console.error("Error during Sign Up:", err);
          return res
            .status(500)
            .json({ message: "Database error", error: err });
        }

        res.status(201).json({
          message: "Successfully Signed Up",
          data: {
            id: result.insertId,
            fullname,
            contact,
          },
        });
      }
    );
  } catch (error) {
    console.error("Unexpected error in Sign Up:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
