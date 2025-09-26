import db from "../../config/dbconnect.js";
import moment from "moment";

export const getCount = (req, res) => {
  const query = `SELECT
  (SELECT COUNT(propertyid) FROM properties WHERE partnerid = ?) AS totalProperty,
  (SELECT COUNT(ticketid) FROM tickets 
   INNER JOIN onboardingpartner ON onboardingpartner.adharno = tickets.ticketadder 
   WHERE tickets.ticketadder = ?) AS totalTicket`;

  db.query(query, [req.user.id, req.user.adharId], (err, results) => {
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

// Fetch All Properties
export const getPropertiesOld = (req, res) => {
  const userId = req.user.id;
  if (!userId) {
    return res
      .status(400)
      .json({ message: "Unauthorized, Please Login Again!" });
  }
  const sql = `SELECT properties.*, builders.company_name FROM properties 
               INNER JOIN builders ON properties.builderid = builders.builderid 
               WHERE properties.partnerid = ? 
               ORDER BY properties.propertyid DESC`;
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching properties:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    const formatted = result.map((row) => ({
      ...row,
      created_at: moment(row.created_at).format("DD MMM YYYY | hh:mm A"),
      updated_at: moment(row.updated_at).format("DD MMM YYYY | hh:mm A"),
    }));

    res.json(formatted);
  });
};

// **Get Partner Properties with Enquiry/Booking Status**
export const getProperties = (req, res) => {
  const partnerId = req.user?.id;

  if (!partnerId) {
    return res
      .status(401)
      .json({ message: "Unauthorized Access, Please Login Again!" });
  }

  const sql = `
    SELECT 
      p.*,
      builders.company_name,      
      COUNT(e.enquirersid) AS totalEnquiries,
      SUM(CASE WHEN e.status = 'Token' THEN 1 ELSE 0 END) AS bookedCount,
      SUM(CASE WHEN e.status != 'Token' THEN 1 ELSE 0 END) AS enquiryCount
    FROM properties p
    INNER JOIN builders ON p.builderid = builders.builderid
    LEFT JOIN enquirers e ON p.propertyid = e.propertyid
    WHERE p.partnerid = ?
    GROUP BY p.propertyid
    ORDER BY p.created_at DESC;
  `;

  db.query(sql, [partnerId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "No properties found" });
    }

    // Format with status
    let formatted = result.map((row) => {
      let enquiryStatus = "None";
      if (row.bookedCount > 0) {
        enquiryStatus = "Booked";
      } else if (row.enquiryCount > 0) {
        enquiryStatus = "Enquired";
      }

      return {
        ...row,
        enquiryStatus,
      };
    });

    res.status(200).json(formatted);
  });
};
