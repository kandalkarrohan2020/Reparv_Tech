import db from "../../config/dbconnect.js";

export const getCount = (req, res) => {
  const query =`SELECT
  (SELECT COUNT(propertyid) FROM properties WHERE guestUserId = ?) AS totalProperty`;

  db.query(query,[req.user.id], (err, results) => {
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
      `;
  
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching dashboard stats:", err);
        return res.status(500).json({ error: "Database error" });
      }
  
      return res.json(results[0]); // Since it's a single row
    });
  };
  