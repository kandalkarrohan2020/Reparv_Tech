import db from "../../config/dbconnect.js";

// **Fetch All **
export const getAll = (req, res) => {
  const sql = "SELECT * FROM departments ORDER BY department";
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
  const sql = "SELECT * FROM departments WHERE departmentid = ?";

  db.query(sql, [Id], (err, result) => {
    if (err) {
      console.error("Error fetching :", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.json(result[0]);
  });
};

// Add Or Update
export const add = (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const Id = req.body.departmentid ? parseInt(req.body.departmentid) : null;
  const  department  = req.body.department;

  if (!department) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (Id) {
    // **Update existing department**
    db.query("SELECT * FROM departments WHERE departmentid = ?", [Id], (err, result) => {
      if (err) return res.status(500).json({ message: "Database error", error: err });
      if (result.length === 0) return res.status(404).json({ message: "Department not found" });

      const updateSQL = `UPDATE departments SET department=?, updated_at=? WHERE departmentid=?`;

      db.query(updateSQL, [department, currentdate, Id], (err) => {
        if (err) {
          console.error("Error updating :", err);
          return res.status(500).json({ message: "Database error", error: err });
        }
        res.status(200).json({ message: "Department updated successfully" });
      });
    });
  } else {
    db.query("SELECT * FROM departments WHERE department = ?", [department], (err, result) => {
      if (err) return res.status(500).json({ message: "Database error", error: err });
        if (result.length === 0) {
    
          // **Add new department**
          const insertSQL = `INSERT INTO departments (department, updated_at, created_at) VALUES (?, ?, ?)`;

          db.query(insertSQL, [department, currentdate, currentdate], (err, result) => {
            if (err) {
              console.error("Error inserting :", err);
              return res.status(500).json({ message: "Database error", error: err });
            }
            res.status(201).json({ message: "Department added successfully", Id: result.insertId });
          });

        }else{
          return res.status(201).json({ message: "Department already Exit!!" });
        }
    });
  }
};

// **Delete **
export const del = (req, res) => {
  const Id = parseInt(req.params.id);

  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Department ID" });
  }

  db.query("SELECT * FROM departments WHERE departmentid = ?", [Id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Department not found" });
    }

    db.query("DELETE FROM departments WHERE departmentid = ?", [Id], (err) => {
      if (err) {
        console.error("Error deleting :", err);
        return res.status(500).json({ message: "Database error1", error: err });
      }
      res.status(200).json({ message: "Department deleted successfully" });
    });
  });
};

//**Change status */
export const status = (req, res) => {
  const Id = parseInt(req.params.id);
  
  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Department ID" });
  }

  db.query("SELECT * FROM departments WHERE departmentid = ?", [Id], (err, result) => {
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
    db.query("UPDATE departments SET status = ? WHERE departmentid = ?", [status, Id], (err,result) => {
      if (err) {
        console.error("Error deleting :", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(200).json({ message: "Department status change successfully" });
    });
  });
};
