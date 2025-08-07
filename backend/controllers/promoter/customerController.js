import db from "../../config/dbconnect.js";
import moment from "moment";

// **Fetch All **
export const getAll = (req, res) => {
  const promoterCity = req.user?.city;
  if (!promoterCity) {
    return res.status(400).json({ message: "Please Log_in Again!" });
  }

  const sql = `
    SELECT 
      enquirers.*, 
      properties.frontView,
      properties.seoSlug,
      properties.commissionType,
      properties.commissionAmount,
      properties.commissionPercentage,
      territorypartner.fullname AS territoryName, 
      territorypartner.contact AS territoryContact,
      propertyfollowup.*
    FROM enquirers 
    LEFT JOIN properties ON enquirers.propertyid = properties.propertyid
    LEFT JOIN territorypartner ON enquirers.territorypartnerid = territorypartner.id
    LEFT JOIN propertyfollowup ON propertyfollowup.enquirerid = enquirers.enquirersid
    WHERE enquirers.status = 'Token' AND propertyfollowup.status = 'Token' AND properties.city = ?
    ORDER BY propertyfollowup.created_at DESC
  `;

  db.query(sql, [promoterCity], (err, result) => {
    if (err) {
      console.error("Error fetching :", err);
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
