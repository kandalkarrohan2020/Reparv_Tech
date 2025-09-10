import db from "../../config/dbconnect.js";

export const getCount = (req, res) => {
  const userId = parseInt(req.user.id);
  if (!userId) {
    console.log("Invalid User Id: " + userId);
    return res.status(400).json({ message: "Invalid User Id" });
  }
  const adharId = parseInt(req.user.adharId);
  if (!adharId) {
    console.log("Invalid Aadhaar Id: " + adharId);
    return res.status(400).json({ message: "Invalid Aadhaar Id" });
  }
  const query = `
    SELECT
      (SELECT COUNT(propertyid) FROM properties WHERE builderid = ?) AS totalProperty,
      (SELECT COUNT(ticketid) FROM tickets WHERE ticketadder = ?) AS totalTicket,
      (SELECT COUNT(e.enquirersid) 
         FROM enquirers e 
         INNER JOIN properties p ON e.propertyid = p.propertyid 
         WHERE p.builderid = ? AND e.status = 'Token') AS totalCustomer
  `;

  db.query(query, [userId, adharId, userId], (err, results) => {
    if (err) {
      console.error("Error fetching dashboard stats:", err);
      return res.status(500).json({ error: "Database error" });
    }
    return res.json(results[0]); // single row
  });
};

export const getData = (req, res) => {
  const query = `
      SELECT
        (SELECT COUNT(enquirersid) FROM enquirers) AS totalenquiry,
        (SELECT COUNT(propertyid) FROM properties) AS totalproperty,
        (SELECT COUNT(builderid) FROM builders) AS totalbuilder,
        (SELECT COUNT(salespersonsid) FROM salespersons) AS totalsalesperson,
        (SELECT COUNT(id) FROM territorypartner) AS totalterritoryperson,
        (SELECT COUNT(partnerid) FROM onboardingpartner) AS totalonboardingpartner,
        (SELECT COUNT(id) FROM projectpartner) AS totalprojectpartner,
        (SELECT COUNT(ticketid)
          FROM tickets
          INNER JOIN salespersons ON salespersons.adharno = tickets.ticketadder
        ) AS totalticket;
    `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching dashboard stats:", err);
      return res.status(500).json({ error: "Database error" });
    }

    return res.json(results[0]); // Since it's a single row
  });
};
