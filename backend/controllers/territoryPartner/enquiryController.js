import db from "../../config/dbconnect.js";
import moment from "moment";

export const add = async (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const territoryId = req.user.id;
  if (!territoryId) {
    return res.status(400).json({ message: "Invalid Sales Id" });
  }

  const { propertyid, fullname, phone, territoryName, territoryContact } = req.body;

  // Validate required fields
  if (
    !propertyid ||
    !fullname ||
    !phone ||
    !territoryName ||
    !territoryContact
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  let territoryInfo = territoryName + " - " + territoryContact;

  const insertSQL = `INSERT INTO enquirers (
    propertyid,
    territorypartnerid,
    customer,
    contact,
    assign,
    territorystatus,
    updated_at, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    insertSQL,
    [propertyid, territoryId, fullname, phone, territoryInfo, "Accepted", currentdate, currentdate],
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

// Add Normal Enquiry Without Property ID
export const addEnquiry = async (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const territoryId = req.user.id;
  if (!territoryId) {
    return res.status(400).json({ message: "Invalid Sales Id" });
  }

  const {
    customer,
    contact,
    budget,
    state,
    city,
    location,
    message,
    territoryName,
    territoryContact,
  } = req.body;

  // Validate required fields
  if (
    !customer ||
    !contact ||
    !budget ||
    !state ||
    !city ||
    !location ||
    !message ||
    !territoryName ||
    !territoryContact
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  let territoryInfo = territoryName + " - " + territoryContact;

  const insertSQL = `INSERT INTO enquirers (
    territorypartnerid,
    customer,
    contact,
    budget,
    state,
    city,
    location,
    message,
    assign,
    source,
    territorystatus,
    updated_at, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    insertSQL,
    [
      territoryId,
      customer,
      contact,
      budget,
      state,
      city,
      location,
      message,
      territoryInfo,
      "Direct",
      "Accepted",
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
