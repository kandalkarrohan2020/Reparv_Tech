import db from "../../config/dbconnect.js";
import moment from "moment";
import fs from "fs";
import path from "path";

// **Fetch All Properties**
export const getAll = (req, res) => {
  const sql = `SELECT properties.*, builders.company_name FROM properties 
               INNER JOIN builders ON properties.builderid = builders.builderid 
               ORDER BY properties.propertyid DESC`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching properties:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.json(result);
  });
};

// **Fetch Single Property by ID**
export const getById = (req, res) => {
  const Id = parseInt(req.params.id);
  if (isNaN(Id))
    return res.status(400).json({ message: "Invalid Property ID" });

  const sql = "SELECT properties.*, builders.company_name FROM properties inner join builders on builders.builderid = properties.builderid WHERE propertyid = ?";
  db.query(sql, [Id], (err, result) => {
    if (err) {
      console.error("Error fetching property:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(result[0]);
  });
};

// **Add Property**
export const add = (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const Id = req.body.propertyid ? parseInt(req.body.propertyid) : null;
  const {
    builderid,
    propertytypeid,
    property_name,
    address,
    city,
    location,
    rerano,
    area,
    sqft_price,
    extra,
    videourl,
  } = req.body;

  // Check if an image was uploaded
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  if (
    !builderid ||
    !propertytypeid ||
    !property_name ||
    !address ||
    !city ||
    !location ||
    !rerano ||
    !area ||
    !sqft_price ||
    !videourl
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  db.query(
    "SELECT * FROM properties WHERE rerano = ?",
    [rerano],
    (err, result) => {
      if (err)
        return res.status(500).json({ message: "Database error", error: err });
      if (result.length > 0)
        return res.status(202).json({ message: "Property already exists!" });

      const insertSQL = `INSERT INTO properties (builderid, propertytypeid, property_name, address, city, location, rerano, area, sqft_price, extra, videourl, image, updated_at, created_at) 
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      db.query(
        insertSQL,
        [
          builderid,
          propertytypeid,
          property_name,
          address,
          city,
          location,
          rerano,
          area,
          sqft_price,
          extra,
          videourl,
          imagePath,
          currentdate,
          currentdate,
        ],
        (err, result) => {
          if (err) {
            console.error("Error inserting property:", err);
            return res
              .status(500)
              .json({ message: "Database error", error: err });
          }
          res.status(201).json({
            message: "Property added successfully",
            id: result.insertId,
            imageUrl: imagePath,
          });
        }
      );
    }
  );
};

// **Add Property**
export const addImages = (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const Id = req.body.propertyid ? parseInt(req.body.propertyid) : null;

  try {
    const files = req.files; // Array of uploaded files
    const imagePaths = files.map((file) => file.filename); // Get filenames

    // Insert each image as a separate row
    const insertSQL = `INSERT INTO propertiesimages (propertyid, image, updated_at, created_at) 
                       VALUES ?`;

    const values = imagePaths.map((filename) => [
      Id,
      filename,
      currentdate,
      currentdate,
    ]);

    db.query(insertSQL, [values], (err, result) => {
      if (err) {
        console.error("Error inserting Images:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(200).json({ message: "Images uploaded", images: imagePaths });
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
};

// ** Add New Additional Info **
export const additionalInfoAdd = (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");

  const {
    propertyid,
    wing,
    floor,
    flatno,
    direction,
    ageofconstruction,
    carpetarea,
    superbuiltup,
    salesprice,
    description,
  } = req.body;

  // Step 2: Insert only if not exists
  const insertSQL = `
      INSERT INTO propertiesinfo 
      (propertyid, wing, floor, flatno, direction, ageofconstruction, carpetarea, superbuiltup, salesprice, description, updated_at, created_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    insertSQL,
    [
      propertyid,
      wing,
      floor,
      flatno,
      direction,
      ageofconstruction,
      carpetarea,
      superbuiltup,
      salesprice,
      description,
      currentdate,
      currentdate,
    ],
    (insertErr, insertResult) => {
      if (insertErr) {
        console.error("Error inserting:", insertErr);
        return res
          .status(500)
          .json({ message: "Database error", error: insertErr });
      }

      res.status(201).json({
        message: "Additional Info added successfully",
        Id: insertResult.insertId,
      });
    }
  );
};

export const propertyInfo = (req, res) => {
  const Id = parseInt(req.params.id);
  if (isNaN(Id))
    return res.status(400).json({ message: "Invalid Property ID" });

  const sql = "SELECT * FROM propertiesinfo WHERE propertyid = ?";
  db.query(sql, [Id], (err, result) => {
    if (err) {
      console.error("Error fetching property:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(201).json({ propertyid: Id });
    }
    res.json(result[0]);
  });
};
