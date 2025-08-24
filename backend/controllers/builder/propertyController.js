import db from "../../config/dbconnect.js";
import moment from "moment";

// **Fetch All Properties**
export const getAll = (req, res) => {
  const userId = parseInt(req.user.id);
  if (!userId) {
    console.log("Invalid User Id: " + userId);
    return res.status(400).json({ message: "Invalid User Id" });
  }

  const sql = `SELECT properties.*, builders.company_name FROM properties 
               INNER JOIN builders ON properties.builderid = builders.builderid WHERE properties.builderid = ? 
               ORDER BY properties.propertyid DESC`;
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching properties:", err);
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

