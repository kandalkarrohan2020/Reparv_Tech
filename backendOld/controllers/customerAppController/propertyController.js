import moment from "moment";
import db from "../../config/dbconnect.js";

export const addInWishList = (req, res) => {
  try {
    const { user_id, property_id } = req.body;
    const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
    // Input validation
    if (!user_id || !property_id) {
      return res.status(400).json({ message: "Login Please !" });
    }

    // Check if already exists
    const checkSql = `SELECT * FROM user_property_wishlist WHERE user_id = ? AND property_id = ?`;
    db.query(checkSql, [user_id, property_id], (checkErr, checkResult) => {
      if (checkErr) {
        console.error("Error checking wishlist:", checkErr);
        return res
          .status(500)
          .json({ message: "Database error", error: checkErr });
      }

      if (checkResult.length > 0) {
        return res.status(409).json({ message: "Already added to wishlist!" });
      }

      // If not exists, then insert updated_at, created_at
      const insertSql = `INSERT INTO user_property_wishlist (user_id, property_id,updated_at,created_at) VALUES (?, ?,?,?)`;
      db.query(
        insertSql,
        [user_id, property_id, currentdate, currentdate],
        (insertErr, insertResult) => {
          if (insertErr) {
            console.error("Error adding to wishlist:", insertErr);
            return res
              .status(500)
              .json({ message: "Database error", error: insertErr });
          }

          res.status(201).json({ message: "Successfully Added!" });
        }
      );
    });
  } catch (error) {
    console.error("Unexpected error in addInWishList:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getUserWishlist = (req, res) => {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      return res.status(400).json({ message: "User ID is required!" });
    }

    const sql = `
      SELECT p.*
      FROM user_property_wishlist uw
      INNER JOIN properties p ON uw.property_id = p.propertyid
      WHERE uw.user_id = ?
    `;

    db.query(sql, [user_id], (err, result) => {
      if (err) {
        console.error("Error fetching wishlist:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      res.status(200).json({
        message: "Wishlist fetched successfully!",
        data: result,
      });
    });
  } catch (error) {
    console.error("Unexpected error in getUserWishlist:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
