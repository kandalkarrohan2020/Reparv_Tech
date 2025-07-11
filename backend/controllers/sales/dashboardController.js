import db from "../../config/dbconnect.js";

export const getCount = (req, res) => {
  const query = `
    SELECT
      (
        SELECT IFNULL(SUM(pf.dealamount), 0)
        FROM propertyfollowup pf
        JOIN enquirers e ON pf.enquirerid = e.enquirersid
        WHERE pf.status = 'Token' AND e.salespersonid = ?
      ) AS totalDealAmount,

      (
        SELECT COUNT(e.enquirersid)
        FROM enquirers e
        WHERE e.status = 'Token' AND e.salespersonid = ?
      ) AS totalCustomer,

      (
        SELECT IFNULL(SUM(p.carpetArea), 0)
        FROM enquirers e
        JOIN properties p ON e.propertyid = p.propertyid
        WHERE e.status = 'Token' AND e.salespersonid = ?
      ) AS totalDealInSquareFeet,

      (
        SELECT IFNULL(SUM(pf.salescommission), 0)
        FROM propertyfollowup pf
        JOIN enquirers e ON pf.enquirerid = e.enquirersid
        WHERE pf.status = 'Token' AND e.salespersonid = ?
      ) AS selfEarning,

      (
        SELECT COUNT(e.enquirersid)
        FROM enquirers e
        WHERE e.salespersonid = ?
      ) AS totalEnquiry,

      (
        SELECT COUNT(propertyid)
        FROM properties
      ) AS totalProperty,

      (
        SELECT COUNT(ticketid)
        FROM tickets
        WHERE ticketadder = ?
      ) AS totalTicket
  `;

  const values = [
    req.user.id, // totalDealAmount
    req.user.id, // totalCustomer
    req.user.id, // totalDealInSquareFeet
    req.user.id, // selfEarning
    req.user.id, // totalEnquiry
    req.user.adharId, // totalTicket
  ];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Error fetching dashboard stats:", err);
      return res.status(500).json({ error: "Database error" });
    }

    return res.json(results[0]);
  });
};

export const getData = (req, res) => {
  const query = `SELECT
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
