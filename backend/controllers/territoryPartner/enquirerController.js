import db from "../../config/dbconnect.js";
import moment from "moment";

// **Fetch All **
export const getAll = (req, res) => {
  const sql = `SELECT enquirers.*, 
    properties.image, 
    territoryenquiry.visitdate AS visitDate,
    territoryenquiry.status AS territoryStatus,
    territoryenquiry.teid
    FROM enquirers 
    INNER JOIN properties 
    ON enquirers.propertyid = properties.propertyid 
    INNER JOIN territoryenquiry ON territoryenquiry.enquirerid = enquirers.enquirersid
    WHERE territoryenquiry.territorypartnerid = ? 
    ORDER BY territoryenquiry.teid DESC
    `;

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
  const sql = `SELECT enquirers.*, territoryenquiry.visitdate AS visitDate,
               territoryenquiry.teid, territoryenquiry.followup, territoryenquiry.status AS territoryStatus 
               FROM enquirers INNER JOIN territoryenquiry 
               ON territoryenquiry.enquirerid = enquirers.enquirersid 
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

export const acceptEnquiry = (req, res) => {
  const partnerId = req.user.id;
  if (!partnerId) {
    return res.status(400).json({ message: "Unauthorized! Please Login Again." });
  }
  const enquiryId = parseInt(req.params.id);
  if (isNaN(enquiryId)) {
    return res.status(400).json({ message: "Invalid Enquiry ID" });
  }
  const { teid } = req.body;
  if(!teid){
    return res.status(400).json({ message: "Invalid Territory Enquiry ID" });
  }

  db.query(
    "SELECT * FROM enquirers WHERE enquirersid = ?",
    [enquiryId],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      db.query(
        "UPDATE enquirers SET status = 'Visit Scheduled', territorypartnerid = ? WHERE enquirersid = ?",
        [partnerId, enquiryId],
        (err, result) => {
          if (err) {
            console.error("Error :", err);
            return res
              .status(500)
              .json({ message: "Database error", error: err });
          }
        }
      );

      db.query(
        "UPDATE territoryenquiry SET status = 'Accepted' WHERE teid = ?",
        [teid],
        (err, result) => {
          if (err) {
            console.error("Error :", err);
            return res
              .status(500)
              .json({ message: "Database error", error: err });
          }
          res
            .status(200)
            .json({ message: "Enquiry status change successfully" });
        }
      );
    }
  );
};

export const rejectEnquiry = (req, res) => {
  const enquiryId = parseInt(req.params.id);
  if (isNaN(enquiryId)) {
    return res.status(400).json({ message: "Invalid Enquiry ID" });
  }
  const { teid } = req.body;
  if(!teid){
    return res.status(400).json({ message: "Invalid Territory Enquiry ID" });
  }
  db.query(
    "SELECT * FROM enquirers WHERE enquirersid = ?",
    [enquiryId],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      db.query(
        "UPDATE territoryenquiry SET status = 'Rejected' WHERE teid = ?",
        [teid],
        (err, result) => {
          if (err) {
            console.error("Error :", err);
            return res
              .status(500)
              .json({ message: "Database error", error: err });
          }
          res
            .status(200)
            .json({ message: "Enquiry status change successfully" });
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

export const followUp = (req, res) => {
  const { followUpRemark, territoryId } = req.body;
  if (!followUpRemark || !territoryId) {
    return res.status(400).json({ message: "All Fields are Required!" });
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

    const updateSQL = `UPDATE territoryenquiry SET followup = ? WHERE teid = ?`;

    db.query(updateSQL, [followUpRemark, territoryId], (err, insertResult) => {
      if (err) {
        console.error("Error inserting visit:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      res.status(201).json({ message: "Follow Up remark added successfully", Id: insertResult.insertId });
    });
  });
};

