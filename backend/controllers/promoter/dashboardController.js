import db from "../../config/dbconnect.js";

export const getCount = (req, res) => {
  const query = `
    SELECT
      (
        SELECT IFNULL(SUM(pf.dealamount), 0)
        FROM propertyfollowup pf
        JOIN enquirers e ON pf.enquirerid = e.enquirersid
        JOIN properties p ON e.propertyid = p.propertyid
        WHERE pf.status = 'Token' AND p.projectpartnerid = ?
      ) AS totalDealAmount,

      (
        SELECT COUNT(e.enquirersid)
        FROM enquirers e
        JOIN properties p ON e.propertyid = p.propertyid
        WHERE e.status = 'Token' AND p.projectpartnerid = ?
      ) AS totalCustomer,

      (
        SELECT IFNULL(SUM(p.carpetArea), 0)
        FROM enquirers e
        JOIN properties p ON e.propertyid = p.propertyid
        WHERE e.status = 'Token' AND p.projectpartnerid = ?
      ) AS totalDealInSquareFeet,

      (
        SELECT COUNT(builderid) 
        FROM builders  
        WHERE builderadder = ?
      ) AS totalBuilder,

      (
        SELECT COUNT(propertyid) 
        FROM properties 
        WHERE projectpartnerid = ?
      ) AS totalProperty,

      (
        SELECT COUNT(ticketid) 
        FROM tickets 
        INNER JOIN projectpartner 
        ON projectpartner.adharno = tickets.ticketadder 
        WHERE tickets.ticketadder = ?
      ) AS totalTicket
  `;

  db.query(
    query,
    [
      req.user.id, // for projectpartnerid in totalDealAmount
      req.user.id, // for totalCustomer
      req.user.id, // for totalDealInSquareFeet
      req.user.adharId, // for totalBuilder
      req.user.id, // for totalProperty
      req.user.adharId, // for totalTicket
    ],
    (err, results) => {
      if (err) {
        console.error("Error fetching dashboard stats:", err);
        return res.status(500).json({ error: "Database error" });
      }

      return res.json(results[0]);
    }
  );
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
