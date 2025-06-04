import db from "../../config/dbconnect.js";
import moment from "moment";

// **Fetch All Properties**
export const getAll = (req, res) => {
  const enquirySource = req.params.source;
  if (!enquirySource) {
    return res.status(401).json({ message: "Enquiry Source Not Selected" });
  }
  let sql;

  if (enquirySource === "Onsite") {
    sql = `SELECT enquirers.*, properties.frontView 
                  FROM enquirers LEFT JOIN properties 
                  ON enquirers.propertyid = properties.propertyid 
                  WHERE properties.status = 'active' AND properties.approve = 'Approved' 
                  ORDER BY enquirers.enquirersid DESC`;
  } else if (enquirySource === "Direct") {
    sql = `SELECT enquirers.* FROM enquirers
                  WHERE enquirers.source = "Direct" 
                  ORDER BY enquirers.enquirersid DESC`;
  } else if (enquirySource === "CSV") {
    sql = `SELECT enquirers.* FROM enquirers
                  WHERE enquirers.source = "CSV File" 
                  ORDER BY enquirers.enquirersid DESC`;
  } else {
    sql = `SELECT enquirers.*, properties.frontView 
                  FROM enquirers LEFT JOIN properties 
                  ON enquirers.propertyid = properties.propertyid  
                  ORDER BY enquirers.enquirersid DESC`;
  }

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching Enquirers:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.json(result);
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

// **Add New **
// exports.add = (req, res) => {
//   const { name, contact, email, address, dob, department, position, salary, doj } = req.body;

//   if (!name || !contact || !email || !address || !dob || !department || !position || !salary || !doj) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   const sql = `INSERT INTO enquiries (name, contact, email, address, dob, department, position, salary, doj)
//                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//   db.query(sql, [name, contact, email, address, dob, department, position, salary, doj], (err, result) => {
//     if (err) {
//       console.error("Error inserting :", err);
//       return res.status(500).json({ message: "Database error", error: err });
//     }
//     res.status(201).json({ message: "Enquiry added successfully", Id: result.insertId });
//   });
// };

// **Edit **
// exports.update = (req, res) => {
//   const Id = parseInt(req.params.id);
//   const { name, contact, email, address, dob, department, position, salary, doj } = req.body;

//   if (!name || !contact || !email || !address || !dob || !department || !position || !salary || !doj) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   db.query("SELECT * FROM enquiries WHERE id = ?", [Id], (err, result) => {
//     if (err) return res.status(500).json({ message: "Database error", error: err });
//     if (result.length === 0) return res.status(404).json({ message: "Enquiry not found" });

//     const sql = `UPDATE enquiries SET name=?, contact=?, email=?, address=?, dob=?, department=?, position=?, salary=?, doj=? WHERE id=?`;

//     db.query(sql, [name, contact, email, address, dob, department, position, salary, doj, Id], (err) => {
//       if (err) {
//         console.error("Error updating :", err);
//         return res.status(500).json({ message: "Database error", error: err });
//       }
//       res.status(200).json({ message: "Enquiry updated successfully" });
//     });
//   });
// };

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
  const { visitDate, visitRemark } = req.body;

  if (!visitDate || !visitRemark) {
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
      INSERT INTO propertyfollowup (enquirerid, visitdate, remark, updated_at, created_at)
      VALUES (?, ?, ?, ?, ?)`;

      db.query(
        insertSQL,
        [Id, visitDate, visitRemark, currentdate, currentdate],
        (err, insertResult) => {
          if (err) {
            console.error("Error inserting visit:", err);
            return res
              .status(500)
              .json({ message: "Database error", error: err });
          }

          res
            .status(201)
            .json({
              message: "Visit added successfully",
              Id: insertResult.insertId,
            });
        }
      );
    }
  );
};

export const token = (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const { paymenttype, remark, dealamount } = req.body;

  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  if (!paymenttype || !remark || !dealamount) {
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
      INSERT INTO propertyfollowup (enquirerid, paymenttype, remark, dealamount, paymentimage, updated_at, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)`;

      db.query(
        insertSQL,
        [
          Id,
          paymenttype,
          remark,
          dealamount,
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

          res
            .status(201)
            .json({
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
  const { followUpRemark } = req.body;

  if (!followUpRemark) {
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
      INSERT INTO propertyfollowup (enquirerid, remark, updated_at, created_at)
      VALUES (?, ?, ?, ?)`;

      db.query(
        insertSQL,
        [Id, followUpRemark, currentdate, currentdate],
        (err, insertResult) => {
          if (err) {
            console.error("Error inserting visit:", err);
            return res
              .status(500)
              .json({ message: "Database error", error: err });
          }

          res
            .status(201)
            .json({
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
  const { cancelledRemark } = req.body;

  if (!cancelledRemark) {
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
      INSERT INTO propertyfollowup (enquirerid, remark, updated_at, created_at)
      VALUES (?, ?, ?, ?)`;

      db.query(
        insertSQL,
        [Id, cancelledRemark, currentdate, currentdate],
        (err, insertResult) => {
          if (err) {
            console.error("Error while Add Remark:", err);
            return res
              .status(500)
              .json({ message: "Database error", error: err });
          }

          res
            .status(201)
            .json({
              message: "Remark added successfully",
              Id: insertResult.insertId,
            });
        }
      );
    }
  );
};
