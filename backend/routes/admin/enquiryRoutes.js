import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import csv from "csv-parser";
import moment from "moment";
import db from "../../config/dbconnect.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["text/csv", "application/vnd.ms-excel"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only CSV files are allowed"));
    }
    cb(null, true);
  },
});

router.post("/csv/add", upload.single("csv"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "CSV file is required" });
  }

  const results = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (row) => results.push(row))
    .on("end", () => {
      const values = results.map((row) => [
        "CSV File",
        row.customer || null,
        row.contact || null,
        row.minbudget || null,
        row.maxbudget || null,
        row.category || null,
        row.location || null,
        row.state || null,
        row.city || null,
        row.status || "New",
        row.message || null
      ]);

      const query = `
        INSERT INTO enquirers (
          source, customer, contact, minbudget,  maxbudget, category, location,
          state, city, status, message
        ) VALUES ?
      `;

      db.query(query, [values], (err) => {
        fs.unlinkSync(req.file.path); // Clean up
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ message: "Database insert failed", error: err });
        }
        res.json({
          message: "CSV data inserted into enquirers table successfully!",
        });
      });
    });
});

// * Add Normal Enquiry (with or without Property ID)
router.post("/add/enquiry", async (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
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

  try {
    let projectpartnerid = null;

    // Case 1: If propertyid is provided, fetch projectpartnerid from properties
    if (propertyid) {
      const [property] = await new Promise((resolve, reject) => {
        db.query(
          "SELECT projectpartnerid FROM properties WHERE propertyid = ?",
          [propertyid],
          (err, results) => {
            if (err) return reject(err);
            resolve(results);
          }
        );
      });

      if (property) {
        projectpartnerid = property.projectpartnerid;
      } else {
        return res.status(404).json({ message: "Property not found" });
      }
    }

    // Build Insert SQL and Data
    let insertSQL;
    let insertData;

    if (propertyid) {
      insertSQL = `
        INSERT INTO enquirers (
          customer,
          contact,
          minbudget,
          maxbudget,
          category,
          state,
          city,
          location,
          propertyid,
          projectpartnerid,
          message,
          source,
          updated_at,
          created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      insertData = [
        customer,
        contact,
        minbudget,
        maxbudget,
        category,
        state,
        city,
        location,
        propertyid,
        projectpartnerid,
        message,
        "Direct",
        currentdate,
        currentdate,
      ];
    } else {
      insertSQL = `
        INSERT INTO enquirers (
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
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      insertData = [
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

    // Insert the enquiry record
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
  } catch (error) {
    console.error("Error adding enquiry:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

router.put("/update/enquiry/:id", async (req, res) => {
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

  try {
    // Check if enquiry exists
    const existing = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM enquirers WHERE enquirersid = ?",
        [enquiryId],
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });

    if (existing.length === 0) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    // Fetch projectpartnerid if propertyid is provided
    let projectpartnerid = null;

    if (propertyid) {
      const [property] = await new Promise((resolve, reject) => {
        db.query(
          "SELECT projectpartnerid FROM properties WHERE propertyid = ?",
          [propertyid],
          (err, results) => {
            if (err) return reject(err);
            resolve(results);
          }
        );
      });

      if (property) {
        projectpartnerid = property.projectpartnerid;
      } else {
        return res.status(404).json({ message: "Property not found" });
      }
    }

    // Build the UPDATE query
    const updateSQL = `
      UPDATE enquirers SET 
        customer = ?,
        contact = ?,
        minbudget = ?,
        maxbudget = ?,
        category = ?,
        state = ?,
        city = ?,
        location = ?,
        propertyid = ?,
        projectpartnerid = ?,
        message = ?,
        updated_at = ?
      WHERE enquirersid = ?
    `;

    const updateData = [
      customer,
      contact,
      minbudget,
      maxbudget,
      category,
      state,
      city,
      location,
      propertyid,
      projectpartnerid,
      message,
      currentdate,
      enquiryId,
    ];

    // Perform update
    db.query(updateSQL, updateData, (err, result) => {
      if (err) {
        console.error("Error updating enquiry:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      res.status(200).json({
        message: "Enquiry updated successfully",
        affectedRows: result.affectedRows,
      });
    });
  } catch (error) {
    console.error("Error updating enquiry:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
