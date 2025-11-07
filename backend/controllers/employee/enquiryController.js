import db from "../../config/dbconnect.js";
import moment from "moment";

// * Add Normal Enquiry (with or without Property ID)
export const addEnquiry = async (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const projectPartnerId = req.employeeUser?.projectpartnerid;
  if (!projectPartnerId) {
    return res.status(401).json({
      message: "Unauthorized Access — Employee is not linked to any Project Partner.",
    });
  }

  const {
    propertyid,
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

  let insertSQL;
  let insertData;

  // Case 1: Enquiry with Property ID
  if (propertyid) {
    insertSQL = `
      INSERT INTO enquirers (
        projectpartner,
        customer,
        contact,
        minbudget,
        maxbudget,
        category,
        state,
        city,
        location,
        propertyid,
        message,
        source,
        updated_at,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    insertData = [
      projectPartnerId,
      customer,
      contact,
      minbudget,
      maxbudget,
      category,
      state,
      city,
      location,
      propertyid,
      message,
      "Direct",
      currentdate,
      currentdate,
    ];
  } 
  
  // Case 2: Enquiry without Property ID
  else {
    insertSQL = `
      INSERT INTO enquirers (
        projectbroker,
        projectpartner,
        customer,
        contact,
        minbudget,
        maxbudget,
        category,
        state,
        city,
        location,
        message,
        source,
        updated_at,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    insertData = [
      projectPartnerId, // projectbroker
      projectPartnerId, // projectpartner
      customer,
      contact,
      minbudget,
      maxbudget,
      category,
      state,
      city,
      location,
      message,
      "Direct",
      currentdate,
      currentdate,
    ];
  }

  db.query(insertSQL, insertData, (err, result) => {
    if (err) {
      console.error("Error inserting enquiry:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    res.status(201).json({
      message: "Enquiry added successfully",
      enquiryId: result.insertId,
    });
  });
};

// Update Normal Enquiry Without Property ID
export const updateEnquiry = async (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const enquiryId = req.params.id;

  if (!enquiryId) {
    return res.status(400).json({ message: "Invalid Enquiry Id" });
  }

  const {
    propertyid,
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
    propertyid = ?,
    message = ?,
    updated_at = ?
    WHERE enquirersid = ?`;

  db.query(
    "SELECT * FROM enquirers WHERE enquirersid = ?",
    [enquiryId],
    (err, result) => {
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
          propertyid,
          message,
          currentdate,
          enquiryId,
        ],
        (err, result) => {
          if (err) {
            console.error("Error updating enquiry:", err);
            return res
              .status(500)
              .json({ message: "Database error", error: err });
          }

          res.status(200).json({
            message: "Enquiry updated successfully",
            affectedRows: result.affectedRows,
          });
        }
      );
    }
  );
};
