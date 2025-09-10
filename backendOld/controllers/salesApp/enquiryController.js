import db from "../../config/dbconnect.js";
import moment from "moment";
// Assign Enquiry To Territory Partners
export const assignEnquiry = async (req, res) => {
  
    
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const { territorypartnerid, territorypartnerdate,territorytimeslot } = req.body;
  console.log(territorypartnerid, territorypartnerdate,territorytimeslot);
  
  if (!territorypartnerid || !territorypartnerdate || !territorytimeslot) {
   
    return res.status(400).json({ message: "All Fields Required !!" });
  }
  const Id = parseInt(req.params.id);
  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Enquiry ID" });
  }
console.log(Id);

  db.query(
    "SELECT * FROM enquirers WHERE enquirersid = ?",
    [Id],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Enquiry not found" });
      }

      db.query(
        "UPDATE enquirers SET territorypartnerid = ?, visitdate = ?,territorytimeslot=?, updated_at = ?, created_at = ? WHERE enquirersid = ?",
        [
          territorypartnerid,
          territorypartnerdate,
          territorytimeslot,
          currentdate,
          currentdate,
          Id,
        ],
        (err, result) => {
          if (err) {
            console.error("Error assigning to territory partner :", err);
            return res
              .status(500)
              .json({ message: "Database error", error: err });
          }
          res.status(200).json({
            message: "Enquiry assigned successfully to Territory Partner",
          });
        }
      );
    }
  );
};


export const getAll = (req, res) => {
  const territoryPartnerId = req.params.id;

  if (!territoryPartnerId) {
    return res.status(400).json({ message: "Territory Partner ID is required" });
  }

  const sql = `
    SELECT enquirers.*, 
           properties.frontView, 
           properties.seoSlug, 
           properties.commissionAmount,
           territorypartner.fullname AS territoryName,
           territorypartner.contact AS territoryContact
    FROM enquirers
    LEFT JOIN properties 
      ON enquirers.propertyid = properties.propertyid
    LEFT JOIN territorypartner 
      ON territorypartner.id = enquirers.territorypartnerid
    WHERE enquirers.territorypartnerid = ?
    ORDER BY enquirers.enquirersid DESC`;

  db.query(sql, [territoryPartnerId], (err, results) => {
    if (err) {
      console.error("Database Query Error:", err);
      return res.status(500).json({ message: "Database query error", error: err });
    }

    const formatted = results.map((row) => ({
      ...row,
      created_at: moment(row.created_at).format("DD MMM YYYY | hh:mm A"),
      updated_at: moment(row.updated_at).format("DD MMM YYYY | hh:mm A"),
    }));

    res.json(formatted);
  });
};


