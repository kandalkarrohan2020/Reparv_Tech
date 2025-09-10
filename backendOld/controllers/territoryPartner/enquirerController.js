import db from "../../config/dbconnect.js";
import moment from "moment";

// **Fetch All **
export const getAll = (req, res) => {
  const sql = `SELECT enquirers.*, 
    properties.frontView, properties.seoSlug, properties.commissionAmount
    FROM enquirers 
    LEFT JOIN properties 
    ON enquirers.propertyid = properties.propertyid 
    WHERE enquirers.status != 'Token' AND enquirers.territorypartnerid = ? 
    ORDER BY enquirersid DESC
    `;
  db.query(sql, [req.user.id], (err, results) => {
    if (err) {
      console.error("Database Query Error:", err);
      return res
        .status(500)
        .json({ message: "Database query error", error: err });
    }
    const formatted = results.map((row) => ({
      ...row,
      created_at: moment(row.created_at).format("DD MMM YYYY | hh:mm A"),
      updated_at: moment(row.updated_at).format("DD MMM YYYY | hh:mm A"),
    }));

    res.json(formatted);
  });
};

// **Fetch Single by ID**
export const getById = (req, res) => {
  const Id = parseInt(req.params.id);
  const sql = `SELECT enquirers.*, territoryenquiry.visitdate AS visitDate,
               territoryenquiry.teid, territoryenquiry.followup, territoryenquiry.status AS territoryStatus 
               FROM enquirers LEFT JOIN territoryenquiry 
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
  const partnerId = req.user?.id;

  if (!partnerId) {
    return res
      .status(401)
      .json({ message: "Unauthorized! Please login again." });
  }

  const enquiryId = parseInt(req.params.id);
  if (isNaN(enquiryId)) {
    return res.status(400).json({ message: "Invalid Enquiry ID." });
  }

  // Check if enquiry exists
  db.query(
    "SELECT * FROM enquirers WHERE enquirersid = ?",
    [enquiryId],
    (err, results) => {
      if (err) {
        console.error("Database error while checking enquiry:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Enquiry not found." });
      }

      // Update enquiry status
      db.query(
        `UPDATE enquirers 
         SET status = 'Visit Scheduled', territorystatus = 'Accepted', territorypartnerid = ? 
         WHERE enquirersid = ?`,
        [partnerId, enquiryId],
        (updateErr, updateResult) => {
          if (updateErr) {
            console.error("Error updating enquiry:", updateErr);
            return res
              .status(500)
              .json({ message: "Failed to accept enquiry", error: updateErr });
          }

          return res.status(200).json({
            message: "Enquiry accepted successfully.",
            enquiryId,
            territoryPartnerId: partnerId,
            territorystatus: "Accepted",
            status: "Visit Scheduled",
          });
        }
      );
    }
  );
};

export const rejectEnquiry = (req, res) => {
  const enquiryId = parseInt(req.params.id);

  if (isNaN(enquiryId)) {
    return res.status(400).json({ message: "Invalid Enquiry ID." });
  }

  // Check if enquiry exists
  db.query(
    "SELECT * FROM enquirers WHERE enquirersid = ?",
    [enquiryId],
    (err, results) => {
      if (err) {
        console.error("Database error while checking enquiry:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Enquiry not found." });
      }

      // Update to rejected
      db.query(
        `UPDATE enquirers 
         SET territorystatus = 'Rejected', territorypartnerid = NULL 
         WHERE enquirersid = ?`,
        [enquiryId],
        (updateErr, updateResult) => {
          if (updateErr) {
            console.error("Error updating enquiry:", updateErr);
            return res.status(500).json({
              message: "Failed to reject enquiry",
              error: updateErr,
            });
          }

          return res.status(200).json({
            message: "Enquiry rejected successfully.",
            enquiryId,
            territorystatus: "Rejected",
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

export const followUp = (req, res) => {
  const { followUpRemark, territoryId } = req.body;
  if (!followUpRemark || !territoryId) {
    return res.status(400).json({ message: "All Fields are Required!" });
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

      const updateSQL = `UPDATE territoryenquiry SET followup = ? WHERE teid = ?`;

      db.query(
        updateSQL,
        [followUpRemark, territoryId],
        (err, insertResult) => {
          if (err) {
            console.error("Error inserting visit:", err);
            return res
              .status(500)
              .json({ message: "Database error", error: err });
          }

          res.status(201).json({
            message: "Follow Up remark added successfully",
            Id: insertResult.insertId,
          });
        }
      );
    }
  );
};
