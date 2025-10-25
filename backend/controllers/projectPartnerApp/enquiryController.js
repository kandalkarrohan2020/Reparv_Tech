import axios from "axios";
import db from "../../config/dbconnect.js";
import moment from "moment";
// export const getAll = (req, res) => {
//   try {
//     // const { partnerId } = req.params;
//     const partnerId = req.projectPartnerUser?.id;
//     if (!partnerId) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Project Partner ID is required" });
//     }

//     const sql = `
//       SELECT
//           enquirers.*,
//           properties.frontView,
//           properties.seoSlug,
//           properties.commissionAmount,
//           territorypartner.fullname AS territoryName,
//           territorypartner.contact AS territoryContact
//       FROM enquirers
//       LEFT JOIN properties
//           ON enquirers.propertyid = properties.propertyid
//       LEFT JOIN territorypartner
//           ON territorypartner.id = enquirers.territorypartnerid
//       WHERE
//           properties.status = 'active'
//           AND properties.approve = 'Approved'
//           AND enquirers.source = 'Onsite'
//           AND enquirers.status != 'Token'
//           AND properties.projectpartnerid = ?
//       ORDER BY
//           enquirers.enquirersid DESC
//     `;

//     db.query(sql, [partnerId], (err, results) => {
//       if (err) {
//         console.error("Database error:", err);
//         return res.status(500).json({
//           success: false,
//           message: "Database query failed",
//           error: err,
//         });
//       }

//       if (results.length === 0) {
//         return res.status(200).json({
//           success: true,
//           message: "No enquiries found for this partner",
//           data: [],
//         });
//       }

//       res.status(200).json({
//         success: true,
//         message: "Enquiries fetched successfully",
//         totalEnquiries: results.length,
//         data: results,
//       });
//     });
//   } catch (error) {
//     console.error("Server error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// };

