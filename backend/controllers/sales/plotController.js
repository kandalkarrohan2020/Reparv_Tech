import db from "../../config/dbconnect.js";
import moment from "moment";


// **Fetch All**
export const getAll = (req, res) => {
    const sql = "SELECT * FROM properties WHERE propertytypeid='Plot' AND status='active' AND approve='Approved' ORDER BY propertyid DESC";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.json(result);
  });
};

// ** Fetch All City **
export const getAllCity = (req, res) => {
  const sql = "select distinct city from properties where status='active' and approve='Approved' and propertytypeid='Plot' ";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.json(result);
  });
};

// ** Fetch All City **
export const getAllLocation = (req, res) => {
    const sql = "select distinct location from properties where status='active' and approve='Approved' and propertytypeid='Plot' ";
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error fetching:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.json(result);
    });
  };
  export const addLike = async (req, res) => {
    const propertyId = req.params.id;
  
    if(!propertyId){
     return res.status(401).json({message: "Invalid Property Id"});
    }
  
    const sql = `UPDATE properties SET likes = likes+1 WHERE propertyid = ?`;
  
    db.query(sql, [propertyId], (err, result) => {
     if (err) {
       console.error("Error fetching:", err);
       return res.status(500).json({ message: "Database error", error: err });
     }
     res.json(result);
    });
  }
  

