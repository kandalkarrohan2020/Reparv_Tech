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
       SELECT IFNULL(SUM(pf.reparvcommission) / 2, 0)
       FROM propertyfollowup pf
       JOIN enquirers e ON pf.enquirerid = e.enquirersid
       JOIN properties p ON e.propertyid = p.propertyid
       WHERE pf.status = 'Token' AND p.projectpartnerid = ?
      ) AS selfEarning,

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
      req.user.id, // projectpartnerid for selfEarning
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
    WHERE p.projectpartnerid = ?
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