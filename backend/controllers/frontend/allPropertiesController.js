import db from "../../config/dbconnect.js";
import moment from "moment";

// **Fetch All**
export const getAll = (req, res) => {
  const sql =
    "SELECT * FROM properties WHERE status='Active' AND approve='Approved' ORDER BY propertyid DESC";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.json(result);
  });
};

// ** Fetch All City **
export const getAllByCity = (req, res) => {
  const city = req.params.city;
  if(!city){
    return res.status(401).json({message: "City Not Selected!"});
  }
  const sql = `SELECT * FROM properties WHERE status='Active' AND approve='Approved' AND city = ? `;
  db.query(sql, [city], (err, result) => {
    if (err) {
      console.error("Error fetching:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.json(result);
  });
};


