import db from "../../config/dbconnect.js";
import moment from "moment";

export const getAll = (req, res) => {
  const promoterCity = req.user?.city;
  if (!promoterCity) {
    return res.status(400).json({ message: "Please Log_in Again!" });
  }

  const enquirySource = req.params.source;
  if (!enquirySource) {
    return res.status(401).json({ message: "Enquiry Source Not Selected" });
  }

  let sql;

  if (enquirySource === "Onsite") {
    sql = `SELECT enquirers.*, properties.frontView, properties.seoSlug, properties.commissionAmount,
                  territorypartner.fullname AS territoryName, 
                  territorypartner.contact AS territoryContact
           FROM enquirers 
           LEFT JOIN properties ON enquirers.propertyid = properties.propertyid
           LEFT JOIN territorypartner ON territorypartner.id = enquirers.territorypartnerid
           WHERE properties.status = 'active' AND properties.approve = 'Approved'
           AND enquirers.status != 'Token' AND enquirers.city = ?
           ORDER BY enquirers.enquirersid DESC`;
  } else if (enquirySource === "Direct") {
    sql = `SELECT enquirers.*, properties.frontView, properties.seoSlug, properties.commissionAmount,
                  territorypartner.fullname AS territoryName, 
                  territorypartner.contact AS territoryContact
           FROM enquirers 
           LEFT JOIN properties ON enquirers.propertyid = properties.propertyid
           LEFT JOIN territorypartner ON territorypartner.id = enquirers.territorypartnerid
           WHERE enquirers.source = "Direct" AND enquirers.status != 'Token' AND enquirers.city = ? 
           ORDER BY enquirers.enquirersid DESC`;
  } else if (enquirySource === "CSV") {
    sql = `SELECT enquirers.*, properties.frontView, properties.seoSlug, properties.commissionAmount,
                  territorypartner.fullname AS territoryName, 
                  territorypartner.contact AS territoryContact
           FROM enquirers 
           LEFT JOIN properties ON enquirers.propertyid = properties.propertyid
           LEFT JOIN territorypartner ON territorypartner.id = enquirers.territorypartnerid
           WHERE enquirers.source = "CSV File" AND enquirers.status != 'Token' AND enquirers.city = ? 
           ORDER BY enquirers.enquirersid DESC`;
  } else {
    sql = `SELECT enquirers.*, properties.frontView, properties.seoSlug, properties.commissionAmount,
                  territorypartner.fullname AS territoryName, 
                  territorypartner.contact AS territoryContact
           FROM enquirers 
           LEFT JOIN properties ON enquirers.propertyid = properties.propertyid  
           LEFT JOIN territorypartner ON territorypartner.id = enquirers.territorypartnerid
           WHERE enquirers.status != 'Token' AND enquirers.city = ?
           ORDER BY enquirers.enquirersid DESC`;
  }

  db.query(sql, [promoterCity], (err, result) => {
    if (err) {
      console.error("Error fetching Enquirers:", err);
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