export const getAll = (req, res) => {
  try {
    const enquirySource = req.params.source;
    const partnerId = req.projectPartnerUser?.id; // Project Partner Logic

    let sql;
    let params = [];

    // Base conditions applied to all
    let baseCondition = `enquirers.status != 'Token'`;

    // Add partner logic only if partnerId exists
    if (partnerId) {
      baseCondition += ` AND properties.projectpartnerid = ?`;
      params.push(partnerId);
    }

    // Source-wise filters
    if (enquirySource === "Onsite") {
      sql = `
        SELECT enquirers.*, properties.frontView, properties.seoSlug, properties.commissionAmount,
               territorypartner.fullname AS territoryName, territorypartner.contact AS territoryContact
        FROM enquirers 
        LEFT JOIN properties ON enquirers.propertyid = properties.propertyid
        LEFT JOIN territorypartner ON territorypartner.id = enquirers.territorypartnerid
        WHERE ${baseCondition}
          AND properties.status = 'active'
          AND properties.approve = 'Approved'
          AND enquirers.source = 'Onsite'
        ORDER BY enquirers.enquirersid DESC`;
    } else if (enquirySource === "Direct") {
      sql = `
        SELECT enquirers.*, properties.frontView, properties.seoSlug, properties.commissionAmount,
               territorypartner.fullname AS territoryName, territorypartner.contact AS territoryContact
        FROM enquirers 
        LEFT JOIN properties ON enquirers.propertyid = properties.propertyid
        LEFT JOIN territorypartner ON territorypartner.id = enquirers.territorypartnerid
        WHERE ${baseCondition}
          AND enquirers.source = 'Direct'
        ORDER BY enquirers.enquirersid DESC`;
    } else if (enquirySource === "CSV") {
      sql = `
        SELECT enquirers.*, properties.frontView, properties.seoSlug, properties.commissionAmount,
               territorypartner.fullname AS territoryName, territorypartner.contact AS territoryContact
        FROM enquirers 
        LEFT JOIN properties ON enquirers.propertyid = properties.propertyid
        LEFT JOIN territorypartner ON territorypartner.id = enquirers.territorypartnerid
        WHERE ${baseCondition}
          AND enquirers.source = 'CSV File'
        ORDER BY enquirers.enquirersid DESC`;
    } else {
      sql = `
        SELECT enquirers.*, properties.frontView, properties.seoSlug, properties.commissionAmount,
               territorypartner.fullname AS territoryName, territorypartner.contact AS territoryContact
        FROM enquirers 
        LEFT JOIN properties ON enquirers.propertyid = properties.propertyid
        LEFT JOIN territorypartner ON territorypartner.id = enquirers.territorypartnerid
        WHERE ${baseCondition}
        ORDER BY enquirers.enquirersid DESC`;
    }

    // Execute the query
    db.query(sql, params, (err, result) => {
      if (err) {
        console.error("Error fetching Enquirers:", err);
        return res
          .status(500)
          .json({ success: false, message: "Database error", error: err });
      }

      // Format dates
      const formatted = result.map((row) => ({
        ...row,
        created_at: row.created_at
          ? moment(row.created_at).format("DD MMM YYYY | hh:mm A")
          : null,
        updated_at: row.updated_at
          ? moment(row.updated_at).format("DD MMM YYYY | hh:mm A")
          : null,
      }));

      res.status(200).json({
        success: true,
        message: "Enquiries fetched successfully",
        totalEnquiries: formatted.length,
        data: formatted,
      });
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const assignEnquiry = async (req, res) => {
  const { salespersonid, salesperson, salespersoncontact } = req.body;
  const Id = parseInt(req.params.id);
  const currentDate = moment().format("YYYY-MM-DD HH:mm:ss");

  if (!salespersonid || !salesperson || !salespersoncontact) {
    return res.status(400).json({ message: "All Fields Required" });
  }

  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Enquiry ID" });
  }

  const salesInfo = `${salesperson} - ${salespersoncontact}`;

  db.query(
    "SELECT * FROM enquirers WHERE enquirersid = ?",
    [Id],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "Enquiry not found" });
      }

      db.query(
        "UPDATE enquirers SET salespersonid = ?, assign = ?, updated_at = ? WHERE enquirersid = ?",
        [salespersonid, salesInfo, currentDate, Id],
        async (err, result) => {
          if (err) {
            console.error("Error assigning salesperson:", err);
            return res
              .status(500)
              .json({ message: "Database error", error: err });
          }

          // WhatsApp message logic
          const apikey = "1c26ea744ef248f080ee1c5270081c0b";
          const msg = `🌟 *REPARV* - New Enquiry Alert 🌟

        Hello ${salesperson},

        You have been assigned a new enquiry.

        Please check the details and take quick action.

        📱 Open the *REPARV Sales Partner App* or  
        🖥️ Visit: https://sales.reparv.in/

        Thank you,  
        Team REPARV`;

          const encodedMsg = encodeURIComponent(msg);
          const apiUrl = `http://wapi.kinextechnologies.in/wapp/api/send?apikey=${apikey}&mobile=${salespersoncontact}&msg=${encodedMsg}`;

          try {
            const response = await axios.get(apiUrl);
            console.log("WhatsApp API response:", response.data);
          } catch (error) {
            console.error("WhatsApp send error:", error.message);
            // optional: log but do not block assignment
          }

          return res.status(200).json({
            message: `Enquiry assigned successfully to ${salesperson}`,
            assigned_to: {
              id: salespersonid,
              name: salesperson,
              contact: salespersoncontact,
            },
          });
        }
      );
    }
  );
};
// Assign Enquiry To Territory Partners
export const assignEnquiryToTerritoryPartner = async (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const { territorypartnerid } = req.body;
  if (!territorypartnerid) {
    return res.status(400).json({ message: "All Fields Required" });
  }
  const Id = parseInt(req.params.id);
  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Enquiry ID" });
  }

  db.query(
    "SELECT * FROM enquirers WHERE enquirersid = ?",
    [Id],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Enquiry not found" });
      }

      db.query(
        "UPDATE enquirers SET territorypartnerid = ?,  updated_at = ?, created_at = ? WHERE enquirersid = ?",
        [territorypartnerid, currentdate, currentdate, Id],
        (err, result) => {
          if (err) {
            console.error("Error assigning to territory partner :", err);
            return res
              .status(500)
              .json({ message: "Database error", error: err });
          }
          res.status(200).json({
            message: "Enquiry assigned successfully to Territory Partner",
          });
        }
      );
    }
  );
};
