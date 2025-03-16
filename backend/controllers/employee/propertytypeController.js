import db from "../../config/dbconnect.js";
import moment from "moment";


// **Fetch All **
export const getAll = (req, res) => {
  const sql = "SELECT * FROM propertytypes ORDER BY propertytype";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching :", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.json(result);
  });
};

// **Fetch All **
export const getAllActive = (req, res) => {
  const sql = "SELECT * FROM propertytypes WHERE status = 'Active' ORDER BY propertytype";
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
  const sql = "SELECT * FROM propertytypes WHERE propertytypeid = ?";

  db.query(sql, [Id], (err, result) => {
    if (err) {
      console.error("Error fetching :", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(result[0]);
  });
};

//Add or update
// exports.add = (req, res) => {
//     const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
//     const Id = req.body.id ? parseInt(req.body.id) : null;
//     const { name, uid, contact, email, address, dob, department, position, salary, doj } = req.body;
  
//     if (!name || !uid || !contact || !email || !address || !dob || !department || !position || !salary || !doj) {
//       return res.status(400).json({ message: "All fields are required" });
//     }
  
//     if (Id) {
//       // **Update existing employee**
//       db.query("SELECT * FROM employees WHERE id = ?", [Id], (err, result) => {
//         if (err) return res.status(500).json({ message: "Database error", error: err });
//         if (result.length === 0) return res.status(404).json({ message: "Employee not found" });
  
//         const updateSQL = `UPDATE employees SET name=?, uid=?, contact=?, email=?, address=?, dob=?, departmentid=?, roleid=?, salary=?, doj=?, updated_at=? WHERE id=?`;
  
//         db.query(updateSQL, [name, uid, contact, email, address, dob, department, position, salary, doj, currentdate, Id], (err) => {
//           if (err) {
//             console.error("Error updating :", err);
//             return res.status(500).json({ message: "Database error", error: err });
//           }
//           res.status(200).json({ message: "Employee updated successfully" });
//         });
//       });
//     } else {
//       db.query("SELECT * FROM propertytypes WHERE uid = ? OR contact = ? OR email = ?", [uid, contact, email], (err, result) => {
//         if (err) return res.status(500).json({ message: "Database error", error: err });
          
//           if (result.length === 0) {
      
//             // **Add new employee**
//             const insertSQL = `INSERT INTO employees (name, uid, contact, email, address, dob, departmentid, roleid, salary, doj, updated_at, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
//             db.query(insertSQL, [name, uid, contact, email, address, dob, department, position, salary, doj, currentdate, currentdate], (err, result) => {
//               if (err) {
//                 console.error("Error inserting :", err);
//                 return res.status(500).json({ message: "Database error", error: err });
//               }
//               res.status(201).json({ message: "Employee added successfully", Id: result.insertId });
//             });
  
//           }else{
//             return res.status(202).json({ message: "Employee already Exit!!" });
//           }
//       });
//     }
//   };

// **Delete **
export const del = (req, res) => {
  const Id = parseInt(req.params.id);

  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Propertytype ID" });
  }

  db.query("SELECT * FROM propertytypes WHERE propertytypeid = ?", [Id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Propertytype not found" });
    }

    db.query("DELETE FROM propertytypes WHERE propertytypeid = ?", [Id], (err) => {
      if (err) {
        console.error("Error deleting :", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(200).json({ message: "Propertytype deleted successfully" });
    });
  });
};
