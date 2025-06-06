import db from "../../config/dbconnect.js";
import moment from "moment";
import bcrypt from "bcryptjs";
import sendEmail from "../../utils/nodeMailer.js";

const saltRounds = 10;

// **Fetch All**
export const getAll = (req, res) => {
  const sql = "SELECT * FROM builders WHERE builders.builderadder = ? ORDER BY builderid DESC";
  db.query(sql, [req.user.adharId], (err, result) => {
    if (err) {
      console.error("Error fetching:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.json(result);
  });
};

// **Fetch All**
export const getAllActive = (req, res) => {
  const sql = "SELECT * FROM builders WHERE status = 'Active' AND builders.builderadder = ? ORDER BY builderid DESC";
  db.query(sql, [req.user.adharId], (err, result) => {
    if (err) {
      console.error("Error fetching:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.json(result);
  });
};

// **Fetch Single by ID**
export const getById = (req, res) => {
  const builderid = parseInt(req.params.id);
  const sql = "SELECT * FROM builders WHERE builderid = ?";

  db.query(sql, [builderid], (err, result) => {
    if (err) {
      console.error("Error fetching:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Builder not found" });
    }
    res.json(result[0]);
  });
};

// **Add New Builder**
export const add = (req, res) => {
  const adharId = req.user.adharId;
  if(!adharId){
    return res.status(401).json({ message: "Unauthorized! Please Login Again." });
  }
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const { company_name, contact_person, contact, email, office_address, registration_no, dor, website, notes } = req.body;

  if (!company_name || !contact_person || !contact || !email || !office_address || !registration_no || !dor || !website || !notes) {
    return res.status(400).json({ message: "All fields are required" });
  }

  db.query("SELECT * FROM builders WHERE contact = ? OR email = ?", [contact, email], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });

    if (result.length === 0) {
      const insertSQL = `INSERT INTO builders (builderadder, company_name, contact_person, contact, email, office_address, registration_no, dor, website, notes, updated_at, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      db.query(insertSQL, [adharId, company_name, contact_person, contact, email, office_address, registration_no, dor, website, notes, currentdate, currentdate], (err, result) => {
        if (err) {
          console.error("Error inserting:", err);
          return res.status(500).json({ message: "Database error", error: err });
        }
        res.status(201).json({ message: "Builder added successfully", Id: result.insertId });
      });
    } else {
      return res.status(409).json({ message: "Builder already exists!" });
    }
  });
};

// **Edit Builder**
export const update = (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const Id = req.body.builderid;
  const { company_name, contact_person, contact, email, office_address, registration_no, dor, website, notes } = req.body;

  if (!company_name || !contact_person || !contact || !email || !office_address || !registration_no || !dor || !website || !notes) {
    return res.status(400).json({ message: "All fields are required" });
  }

  db.query("SELECT * FROM builders WHERE builderid = ?", [Id], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    if (result.length === 0) return res.status(404).json({ message: "Builder not found" });

    const sql = `UPDATE builders SET company_name=?, contact_person=?, contact=?, email=?, office_address=?, registration_no=?, dor=?, website=?, notes=?, updated_at=? WHERE builderid=?`;

    db.query(sql, [company_name, contact_person, contact, email, office_address, registration_no, dor, website, notes, currentdate, Id], (err) => {
      if (err) {
        console.error("Error updating:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(200).json({ message: "Builder updated successfully" });
    });
  });
};

// **Delete**
export const deleteBuilder = (req, res) => {
  const Id = parseInt(req.params.id);

  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Builder ID" });
  }

  db.query("SELECT * FROM builders WHERE builderid = ?", [Id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Builder not found" });
    }

    db.query("DELETE FROM builders WHERE builderid = ?", [Id], (err) => {
      if (err) {
        console.error("Error deleting:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(200).json({ message: "Builder deleted successfully" });
    });
  });
};

// **Change Status**
export const status = (req, res) => {
  const Id = parseInt(req.params.id);

  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Builder ID" });
  }

  db.query("SELECT * FROM builders WHERE builderid = ?", [Id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Builder not found" });
    }

    const newStatus = result[0].status === "Active" ? "Inactive" : "Active";

    db.query("UPDATE builders SET status = ? WHERE builderid = ?", [newStatus, Id], (err) => {
      if (err) {
        console.error("Error updating status:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(200).json({ message: `Builder status changed to ${newStatus}` });
    });
  });
};

// ** Assign Login to Builder **
export const assignLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const Id = parseInt(req.params.id);

    if (isNaN(Id)) {
      return res.status(400).json({ message: "Invalid Builder ID" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds); 

    db.query(
      "SELECT * FROM builders WHERE builderid = ?",
      [Id],
      (err, result) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ message: "Database error", error: err });
        }
        if (result.length === 0) {
          return res.status(404).json({ message: "Builder not found" });
        }

        let loginstatus = result[0].loginstatus === "Active" ? "Inactive" : "Active";
        const email = result[0].email; 

        db.query(
          "UPDATE builders SET loginstatus = ?, username = ?, password = ? WHERE builderid = ?",
          [loginstatus, username, hashedPassword, Id],
          (err, updateResult) => {
            if (err) {
              console.error("Error updating record:", err);
              return res.status(500).json({ message: "Database error", error: err });
            }

            // Send email after successful update
            sendEmail(email, username, password, "Builder")
              .then(() => {
                res.status(200).json({ message: "Builder login assigned successfully and email sent." });
              })
              .catch((emailError) => {
                console.error("Error sending email:", emailError);
                res.status(500).json({ message: "Login updated but email failed to send." });
              });
          }
        );
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ message: "Unexpected server error", error });
  }
};