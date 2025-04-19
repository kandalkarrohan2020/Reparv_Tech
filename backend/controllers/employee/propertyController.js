import db from "../../config/dbconnect.js";
import moment from "moment";
import fs from "fs";
import path from "path";

// **Fetch All Properties**
export const getAll = (req, res) => {
  const sql = `SELECT properties.*, builders.company_name FROM properties 
               INNER JOIN builders ON properties.builderid = builders.builderid WHERE properties.employeeid = ? 
               ORDER BY properties.propertyid DESC`;
  db.query(sql, [req.user.id], (err, result) => {
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

// get all images 
export const getImages = (req, res) => {
  const partnerId = req.user.id;
  if (!partnerId) {
    return res.status(400).json({ message: "Unauthorized Access" });
  }

  const Id = parseInt(req.params.id);
  if (isNaN(Id)){
    return res.status(400).json({ message: "Invalid Property ID" });
  }

  const sql = "SELECT * FROM propertiesimages WHERE propertyid = ?";
  db.query(sql, [Id], (err, result) => {
    if (err) {
      console.error("Error fetching property images:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(result);
  });

}

// **Add Property**
export const add = (req, res) => {
  const partnerId = req.user.id;
  if(!partnerId) {
    return res.status(401).json({ message: "Unauthorized Access"});
  }

  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const Id = req.body.propertyid ? parseInt(req.body.propertyid) : null;
  const {
    builderid,
    partnerid,
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
    !area ||
    !sqft_price
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  db.query(
    "SELECT * FROM properties WHERE propertyid = ?",
    [Id],
    (err, result) => {
      if (err)
        return res.status(500).json({ message: "Database error", error: err });
      if (result.length > 0)
        return res.status(202).json({ message: "Property already exists!" });

      const insertSQL = `INSERT INTO properties (builderid, employeeid, propertytypeid, property_name, address, city, location, rerano, area, sqft_price, extra, videourl, image, updated_at, created_at) 
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      db.query(
        insertSQL,
        [
          builderid,
          partnerId,
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

// **Update Property**
export const update = (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");

  const partnerId = req.user.id;
  if (!partnerId) {
    return res.status(400).json({ message: "Unauthorized Access" });
  }

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
    videourl,
  } = req.body;

  // Check if required fields are provided
  if (
    !builderid ||
    !propertytypeid ||
    !property_name ||
    !address ||
    !city ||
    !location ||
    !area ||
    !sqft_price 
  ) {
    return res
      .status(400)
      .json({ message: "All required fields must be filled" });
  }

  // Handle Image Upload (if a new file is uploaded)
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  // Retrieve existing property to check if an image is already present
  db.query(
    "SELECT * FROM properties WHERE propertyid = ?",
    [Id],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Property not found" });
      }
      
      let approve;
      if(result[0].approve === "Rejected" || result[0].approve === "Not Approved"){
        approve = "Not Approved";
      } else {
        approve = "Approved"
      }
      // Preserve existing image if no new image is uploaded
      const existingImage = result[0].image;
      const finalImagePath = imagePath || existingImage;

      const updateSQL = `
      UPDATE properties 
      SET rejectreason=NULL, approve=?, builderid=?, propertytypeid=?, property_name=?, address=?, city=?, location=?, rerano=?, area=?, sqft_price=?, extra=?, videourl=?, image=?, updated_at=? 
      WHERE propertyid=?`;

      db.query(
        updateSQL,
        [ approve,
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
          finalImagePath, // Use the existing image if no new image is uploaded
          currentdate,
          Id,
        ],
        (err) => {
          if (err) {
            console.error("Error updating property:", err);
            return res
              .status(500)
              .json({ message: "Database error", error: err });
          }
          res.status(200).json({ message: "Property updated successfully" });
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

export const deleteImages = (req, res) => {
  const Id = parseInt(req.params.id);
  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Property ID" });
  }

  // First, fetch the image path from the database
  db.query("SELECT image FROM propertiesimages WHERE imageid = ?", [Id], (err, result) => {
    if (err) {
      console.error("Error fetching image:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    
    if (result.length === 0) {
      return res.status(404).json({ message: "Image not found" });
    }

    const imagePath = result[0].image; // Get the image path
    if (imagePath) {
      const filePath = path.join(process.cwd(), imagePath); // Full path to the file

      // Delete the image file from the uploads folder
      fs.unlink(filePath, (err) => {
        if (err && err.code !== "ENOENT") {
          console.error("Error deleting image:", err);
        }

        // Now delete the record from the database
        db.query("DELETE FROM propertiesimages WHERE imageid = ?", [Id], (err) => {
          if (err) {
            console.error("Error deleting Image:", err);
            return res.status(500).json({ message: "Database error", error: err });
          }
          res.status(200).json({ message: "Image deleted successfully" });
        });
      });
    } else {
      res.status(404).json({ message: "Image path not found" });
    }
  });
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
