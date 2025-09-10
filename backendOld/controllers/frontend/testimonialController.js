import db from "../../config/dbconnect.js";
import moment from "moment";


// **Fetch All **
export const getAllActive = (req, res) => {
  const sql = "SELECT * FROM testimonials WHERE status = 'Active' ORDER BY id DESC";
  
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching :", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.json(result);
  });
};

