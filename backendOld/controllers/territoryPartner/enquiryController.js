import db from "../../config/dbconnect.js";
import moment from "moment";

export const add = async (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const territoryId = req.user.id;
  if (!territoryId) {
    return res.status(400).json({ message: "Invalid Sales Id" });
  }

  const { propertyid, fullname, phone, territoryName, territoryContact } =
    req.body;

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
    [
      propertyid,
      territoryId,
      fullname,
      phone,
      territoryInfo,
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
    minbudget,
    maxbudget,
    category,
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
    !minbudget ||
    !maxbudget ||
    !category ||
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
    minbudget,
    maxbudget,
    category,
    state,
    city,
    location,
    message,
    assign,
    source,
    territorystatus,
    updated_at, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    insertSQL,
    [
      territoryId,
      customer,
      contact,
      minbudget,
      maxbudget,
      category,
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

// Update Normal Enquiry Without Property ID
export const updateEnquiry = async (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const enquiryId = req.params.id;

  if (!enquiryId) {
    return res.status(400).json({ message: "Invalid Enquiry Id" });
  }

  const {
    customer,
    contact,
    minbudget,
    maxbudget,
    category,
    state,
    city,
    location,
    message,
  } = req.body;

  // Validate required fields
  if (
    !customer ||
    !contact ||
    !minbudget ||
    !maxbudget ||
    !category ||
    !state ||
    !city ||
    !location ||
    !message
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const updateSQL = `UPDATE enquirers SET 
    customer = ?,
    contact = ?,
    minbudget = ?,
    maxbudget = ?,
    category = ?,
    state = ?,
    city = ?,
    location = ?,
    message = ?,
    updated_at = ?
    WHERE enquirersid = ?`;

  db.query("SELECT * FROM enquirers WHERE enquirersid = ?", [enquiryId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    db.query(
      updateSQL,
      [
        customer,
        contact,
        minbudget,
        maxbudget,
        category,
        state,
        city,
        location,
        message,
        currentdate,
        enquiryId,
      ],
      (err, result) => {
        if (err) {
          console.error("Error updating enquiry:", err);
          return res.status(500).json({ message: "Database error", error: err });
        }

        res.status(200).json({
          message: "Enquiry updated successfully",
          affectedRows: result.affectedRows,
        });
      }
    );
  });
};