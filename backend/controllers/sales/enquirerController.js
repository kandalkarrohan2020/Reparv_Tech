import db from "../../config/dbconnect.js";
import moment from "moment";

// **Fetch All **
export const getAll = (req, res) => {
  const sql = `
    SELECT enquirers.*, properties.image 
    FROM enquirers 
    INNER JOIN properties 
    ON enquirers.propertyid = properties.propertyid 
    WHERE enquirers.salespersonid = ? 
    AND properties.status = 'Active' 
    AND properties.approve = 'Approved' 
    ORDER BY enquirers.enquirersid DESC`; // Ensure correct column name

db.query(sql, [req.user.id], (err, results) => {
  if (err) {
    console.error("Database Query Error:", err);
    return res.status(500).json({ message: "Database query error", error: err });
  }
  res.json(results);
});
};

// **Fetch Single by ID**
export const getById = (req, res) => {
  const Id = parseInt(req.params.id);
  const sql = "SELECT * FROM enquirers WHERE enquirersid = ?";

  db.query(sql, [Id], (err, result) => {
    if (err) {
      console.error("Error fetching :", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Enquiry not found" });
    }
    res.json(result[0]);
  });
};

/* Change status */
export const status = (req, res) => {
  const { enquiryStatus } = req.body;
  if (enquiryStatus === "") {
    return res.status(400).json({ message: "Please Select Status!" });
  }

  const Id = parseInt(req.params.id);
  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Enquiry ID" });
  }

  db.query(
    "SELECT * FROM enquirers WHERE enquirersid = ?",
    [Id],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      db.query(
        "UPDATE enquirers SET status = ? WHERE enquirersid = ?",
        [enquiryStatus, Id],
        (err, result) => {
          if (err) {
            console.error("Error deleting :", err);
            return res
              .status(500)
              .json({ message: "Database error", error: err });
          }
          res
            .status(200)
            .json({ message: "Property status change successfully" });
        }
      );
    }
  );
};

/* Visit Scheduled */

export const visitScheduled = (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const { visitDate, visitRemark } = req.body;

  if (!visitDate || !visitRemark) {
    return res.status(400).json({ message: "Please add visit date and remark!" });
  }

  const Id = parseInt(req.params.id);
  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Enquiry ID" });
  }

  db.query("SELECT * FROM enquirers WHERE enquirersid = ?", [Id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Enquirer not found" });
    }

    const insertSQL = `
      INSERT INTO propertyfollowup (enquirerid, visitdate, remark, updated_at, created_at)
      VALUES (?, ?, ?, ?, ?)`;

    db.query(insertSQL, [Id, visitDate, visitRemark, currentdate, currentdate], (err, insertResult) => {
      if (err) {
        console.error("Error inserting visit:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      res.status(201).json({ message: "Visit added successfully", Id: insertResult.insertId });
    });
  });
};

export const token = (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const { paymenttype, remark, dealamount } = req.body;
  
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  if (!paymenttype || !remark || !dealamount ) {
    return res.status(400).json({ message: "Please add visit date and remark!" });
  }

  const Id = parseInt(req.params.id);
  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Enquiry ID" });
  }

  db.query("SELECT * FROM enquirers WHERE enquirersid = ?", [Id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Enquirer not found" });
    }

    const insertSQL = `
      INSERT INTO propertyfollowup (enquirerid, paymenttype, remark, dealamount, paymentimage, updated_at, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(insertSQL, [Id, paymenttype, remark, dealamount, imagePath, currentdate, currentdate], (err, insertResult) => {
      if (err) {
        console.error("Error inserting visit:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      res.status(201).json({ message: "Token added successfully", Id: insertResult.insertId });
    });
  });
};

export const followUp = (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const { followUpRemark } = req.body;

  if (!followUpRemark) {
    return res.status(400).json({ message: "Please add remark!" });
  }

  const Id = parseInt(req.params.id);
  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Enquiry ID" });
  }

  db.query("SELECT * FROM enquirers WHERE enquirersid = ?", [Id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    const insertSQL = `
      INSERT INTO propertyfollowup (enquirerid, remark, updated_at, created_at)
      VALUES (?, ?, ?, ?)`;

    db.query(insertSQL, [Id, followUpRemark, currentdate, currentdate], (err, insertResult) => {
      if (err) {
        console.error("Error inserting visit:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      res.status(201).json({ message: "Follow Up remark added successfully", Id: insertResult.insertId });
    });
  });
};

export const cancelled = (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const { cancelledRemark } = req.body;

  if (!cancelledRemark) {
    return res.status(400).json({ message: "Please add remark!" });
  }

  const Id = parseInt(req.params.id);
  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Enquiry ID" });
  }

  db.query("SELECT * FROM enquirers WHERE enquirersid = ?", [Id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    const insertSQL = `
      INSERT INTO propertyfollowup (enquirerid, remark, updated_at, created_at)
      VALUES (?, ?, ?, ?)`;

    db.query(insertSQL, [Id, cancelledRemark, currentdate, currentdate], (err, insertResult) => {
      if (err) {
        console.error("Error while Add Remark:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      res.status(201).json({ message: "Remark added successfully", Id: insertResult.insertId });
    });
  });
};


