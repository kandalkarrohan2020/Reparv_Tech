import db from "../../config/dbconnect.js";

export const getCount = (req, res) => {
  const query = `
    SELECT
      (
        SELECT IFNULL(SUM(pf.dealamount), 0)
        FROM propertyfollowup pf
        JOIN enquirers e ON pf.enquirerid = e.enquirersid
        WHERE pf.status = 'Token' AND e.territorypartnerid = ?
      ) AS totalDealAmount,

      (
        SELECT COUNT(e.enquirersid)
        FROM enquirers e
        WHERE e.status = 'Token' AND e.territorypartnerid = ?
      ) AS totalCustomer,

      (
        SELECT IFNULL(SUM(p.carpetArea), 0)
        FROM enquirers e
        JOIN properties p ON e.propertyid = p.propertyid
        WHERE e.status = 'Token' AND e.territorypartnerid = ?
      ) AS totalDealInSquareFeet,

      (
        SELECT IFNULL(SUM(pf.territorycommission), 0)
        FROM propertyfollowup pf
        JOIN enquirers e ON pf.enquirerid = e.enquirersid
        WHERE pf.status = 'Token' AND e.territorypartnerid = ?
      ) AS selfEarning,

      (
        SELECT COUNT(e.enquirersid)
        FROM enquirers e
        WHERE e.territorypartnerid = ?
      ) AS totalEnquiry,

      (
        SELECT COUNT(propertyid) FROM properties
      ) AS totalProperty,

      (
        SELECT COUNT(ticketid)
        FROM tickets
        WHERE ticketadder = ?
      ) AS totalTicket
  `;

  const values = [
    req.territoryUser?.id, // for totalDealAmount
    req.territoryUser?.id, // for totalCustomer
    req.territoryUser?.id, // for totalDealInSquareFeet
    req.territoryUser?.id, // for selfEarning
    req.territoryUser?.id, // for totalEnquiry
    req.territoryUser?.adharId, // for totalTicket
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
