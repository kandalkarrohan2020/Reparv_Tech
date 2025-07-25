import db from "../../config/dbconnect.js";

export const getCount = (req, res) => {
  const query = `
      SELECT
        (SELECT IFNULL(SUM(pf.dealamount), 0)
         FROM propertyfollowup pf
         JOIN enquirers e ON pf.enquirerid = e.enquirersid
         WHERE pf.status = 'Token'
        ) AS totalDealAmount,

        (SELECT COUNT(enquirersid) FROM enquirers WHERE status = 'Token') AS totalCustomer,
        
        (SELECT IFNULL(SUM(pf.totalcommission), 0)
         FROM propertyfollowup pf
         WHERE pf.status = 'Token'
        ) AS totalCommission,

        (SELECT IFNULL(SUM(p.carpetArea), 0)
         FROM enquirers e
         JOIN properties p ON e.propertyid = p.propertyid
         WHERE e.status = 'Token'
        ) AS totalDealInSquareFeet,
        
        (SELECT IFNULL(SUM(pf.reparvcommission), 0)
         FROM propertyfollowup pf
         WHERE pf.status = 'Token'
        ) AS totalReparvCommission,

        (SELECT IFNULL(SUM(pf.salescommission), 0)
         FROM propertyfollowup pf
         WHERE pf.status = 'Token'
        ) AS totalSalesCommission,

        (SELECT IFNULL(SUM(pf.territorycommission), 0)
         FROM propertyfollowup pf
         WHERE pf.status = 'Token'
        ) AS totalTerritoryCommission,
        
        (SELECT IFNULL(SUM(pf.tds), 0)
         FROM propertyfollowup pf
         WHERE pf.status = 'Token'
        ) AS totalTDS,

        (SELECT COUNT(enquirersid) FROM enquirers) AS totalEnquiry,
        (SELECT COUNT(propertyid) FROM properties) AS totalProperty,
        (SELECT COUNT(builderid) FROM builders) AS totalBuilder,
        (SELECT COUNT(id) FROM employees) AS totalEmployee,
        (SELECT COUNT(salespersonsid) FROM salespersons WHERE status = 'Active' AND paymentstatus = 'Success') AS totalSalesPerson,
        (SELECT COUNT(id) FROM territorypartner WHERE status = 'Active' AND paymentstatus = 'Success') AS totalTerritoryPartner,
        (SELECT COUNT(partnerid) FROM onboardingpartner WHERE status = 'Active' AND paymentstatus = 'Success') AS totalOnboardingPartner,
        (SELECT COUNT(id) FROM projectpartner WHERE status = 'Active' AND paymentstatus = 'Success') AS totalProjectPartner,
        (SELECT COUNT(id) FROM guestUsers WHERE status = 'Active') AS totalGuestUser,
        (SELECT COUNT(ticketid) FROM tickets) AS totalTicket,
        (SELECT COUNT(id) FROM blogs) AS totalBlog
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching dashboard count:", err);
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
