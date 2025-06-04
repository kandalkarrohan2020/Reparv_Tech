import db from "../../config/dbconnect.js";
import moment from "moment";

// **Fetch All **
export const getAll = (req, res) => {
  const sql = `
    SELECT enquirers.*, properties.frontView,
    territorypartner.fullname AS territoryName,
    territorypartner.contact AS territoryContact
    FROM enquirers 
    LEFT JOIN properties 
    ON enquirers.propertyid = properties.propertyid
    LEFT JOIN territorypartner ON territorypartner.id = enquirers.territorypartnerid 
    WHERE enquirers.salespersonid = ? 
    
    ORDER BY enquirers.enquirersid DESC`; 

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
  const sql = `SELECT enquirers.*, 
       territorypartner.fullname AS territoryName,
       territorypartner.contact AS territoryContact,
       territoryenquiry.followup AS territoryFollowUp,
       territoryenquiry.status AS territoryStatus 
       FROM enquirers 
       LEFT JOIN territorypartner ON territorypartner.id = enquirers.territorypartnerid 
       LEFT JOIN territoryenquiry ON territoryenquiry.enquirerid = enquirers.enquirersid
       WHERE enquirersid = ?`;

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

// **Fetch All Active Territory Partner**
export const getPropertyCity = (req, res) => {
  const Id = parseInt(req.params.id);
  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Enquiry ID" });
  }
  
  const sql = `SELECT properties.city FROM enquirers 
               INNER JOIN properties 
               ON enquirers.propertyid = properties.propertyid
               WHERE enquirers.enquirersid = ? 
               ORDER BY enquirers.enquirersid DESC`;
  db.query(sql, [Id], (err, result) => {
    if (err) {
      console.error("Error fetching:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.json(result[0]);
  });
};

// **Fetch All Active Territory Partner**
export const getTerritoryPartners = (req, res) => {
  const propertyCity = req.params.city;

  const sql = "SELECT * FROM territorypartner WHERE status = 'Active' AND territorypartner.city = ? ORDER BY id DESC";
  db.query(sql, [propertyCity], (err, result) => {
    if (err) {
      console.error("Error fetching:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.json(result);
  });
};

// Assign Enquiry To Territory Partners
export const assignEnquiry = async (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const { territorypartnerid, territorypartnerdate } = req.body;
  if (!territorypartnerid || !territorypartnerdate) {
    return res.status(400).json({ message: "All Fields Required" });
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
      if (result.length === 0) {
        return res.status(404).json({ message: "Enquiry not found" });
      }

      db.query(
        "UPDATE enquirers SET territorypartnerid = ?, visitdate = ?, updated_at = ?, created_at = ? WHERE enquirersid = ?",
        [territorypartnerid, territorypartnerdate, currentdate, currentdate, Id ],
        (err, result) => {
          if (err) {
            console.error("Error assigning to territory partner :", err);
            return res 
              .status(500)
              .json({ message: "Database error", error: err });
          }
          res
            .status(200)
            .json({
              message: "Enquiry assigned successfully to Territory Partner",
            });
        }
      );
    }
  );
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


