import db from "../../config/dbconnect.js";

export const getCount = (req, res) => {
    const query =`SELECT
    (SELECT COUNT(enquirersid) FROM enquirers WHERE salespersonid = ?) AS totalEnquiry,
    (SELECT COUNT(propertyid) FROM properties) AS totalProperty,
    (SELECT COUNT(ticketid) 
     FROM tickets 
     INNER JOIN salespersons ON salespersons.adharno = tickets.ticketadder 
     WHERE tickets.ticketadder = ?) AS totalTicket`;
  
    db.query(query,[req.user.id, req.user.adharId], (err, results) => {
      if (err) {
        console.error("Error fetching dashboard stats:", err);
        return res.status(500).json({ error: "Database error" });
      }
  
      return res.json(results[0]);
    });
  };
  

  
export const getData = (req, res) => {
  const query =`SELECT
    (SELECT COUNT(enquirersid) FROM enquirers WHERE salespersonid = ?) AS totalEnquiry,
    (SELECT COUNT(propertyid) FROM properties) AS totalProperty,
    (SELECT COUNT(ticketid) 
     FROM tickets 
     INNER JOIN salespersons ON salespersons.adharno = tickets.ticketadder 
     WHERE tickets.ticketadder = ?) AS totalTicket`;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching dashboard stats:", err);
      return res.status(500).json({ error: "Database error" });
    }

    return res.json(results[0]); // Since it's a single row
  });
};

