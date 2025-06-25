import db from "../../config/dbconnect.js";
import moment from "moment";


// **Fetch Single by ID**
export const getById = (req, res) => {
    const Id = req.params.id;
    const sql = "SELECT * FROM properties WHERE propertyid = ?";
    db.query(sql, [Id], (err, result) => {
      if (err) {
        console.error("Error fetching:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "property info not found" });
      }
      res.json(result[0]);
    });
  };

// **Fetch Single by ID**
export const getImages = (req, res) => {
  const Id = req.params.id;
  const sql = `SELECT * FROM properties WHERE propertyid = ?`;
  db.query(sql, [Id], (err, result) => {
    if (err) {
      console.error("Error fetching:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "property info not found" });
    }
    res.json(result);
  });
};


