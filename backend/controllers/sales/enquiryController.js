import db from "../../config/dbconnect.js";
import moment from "moment";

export const add = async (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const salesId = req.user.id;
  if (!salesId) {
    return res.status(400).json({ message: "Invalid Sales Id" });
  }

  const { propertyid, fullname, phone, salesPersonName, salesPersonContact } =
    req.body;

  // Validate required fields
  if (
    !propertyid ||
    !fullname ||
    !phone ||
    !salesPersonName ||
    !salesPersonContact
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  let salesInfo = salesPersonName + " - " + salesPersonContact;

  const insertSQL = `INSERT INTO enquirers (
    propertyid,
    salespersonid,
    customer,
    contact,
    assign,
    updated_at, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    insertSQL,
    [propertyid, salesId, fullname, phone, salesInfo, currentdate, currentdate],
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
  const salesId = req.user.id;
  if (!salesId) {
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
    salesPersonName,
    salesPersonContact,
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
    !salesPersonName ||
    !salesPersonContact
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  let salesInfo = salesPersonName + " - " + salesPersonContact;

  const insertSQL = `INSERT INTO enquirers (
    salespersonid,
    customer,
    contact,
    budget,
    state,
    city,
    location,
    message,
    assign,
    source,
    updated_at, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    insertSQL,
    [
      salesId,
      customer,
      contact,
      budget,
      state,
      city,
      location,
      message,
      salesInfo,
      "Direct",
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
