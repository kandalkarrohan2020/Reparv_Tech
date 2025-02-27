import db from "../../config/dbconnect.js";

// **Fetch All **
export const getAll = (req, res) => {
  const sql = "SELECT * FROM marketings ORDER BY id DESC";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching :", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.json(result);
  });
};

// **Fetch Single by ID**
export const getById = (req, res) => {
  const Id = parseInt(req.params.id);
  const sql = "SELECT * FROM marketings WHERE id = ?";

  db.query(sql, [Id], (err, result) => {
    if (err) {
      console.error("Error fetching :", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Marketing Template not found" });
    }
    res.json(result[0]);
  });
};

// **Add New **
export const add = (req, res) => {
  const { name, contact, email, address, dob, department, position, salary, doj } = req.body;

  if (!name || !contact || !email || !address || !dob || !department || !position || !salary || !doj) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = `INSERT INTO marketings (name, contact, email, address, dob, department, position, salary, doj) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [name, contact, email, address, dob, department, position, salary, doj], (err, result) => {
    if (err) {
      console.error("Error inserting :", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.status(201).json({ message: "Marketing Template added successfully", Id: result.insertId });
  });
};

// **Edit **
export const update = (req, res) => {
  const Id = parseInt(req.params.id);
  const { name, contact, email, address, dob, department, position, salary, doj } = req.body;

  if (!name || !contact || !email || !address || !dob || !department || !position || !salary || !doj) {
    return res.status(400).json({ message: "All fields are required" });
  }

  db.query("SELECT * FROM marketings WHERE id = ?", [Id], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    if (result.length === 0) return res.status(404).json({ message: "Marketing Template not found" });

    const sql = `UPDATE marketings SET name=?, contact=?, email=?, address=?, dob=?, department=?, position=?, salary=?, doj=? WHERE id=?`;

    db.query(sql, [name, contact, email, address, dob, department, position, salary, doj, Id], (err) => {
      if (err) {
        console.error("Error updating :", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(200).json({ message: "Marketing Template updated successfully" });
    });
  });
};

// **Delete **
export const del = (req, res) => {
  const Id = parseInt(req.params.id);

  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Marketing Template ID" });
  }

  db.query("SELECT * FROM marketings WHERE id = ?", [Id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Marketing Template not found" });
    }

    db.query("DELETE FROM marketings WHERE id = ?", [Id], (err) => {
      if (err) {
        console.error("Error deleting :", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(200).json({ message: "Marketing Template deleted successfully" });
    });
  });
};
