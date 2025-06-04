import db from "../../config/dbconnect.js";

// **Fetch All Properties**
export const getAll = (req, res) => {
  const sql = `SELECT properties.*, builders.company_name FROM properties 
               INNER JOIN builders ON properties.builderid = builders.builderid 
               ORDER BY properties.propertyid DESC`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching properties:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.json(result);
  });
};

// **Fetch Single Property by ID**
export const getById = (req, res) => {
  const Id = parseInt(req.params.id);
  if (isNaN(Id))
    return res.status(400).json({ message: "Invalid Property ID" });

  const sql = "SELECT properties.*, builders.company_name FROM properties inner join builders on builders.builderid = properties.builderid WHERE propertyid = ?";
  db.query(sql, [Id], (err, result) => {
    if (err) {
      console.error("Error fetching property:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(result[0]);
  });
};

// ** Fetch Property Information by ID **
export const fetchAdditionalInfo = (req, res) => {
  const Id = parseInt(req.params.id);
  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Property ID" });
  }

  const sql = `SELECT * FROM propertiesinfo WHERE propertyid = ? ORDER BY propertyinfoid`;

  db.query(sql, [Id], (err, result) => {
    if (err) {
      console.error("Error fetching property Details:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Property Additional Information not found" });
    }

    res.json(result); // Return only the first property
  });
};
