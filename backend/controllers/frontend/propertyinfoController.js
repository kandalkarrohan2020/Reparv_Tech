import db from "../../config/dbconnect.js";
import moment from "moment";


// **Fetch Single by ID**
export const getById = (req, res) => {
    const id = parseInt(req.params.id);
    //const sql = "SELECT * FROM propertiesinfo inner join properties on properties.propertyid = propertiesinfo.propertyid inner join propertiesimages  on propertiesimages.propertyid = propertiesinfo.propertyid WHERE propertiesinfo.propertyid = ?";
    const sql = "SELECT * FROM properties LEFT JOIN propertiesinfo ON properties.propertyid = propertiesinfo.propertyid WHERE properties.propertyid = ?";
    db.query(sql, [id], (err, result) => {
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
  const id = parseInt(req.params.id);
  const sql = "SELECT propertiesimages.* FROM propertiesimages LEFT JOIN properties ON properties.propertyid = propertiesimages.propertyid WHERE propertiesimages.propertyid = ?";
  db.query(sql, [id], (err, result) => {
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


