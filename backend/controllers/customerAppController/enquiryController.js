// import db from "../../config/dbconnect.js";
import moment from "moment";
import db from "../../config/dbconnect.js";


export const add = async (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");


  const {
    user_id,
    propertyid,
    fullname,
    phone,
    state,
    city,
    minbudget,
    maxbudget,
  } = req.body;

  if (
    !user_id ||  // Include user_id in validation
    !propertyid ||
    !fullname ||
    !phone ||
    !state ||
    !city ||
    !minbudget ||
    !maxbudget
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Step 1: Fetch property category
  const categorySQL = `SELECT propertyCategory FROM properties WHERE propertyid = ?`;

  db.query(categorySQL, [propertyid], (err, results) => {
    if (err) {
      console.error("Error fetching property category:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Property not found" });
    }

    const propertyCategory = results[0].propertyCategory;

    // Step 2: Insert enquiry
    const insertSQL = `INSERT INTO enquirers (
      propertyid, category, customer, contact, state, city, minbudget, maxbudget, source,
      updated_at, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(
      insertSQL,
      [
        propertyid,
        propertyCategory,
        fullname,
        phone,
        state,
        city,
        minbudget,
        maxbudget,
        "Onsite",
        currentdate,
        currentdate,
      ],
      (err, result) => {
        if (err) {
          console.error("Error inserting enquiry:", err);
          return res
            .status(500)
            .json({ message: "Database error", error: err });
        }

        // Step 3: Remove from wishlist if exists
        const deleteWishlistSql = `
          DELETE FROM user_property_wishlist 
          WHERE user_id = ? AND property_id = ?
        `;

        db.query(deleteWishlistSql, [user_id, propertyid], (delErr, delResult) => {
          if (delErr) {
            console.error("Error auto-removing from wishlist after enquiry:", delErr);
            // Optional: don't block success response
          } else {
            console.log("Removed property from wishlist after enquiry.");
          }

           console.error("Error inserting enquiry:", err);
          // Final response
          res.status(201).json({
            message: "Enquiry added successfully",
            Id: result.insertId,
            propertyCategory: propertyCategory,
          });
        });
      }
    );
  });
};

// Fetch All Enquiries for a Customer (GET)
export const getAll = (req, res) => {
  const { contact } = req.query;

  // Validate contact
  if (!contact || !contact.trim()) {
    return res.status(400).json({
      message: "Please provide a valid contact number",
    });
  }

  const sql = `
    SELECT 
      enquirers.*, 
      properties.*, 
      territorypartner.fullname AS territoryName,
      territorypartner.contact AS territoryContact
    FROM enquirers 
    LEFT JOIN properties ON enquirers.propertyid = properties.propertyid
    LEFT JOIN territorypartner ON territorypartner.id = enquirers.territorypartnerid 
    WHERE enquirers.contact = ?
    ORDER BY enquirers.enquirersid DESC
  `;

  db.query(sql, [contact.trim()], (err, results) => {
    if (err) {
      console.error("Database Query Error:", err);
      return res.status(500).json({
        message: "Database query error",
        error: err,
      });
    }

    const formatted = results.map((row) => ({
      ...row,
      created_at: row.created_at ? moment(row.created_at).format("DD MMM YYYY | hh:mm A") : null,
      updated_at: row.updated_at ? moment(row.updated_at).format("DD MMM YYYY | hh:mm A") : null,
    }));

    res.status(200).json({
      message: "Fetched successfully",
      data: formatted,
    });
  });
};

//Fetch only Visit Enquiry 
export const getVisitsOnly = (req, res) => {
  const { contact, fullname } = req.query;


  //Validate required query parameters
  if (!contact || !fullname) {
    return res.status(400).json({
      message: "Please provide contact and fullname!",
    });
  }

  //  Get visit records with visitdate and status
  const sql = `
    SELECT 
      enquirers.*, 
      properties.*
    FROM enquirers 
    LEFT JOIN properties ON enquirers.propertyid = properties.propertyid
    WHERE enquirers.contact = ? 
      AND enquirers.customer = ? 
      AND enquirers.visitdate IS NOT NULL 
      AND enquirers.status = 'Visit Scheduled'
    ORDER BY enquirers.enquirersid DESC
  `;

  db.query(sql, [contact, fullname], (err, results) => {
    if (err) {
      console.error("Database Query Error:", err);
      return res.status(500).json({
        message: "Database query error",
        error: err,
      });
    }

    //Format created_at and updated_at
    const formatted = results.map((row) => ({
      ...row,
      created_at: moment(row.created_at).format("DD MMM YYYY | hh:mm A"),
      updated_at: moment(row.updated_at).format("DD MMM YYYY | hh:mm A"),
    }));

    return res.json({
      message: "Visits fetched successfully",
      data: formatted,
    });
  });
};

