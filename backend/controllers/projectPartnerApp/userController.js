import db from "../../config/dbconnect.js";
import moment from "moment";

export const getAll = async (req, res) => {
  try {
    const sql = "SELECT * FROM projectpartner";
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error fetching:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      res.json(result);
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
