import db from "../../config/dbconnect.js";
import moment from "moment";

export const add = async (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");

  const {
    propertyid,
    fullname,
    phone,
    email,
    budget,
    city,
    location,
    message,
  } = req.body; // Removed 'await'

  // Validate required fields
  if (
    !propertyid ||
    !fullname ||
    !phone ||
    !email ||
    !budget ||
    !city ||
    !location ||
    !message 
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const insertSQL = `INSERT INTO enquirers (
    propertyid,
    customer,
    contact,
    email,
    budget,
    city,
    location,
    message, updated_at, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    insertSQL,
    [
      propertyid,
      fullname,
      phone,
      email,
      budget,
      city,
      location,
      message,
      currentdate,
      currentdate,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(201).json({
        message: "Enquiry added successfully",
        Id: result.insertId,
      });
    }
  );
};