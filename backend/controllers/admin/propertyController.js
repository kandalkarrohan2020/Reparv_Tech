import db from "../../config/dbconnect.js";
import moment from "moment";

// **Fetch All Properties**
export const getAll = (req, res) => {
  const sql = `SELECT * FROM properties 
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

// **Add or Update Property**
export const add = (req, res) => {
  
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const Id = req.body.propertyid ? parseInt(req.body.propertyid) : null;
  const { propertytypeid, project, address, location, rerano, area, sqft_price, extra } = req.body;

  if (!propertytypeid || !project || !address || !location || !rerano || !area || !sqft_price || !extra) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (Id) {
    db.query("SELECT * FROM properties WHERE propertyid = ?", [Id], (err, result) => {
      if (err) return res.status(500).json({ message: "Database error", error: err });
      if (result.length === 0) return res.status(404).json({ message: "Property not found" });

      const updateSQL = `UPDATE properties 
                        SET propertytypeid=?, project=?, address=?, location=?, rerano=?, area=?, sqft_price=?, extra=?, updated_at=? 
                        WHERE propertyid=?`;
      db.query(updateSQL, [propertytypeid, project, address, location, rerano, area, sqft_price, extra, currentdate, Id], (err) => {
        if (err) {
          console.error("Error updating property:", err);
          return res.status(500).json({ message: "Database error", error: err });
        }
        res.status(200).json({ message: "Property updated successfully" });
      });
    });
  } else {
    db.query("SELECT * FROM properties WHERE rerano = ?", [rerano], (err, result) => {
      if (err) return res.status(500).json({ message: "Database error", error: err });
      if (result.length > 0) return res.status(202).json({ message: "Property already exists!" });

      const insertSQL = `INSERT INTO properties (propertytypeid, project, address, location, rerano, area, sqft_price, extra, updated_at, created_at) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      db.query(insertSQL, [propertytypeid, project, address, location, rerano, area, sqft_price, extra, currentdate, currentdate], (err, result) => {
        if (err) {
          console.error("Error inserting property:", err);
          return res.status(500).json({ message: "Database error", error: err });
        }
        res.status(201).json({ message: "Property added successfully", id: result.insertId });
      });
    });
  }
};

// **Delete Property**
export const del = (req, res) => {
  const Id = parseInt(req.params.id);
  if (isNaN(Id)) return res.status(400).json({ message: "Invalid Property ID" });

  db.query("SELECT * FROM properties WHERE propertyid = ?", [Id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Property not found" });
    }

    db.query("DELETE FROM properties WHERE propertyid = ?", [Id], (err) => {
      if (err) {
        console.error("Error deleting property:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(200).json({ message: "Property deleted successfully" });
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
