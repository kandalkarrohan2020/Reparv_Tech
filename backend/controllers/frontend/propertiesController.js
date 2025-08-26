import db from "../../config/dbconnect.js";
import moment from "moment";

// **Fetch All**
export const getAll = (req, res) => {
  const { city, propertyCategory } = req.query;

  let sql = `SELECT * FROM properties WHERE status='Active' AND approve='Approved'`;
  const params = [];

  if (propertyCategory !== "properties") {
    sql += ` AND propertyCategory = ?`;
    params.push(propertyCategory);
  }

  if (city && city.trim() !== "") {
    sql += ` AND city = ?`;
    params.push(city);
  }

  sql += ` ORDER BY propertyid DESC`;

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error("Error fetching:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.json(result);
  });
};

// Get All Properties By Slug like 1-BHK-NewFlat-in-Nagpur
export const getAllBySlug = (req, res) => {
  const { city, propertyCategory, propertyType } = req.query;

  let sql = `SELECT * FROM properties WHERE status='Active' AND approve='Approved'`;
  const params = [];

  if (propertyCategory && propertyCategory !== "properties") {
    sql += ` AND propertyCategory = ?`;
    params.push(propertyCategory);
  }

  if (propertyType && propertyType.trim() !== "") {
    sql += ` AND propertyType = ?`;
    params.push(propertyType);
  }

  if (city && city.trim() !== "") {
    sql += ` AND city = ?`;
    params.push(city);
  }

  sql += ` ORDER BY propertyid DESC`;

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error("Error fetching:", err);
      return res
        .status(500)
        .json({ message: "Database error", error: err });
    }
    res.json(result);
  });
};

// ** Fetch All Unique City In The Listed Property **
export const getAllCity = (req, res) => {
  const sql = `
    SELECT DISTINCT city 
    FROM properties 
    WHERE status = 'Active' AND approve = 'Approved' 
    ORDER BY city
  `;
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    // Return array of strings instead of array of objects
    res.json(result.map((row) => row.city));
  });
};

export const getAllLocation = (req, res) => {
  const sql = `
      SELECT DISTINCT location 
      FROM properties 
      WHERE status='Active' AND approve='Approved'
    `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.status(200).json(result);
  });
};

export const getLocationsByCityAndCategory = (req, res) => {
  const { propertyCategory, city } = req.query;

  if (!propertyCategory || !city) {
    return res
      .status(400)
      .json({ message: "propertyCategory and city are required." });
  }

  const sql = `SELECT DISTINCT location FROM properties 
                 WHERE city = ? AND propertyCategory = ? 
                 AND status='Active' AND approve='Approved'`;

  db.query(sql, [city.trim(), propertyCategory.trim()], (err, result) => {
    if (err) {
      console.error("Error fetching locations:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    const locations = result.map((row) => row.location);
    res.status(200).json(locations);
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
      return res
        .status(404)
        .json({ message: "Property Additional Information not found" });
    }

    // Group by wing
    const grouped = result.reduce((acc, row) => {
      const wingName = row.wing || "Unknown";
      let wingGroup = acc.find((w) => w.wing === wingName);
      if (!wingGroup) {
        wingGroup = { wing: wingName, rows: [] };
        acc.push(wingGroup);
      }
      wingGroup.rows.push(row);
      return acc;
    }, []);

    res.json(grouped);
  });
};

// ** Fetch Property Information by ID **
export const fetchFlatById = (req, res) => {
  const Id = parseInt(req.params.id);
  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Property ID" });
  }

  const sql = `SELECT * FROM propertiesinfo WHERE propertyinfoid = ? ORDER BY propertyinfoid`;

  db.query(sql, [Id], (err, result) => {
    if (err) {
      console.error("Error fetching property Details:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "Property Additional Information not found" });
    }

    const data = result[0];

    // Now set the updated object in state
    res.json(data);
  });
};
