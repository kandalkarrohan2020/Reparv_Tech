import db from "../../config/dbconnect.js";
import moment from "moment";
import fs from "fs";
import path from "path";

// **Fetch All Properties**
export const getAll = (req, res) => {
  const sql = `SELECT properties.*, propertytypes.propertytype, builders.company_name FROM properties 
               INNER JOIN propertytypes ON properties.propertytypeid = propertytypes.propertytypeid 
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
  if (isNaN(Id)) return res.status(400).json({ message: "Invalid Property ID" });

  const sql = "SELECT * FROM properties WHERE propertyid = ?";
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
  const { builderid, propertytypeid, property_name, address, city, location, rerano, area, sqft_price, extra } = req.body;

  // Check if an image was uploaded
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  if (!builderid || !propertytypeid || !property_name || !address || !city || !location || !rerano || !area || !sqft_price) {
    return res.status(400).json({ message: "All fields are required" });
  }

  db.query("SELECT * FROM properties WHERE rerano = ?", [rerano], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    if (result.length > 0) return res.status(202).json({ message: "Property already exists!" });

    const insertSQL = `INSERT INTO properties (builderid, propertytypeid, property_name, address, city, location, rerano, area, sqft_price, extra, image, updated_at, created_at) 
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(insertSQL, [builderid, propertytypeid, property_name, address, city, location, rerano, area, sqft_price, extra, imagePath, currentdate, currentdate], (err, result) => {
      if (err) {
        console.error("Error inserting property:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(201).json({ message: "Property added successfully", id: result.insertId, imageUrl: imagePath });
    });
  });
};


// **Update Property**
export const update = (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const Id = req.params.id ? parseInt(req.params.id) : null;

  if (!Id) {
    return res.status(400).json({ message: "Invalid property ID" });
  }

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
  } = req.body;

  // Check if required fields are provided
  if (
    !builderid ||
    !propertytypeid ||
    !property_name ||
    !address ||
    !city ||
    !location ||
    !rerano ||
    !area ||
    !sqft_price
  ) {
    return res.status(400).json({ message: "All required fields must be filled" });
  }

  // Handle Image Upload (if a new file is uploaded)
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  // Retrieve existing property to check if an image is already present
  db.query("SELECT * FROM properties WHERE propertyid = ?", [Id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Preserve existing image if no new image is uploaded
    const existingImage = result[0].image;
    const finalImagePath = imagePath || existingImage;

    const updateSQL = `
      UPDATE properties 
      SET builderid=?, propertytypeid=?, property_name=?, address=?, city=?, location=?, rerano=?, area=?, sqft_price=?, extra=?, image=?, updated_at=? 
      WHERE propertyid=?`;

    db.query(
      updateSQL,
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
        finalImagePath, // Use the existing image if no new image is uploaded
        currentdate,
        Id,
      ],
      (err) => {
        if (err) {
          console.error("Error updating property:", err);
          return res.status(500).json({ message: "Database error", error: err });
        }
        res.status(200).json({ message: "Property updated successfully" });
      }
    );
  });
};

export const del = (req, res) => {
  const Id = parseInt(req.params.id);
  if (isNaN(Id)) return res.status(400).json({ message: "Invalid Property ID" });

  db.query("SELECT image FROM properties WHERE propertyid = ?", [Id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Property not found" });
    }

    const imagePath = result[0].image; // Get the image path from the database
    if (imagePath) {
      const filePath = path.join(process.cwd(), imagePath); // Full path to the file

      // Delete the image file from the uploads folder
      fs.unlink(filePath, (err) => {
        if (err && err.code !== "ENOENT") {
          console.error("Error deleting image:", err);
        }
      });
    }

    // Now delete the property from the database
    db.query("DELETE FROM properties WHERE propertyid = ?", [Id], (err) => {
      if (err) {
        console.error("Error deleting property:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(200).json({ message: "Property and image deleted successfully" });
    });
  });
};

//**Change status */
export const status = (req, res) => {
  const Id = parseInt(req.params.id);
  console.log(Id);
  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Property ID" });
  }

  db.query("SELECT * FROM properties WHERE propertyid = ?", [Id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    
    let status='';
    if (result[0].status === 'Active') {
      status='Inactive';
    }else{
      status='Active';
    }
    console.log(status);
    db.query("UPDATE properties SET status = ? WHERE propertyid = ?", [status, Id], (err,result) => {
      if (err) {
        console.error("Error deleting :", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(200).json({ message: "Property status change successfully" });
    });
  });
};

//**approve property */
export const approve = (req, res) => {
  const Id = parseInt(req.params.id);
  console.log(Id);
  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Property ID" });
  }

  db.query("SELECT * FROM properties WHERE propertyid = ?", [Id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    
    let approve='';
    if (result[0].approve === 'Not Approved') {
      approve='Approved';
    }else{
      approve='Not Approved';
    }
    
    db.query("UPDATE properties SET approve = ? WHERE propertyid = ?", [approve, Id], (err,result) => {
      if (err) {
        console.error("Error deleting :", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(200).json({ message: "Property status change successfully" });
    });
  });
};
