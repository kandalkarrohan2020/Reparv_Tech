import db from "../../config/dbconnect.js";
import moment from "moment";

// Fetch All Enquiries
export const getAll = (req, res) => {
  const enquirySource = req.params.source;
  if (!enquirySource) {
    return res.status(401).json({ message: "Enquiry Source Not Selected" });
  }

  let sql;

  if (enquirySource === "Onsite") {
    sql = `SELECT enquirers.*, properties.frontView, properties.seoSlug, properties.commissionAmount,
                  territorypartner.fullname AS territoryName, 
                  territorypartner.contact AS territoryContact
           FROM enquirers 
           LEFT JOIN properties ON enquirers.propertyid = properties.propertyid
           LEFT JOIN territorypartner ON territorypartner.id = enquirers.territorypartnerid
           WHERE properties.status = 'active' AND properties.approve = 'Approved' AND enquirers.status != 'Token'
           ORDER BY enquirers.enquirersid DESC`;
  } else if (enquirySource === "Direct") {
    sql = `SELECT enquirers.*, properties.frontView, properties.seoSlug, properties.commissionAmount,
                  territorypartner.fullname AS territoryName, 
                  territorypartner.contact AS territoryContact
           FROM enquirers 
           LEFT JOIN properties ON enquirers.propertyid = properties.propertyid
           LEFT JOIN territorypartner ON territorypartner.id = enquirers.territorypartnerid
           WHERE enquirers.source = "Direct" AND enquirers.status != 'Token'
           ORDER BY enquirers.enquirersid DESC`;
  } else if (enquirySource === "CSV") {
    sql = `SELECT enquirers.*, properties.frontView, properties.seoSlug, properties.commissionAmount,
                  territorypartner.fullname AS territoryName, 
                  territorypartner.contact AS territoryContact
           FROM enquirers 
           LEFT JOIN properties ON enquirers.propertyid = properties.propertyid
           LEFT JOIN territorypartner ON territorypartner.id = enquirers.territorypartnerid
           WHERE enquirers.source = "CSV File" AND enquirers.status != 'Token' 
           ORDER BY enquirers.enquirersid DESC`;
  } else {
    sql = `SELECT enquirers.*, properties.frontView, properties.seoSlug, properties.commissionAmount,
                  territorypartner.fullname AS territoryName, 
                  territorypartner.contact AS territoryContact
           FROM enquirers 
           LEFT JOIN properties ON enquirers.propertyid = properties.propertyid  
           LEFT JOIN territorypartner ON territorypartner.id = enquirers.territorypartnerid
           WHERE enquirers.status != 'Token'
           ORDER BY enquirers.enquirersid DESC`;
  }

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching Enquirers:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    const formatted = result.map((row) => ({
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
  const sql = `SELECT enquirers.*,
                territorypartner.fullname AS territoryName, 
                territorypartner.contact AS territoryContact
                FROM enquirers 
                LEFT JOIN territorypartner ON territorypartner.id = enquirers.territorypartnerid
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

export const getPropertyList = (req, res) => {
  const enquiryId = req.params.id;

  // Step 1: Get Enquiry details
  const enquirySql = "SELECT * FROM enquirers WHERE enquirersid = ?";
  db.query(enquirySql, [enquiryId], (err, enquiryResults) => {
    if (err) {
      console.error("Error fetching enquiry:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (enquiryResults.length === 0) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    const enquiry = enquiryResults[0];

    const { minbudget, maxbudget, category, state, city } = enquiry;

    // Step 2: Get matching properties using filters from enquiry
    const propertySql = `
      SELECT * FROM properties
      WHERE totalOfferPrice BETWEEN ? AND ?
        AND propertyCategory = ?
        AND state = ?
        AND city = ?
      ORDER BY created_at DESC
    `;

    db.query(
      propertySql,
      [minbudget, maxbudget, category, state, city],
      (err, propertyResults) => {
        if (err) {
          console.error("Error fetching properties:", err);
          return res
            .status(500)
            .json({ message: "Database error", error: err });
        }

        res.json(propertyResults);
      }
    );
  });
};

// **Fetch All **
export const getRemarkList = (req, res) => {
  const enquiryId = req.params.id;
  const sql =
    "SELECT * FROM propertyfollowup WHERE enquirerid = ? ORDER BY propertyfollowup.created_at";
  db.query(sql, [enquiryId], (err, result) => {
    if (err) {
      console.error("Error fetching :", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.json(result);
  });
};

/* Change status */
export const status = (req, res) => {
  const { enquiryStatus } = req.body;
  if (enquiryStatus === "") {
    return res.status(400).json({ message: "Please Select Status!" });
  }

  const Id = parseInt(req.params.id);
  console.log(Id);
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

export const assignEnquiry = async (req, res) => {
  const { salespersonid, salesperson, salespersoncontact } = req.body;
  if (!salespersonid || !salesperson || !salespersoncontact) {
    return res.status(400).json({ message: "All Fields Required" });
  }
  const Id = parseInt(req.params.id);
  let salesInfo = salesperson + " - " + salespersoncontact;
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
        "UPDATE enquirers SET salespersonid = ?, assign = ? WHERE enquirersid = ?",
        [salespersonid, salesInfo, Id],
        (err, result) => {
          if (err) {
            console.error("Error assigning sales person :", err);
            return res
              .status(500)
              .json({ message: "Database error", error: err });
          }
          res.status(200).json({
            message: "Enquiry assigned successfully to " + salesperson,
          });
        }
      );
    }
  );
};

export const updateEnquirerProperty = async (req, res) => {
  const enquiryId = parseInt(req.params.id);
  if (isNaN(enquiryId)) {
    return res.status(400).json({ message: "Invalid Enquiry ID" });
  }

  const { propertyId } = req.body;
  if (!propertyId) {
    return res.status(400).json({ message: "Property Id Required" });
  }

  db.query(
    "SELECT * FROM enquirers WHERE enquirersid = ?",
    [enquiryId],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Enquiry not found" });
      }

      db.query(
        "UPDATE enquirers SET propertyid = ? WHERE enquirersid = ?",
        [propertyId, enquiryId],
        (err, result) => {
          if (err) {
            console.error("Error Update Property Enquiry :", err);
            return res
              .status(500)
              .json({ message: "Database error", error: err });
          }
          res.status(200).json({
            message: "Enquirer Property Updated Successfully",
          });
        }
      );
    }
  );
};

// **Delete **
export const del = (req, res) => {
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

      db.query("DELETE FROM enquirers WHERE enquirersid = ?", [Id], (err) => {
        if (err) {
          console.error("Error deleting :", err);
          return res
            .status(500)
            .json({ message: "Database error", error: err });
        }
        res.status(200).json({ message: "Enquiry deleted successfully" });
      });
    }
  );
};

/* Visit Scheduled */

export const visitScheduled = (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const { visitDate, visitRemark, enquiryStatus } = req.body;

  if (!visitDate || !visitRemark || !enquiryStatus) {
    return res
      .status(400)
      .json({ message: "Please add visit date and remark!" });
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
        return res.status(404).json({ message: "Enquirer not found" });
      }

      const insertSQL = `
      INSERT INTO propertyfollowup (enquirerid, visitdate, remark, status, updated_at, created_at)
      VALUES (?, ?, ?, ?, ?, ?)`;

      db.query(
        insertSQL,
        [Id, visitDate, visitRemark, enquiryStatus, currentdate, currentdate],
        (err, insertResult) => {
          if (err) {
            console.error("Error inserting visit:", err);
            return res
              .status(500)
              .json({ message: "Database error", error: err });
          }

          res.status(201).json({
            message: "Visit added successfully",
            Id: insertResult.insertId,
          });
        }
      );
    }
  );
};

export const tokeOld = (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const { paymenttype, tokenamount, remark, dealamount, enquiryStatus } =
    req.body;

  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  if (
    !paymenttype ||
    !tokenamount ||
    !remark ||
    !dealamount ||
    !enquiryStatus
  ) {
    return res
      .status(400)
      .json({ message: "Please add visit date and remark!" });
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
        return res.status(404).json({ message: "Enquirer not found" });
      }

      // First: Insert into propertyfollowup
      const insertFollowupSQL = `
      INSERT INTO propertyfollowup 
        (enquirerid, paymenttype, tokenamount, remark, dealamount, status, paymentimage, updated_at, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      db.query(
        insertFollowupSQL,
        [
          Id,
          paymenttype,
          tokenamount,
          remark,
          dealamount,
          enquiryStatus,
          imagePath,
          currentdate,
          currentdate,
        ],
        (err, insertResult) => {
          if (err) {
            console.error("Error inserting followup:", err);
            return res
              .status(500)
              .json({ message: "Database error", error: err });
          }

          // Second: Automatically insert into customerPayment
          const insertPaymentSQL = `
          INSERT INTO customerPayment 
            (enquirerId, paymentType, paymentAmount, paymentImage, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?)`;

          db.query(
            insertPaymentSQL,
            [Id, paymenttype, tokenamount, imagePath, currentdate, currentdate],
            (payErr, payResult) => {
              if (payErr) {
                console.error("Error inserting customer payment:", payErr);
                return res.status(500).json({
                  message:
                    "Token added, but failed to insert customer payment.",
                  error: payErr,
                });
              }

              return res.status(201).json({
                message: "Token and Payment added successfully",
                followupId: insertResult.insertId,
                paymentId: payResult.insertId,
              });
            }
          );
        }
      );
    }
  );
};

export const token = (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const { paymenttype, tokenamount, remark, dealamount, enquiryStatus } =
    req.body;

  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  if (
    !paymenttype ||
    !tokenamount ||
    !remark ||
    !dealamount ||
    !enquiryStatus
  ) {
    return res
      .status(400)
      .json({ message: "Please add visit date and remark!" });
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
        return res.status(404).json({ message: "Enquirer not found" });
      }

      const insertSQL = `
      INSERT INTO propertyfollowup (enquirerid, paymenttype, tokenamount, remark, dealamount, status, paymentimage, updated_at, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      db.query(
        insertSQL,
        [
          Id,
          paymenttype,
          tokenamount,
          remark,
          dealamount,
          enquiryStatus,
          imagePath,
          currentdate,
          currentdate,
        ],
        (err, insertResult) => {
          if (err) {
            console.error("Error inserting visit:", err);
            return res
              .status(500)
              .json({ message: "Database error", error: err });
          }

          res.status(201).json({
            message: "Token added successfully",
            Id: insertResult.insertId,
          });
        }
      );
    }
  );
};

export const followUp = (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const { followUpRemark, enquiryStatus } = req.body;

  if (!followUpRemark || !enquiryStatus) {
    return res.status(400).json({ message: "Please add remark!" });
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

      const insertSQL = `
      INSERT INTO propertyfollowup (enquirerid, remark, status, updated_at, created_at)
      VALUES (?, ?, ?, ?, ?)`;

      db.query(
        insertSQL,
        [Id, followUpRemark, enquiryStatus, currentdate, currentdate],
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

export const cancelled = (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const { cancelledRemark, enquiryStatus } = req.body;

  if (!cancelledRemark || !enquiryStatus) {
    return res.status(400).json({ message: "Please add remark!" });
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

      const insertSQL = `
      INSERT INTO propertyfollowup (enquirerid, remark, status, updated_at, created_at)
      VALUES (?, ?, ?, ?, ?)`;

      db.query(
        insertSQL,
        [Id, cancelledRemark, enquiryStatus, currentdate, currentdate],
        (err, insertResult) => {
          if (err) {
            console.error("Error while Add Remark:", err);
            return res
              .status(500)
              .json({ message: "Database error", error: err });
          }

          res.status(201).json({
            message: "Remark added successfully",
            Id: insertResult.insertId,
          });
        }
      );
    }
  );
};
