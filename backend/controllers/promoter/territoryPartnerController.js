import db from "../../config/dbconnect.js";
import moment from "moment";
import bcrypt from "bcryptjs";
import sendEmail from "../../utils/nodeMailer.js";
import { verifyRazorpayPayment } from "../paymentController.js";

const saltRounds = 10;
export const getAll = (req, res) => {
  const partnerAdderId = req.promoterUser?.id;
  if (!partnerAdderId) {
    return res.status(400).json({ message: "Invalid Id!" });
  }

  const paymentStatus = req.params.paymentStatus;
  if (!paymentStatus) {
    return res.status(401).json({ message: "Payment Status Not Selected" });
  }

  let sql;

  const followUpJoin = `
    LEFT JOIN (
      SELECT p1.*
      FROM partnerFollowup p1
      INNER JOIN (
        SELECT partnerId, MAX(created_at) AS latest
        FROM partnerFollowup
        WHERE role = 'Territory Partner'
        GROUP BY partnerId
      ) p2 ON p1.partnerId = p2.partnerId AND p1.created_at = p2.latest
      WHERE p1.role = 'Territory Partner'
    ) pf ON tp.id = pf.partnerId
  `;

  switch (paymentStatus) {
    case "Success":
      sql = `
        SELECT tp.*, pf.followUp, pf.created_at AS followUpDate
        FROM territorypartner tp
        ${followUpJoin}
        WHERE tp.paymentstatus = 'Success' AND tp.partneradder = ${partnerAdderId} 
        ORDER BY tp.created_at DESC`;
      break;

    case "Follow Up":
      sql = `
        SELECT tp.*, pf.followUp, pf.created_at AS followUpDate
        FROM territorypartner tp
        ${followUpJoin}
        WHERE tp.paymentstatus = 'Follow Up' AND tp.loginstatus = 'Inactive' AND tp.partneradder = ${partnerAdderId} 
        ORDER BY tp.updated_at DESC`;
      break;

    case "Pending":
      sql = `
        SELECT tp.*, pf.followUp, pf.created_at AS followUpDate
        FROM territorypartner tp
        ${followUpJoin}
        WHERE tp.paymentstatus = 'Pending' AND tp.partneradder = ${partnerAdderId} 
        ORDER BY tp.created_at DESC`;
      break;

    case "Free":
      sql = `
        SELECT tp.*, pf.followUp, pf.created_at AS followUpDate
        FROM territorypartner tp
        ${followUpJoin}
        WHERE tp.paymentstatus != 'Success' AND tp.loginstatus = 'Active' AND tp.partneradder = ${partnerAdderId} 
        ORDER BY tp.created_at DESC`;
      break;

    default:
      sql = `SELECT * FROM territorypartner WHERE partneradder = ${partnerAdderId} ORDER BY id DESC`;
  }

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching Territory Partners:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    // Count query with "Free" added
    const countQuery = `
      SELECT 'Success' AS status, COUNT(*) AS count
      FROM territorypartner
      WHERE paymentstatus = 'Success' AND partneradder = ${partnerAdderId} 
      UNION ALL
      SELECT 'Pending', COUNT(*)
      FROM territorypartner
      WHERE paymentstatus = 'Pending' AND partneradder = ${partnerAdderId} 
      UNION ALL
      SELECT 'Follow Up', COUNT(*)
      FROM territorypartner
      WHERE paymentstatus = 'Follow Up' AND loginstatus = 'Inactive' AND partneradder = ${partnerAdderId} 
      UNION ALL
      SELECT 'Free', COUNT(*)
      FROM territorypartner
      WHERE paymentstatus != 'Success' AND loginstatus = 'Active' AND partneradder = ${partnerAdderId} 
    `;

    db.query(countQuery, (countErr, counts) => {
      if (countErr) {
        console.error("Error fetching status counts:", countErr);
        return res
          .status(500)
          .json({ message: "Database error", error: countErr });
      }

      // Format counts into object
      const paymentStatusCounts = {};
      counts.forEach((item) => {
        paymentStatusCounts[item.status] = item.count;
      });

      // Format results
      const formatted = result.map((row) => ({
        ...row,
        created_at: moment(row.created_at).format("DD MMM YYYY | hh:mm A"),
        updated_at: moment(row.updated_at).format("DD MMM YYYY | hh:mm A"),
        followUp: row.followUp || null,
        followUpDate: row.followUpDate
          ? moment(row.followUpDate).format("DD MMM YYYY | hh:mm A")
          : null,
      }));

      return res.json({
        data: formatted,
        paymentStatusCounts,
      });
    });
  });
};

// **Add New Territory Partner **
export const add = (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const partnerAdderId = req.promoterUser?.id;
  if (!partnerAdderId) {
    return res.status(400).json({ message: "Invalid Partner Adder ID" });
  }

  const {
    fullname,
    contact,
    email,
    intrest,
    refrence,
    address,
    state,
    city,
    pincode,
    experience,
    adharno,
    panno,
    rerano,
    bankname,
    accountholdername,
    accountnumber,
    ifsc,
  } = req.body;

  // Validate required fields
  if (!fullname || !contact || !email || !intrest) {
    return res.status(400).json({ message: "All Fields required!" });
  }

  // Generate referral code
  const createReferralCode = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return "REF-" + code; // Total 10 characters
  };

  const generateUniqueReferralCode = (callback) => {
    const code = createReferralCode();
    db.query(
      "SELECT referral FROM territorypartner WHERE referral = ?",
      [code],
      (err, results) => {
        if (err) return callback(err, null);
        if (results.length > 0) return generateUniqueReferralCode(callback);
        return callback(null, code);
      }
    );
  };

  // Handle uploaded files safely
  const adharImageFile = req.files?.["adharImage"]?.[0];
  const panImageFile = req.files?.["panImage"]?.[0];
  const reraImageFile = req.files?.["reraImage"]?.[0];

  const adharImageUrl = adharImageFile
    ? `/uploads/${adharImageFile.filename}`
    : null;
  const panImageUrl = panImageFile ? `/uploads/${panImageFile.filename}` : null;
  const reraImageUrl = reraImageFile
    ? `/uploads/${reraImageFile.filename}`
    : null;

  // Check for duplicates
  const checkSql = `SELECT * FROM territorypartner WHERE contact = ? OR email = ?`;

  db.query(checkSql, [contact, email], (checkErr, checkResult) => {
    if (checkErr) {
      console.error("Error checking existing Territory Partner:", checkErr);
      return res.status(500).json({
        message: "Database error during validation",
        error: checkErr,
      });
    }

    if (checkResult.length > 0) {
      return res.status(409).json({
        message: "Territory Partner already exists with this Contact or Email.",
      });
    }

    // Generate unique referral code before inserting
    generateUniqueReferralCode((referralErr, referralCode) => {
      if (referralErr) {
        console.error("Error generating referral:", referralErr);
        return res.status(500).json({
          message: "Referral code generation failed",
          error: referralErr,
        });
      }

      // Insert new territory partner
      const insertSql = `
        INSERT INTO territorypartner 
        (fullname, contact, email, intrest, partneradder, refrence, referral, address, state, city, pincode, experience, adharno, panno, rerano, 
         bankname, accountholdername, accountnumber, ifsc, adharimage, panimage, reraimage, updated_at, created_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      db.query(
        insertSql,
        [
          fullname,
          contact,
          email,
          intrest,
          partnerAdderId,
          refrence,
          referralCode,
          address,
          state,
          city,
          pincode,
          experience,
          adharno,
          panno,
          rerano,
          bankname,
          accountholdername,
          accountnumber,
          ifsc,
          adharImageUrl,
          panImageUrl,
          reraImageUrl,
          currentdate,
          currentdate,
        ],
        (insertErr, insertResult) => {
          if (insertErr) {
            console.error("Error inserting Territory Partner:", insertErr);
            return res.status(500).json({
              message: "Database error during insertion",
              error: insertErr,
            });
          }

          // Insert follow-up for the new Territory Partner
          const followupSql = `
            INSERT INTO partnerFollowup 
            (partnerId, role, followUp, followUpText, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?)
          `;

          db.query(
            followupSql,
            [
              insertResult.insertId,
              "Territory Partner",
              "New",
              "Newly Added Territory Partner",
              currentdate,
              currentdate,
            ],
            (followupErr) => {
              if (followupErr) {
                console.error("Error adding follow-up:", followupErr);
                return res.status(500).json({
                  message: "Follow-up insert failed",
                  error: followupErr,
                });
              }

              return res.status(201).json({
                message: "Territory Partner added successfully",
                Id: insertResult.insertId,
              });
            }
          );
        }
      );
    });
  });
};

export const edit = (req, res) => {
  const partnerid = parseInt(req.params.id);
  if (isNaN(partnerid)) {
    return res.status(400).json({ message: "Invalid Partner ID" });
  }
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const {
    fullname,
    contact,
    email,
    intrest,
    address,
    state,
    city,
    pincode,
    experience,
    adharno,
    panno,
    rerano,
    bankname,
    accountholdername,
    accountnumber,
    ifsc,
  } = req.body;

  if (!fullname || !contact || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Handle uploaded files
  const adharImageFile = req.files?.["adharImage"]?.[0];
  const panImageFile = req.files?.["panImage"]?.[0];
  const reraImageFile = req.files?.["reraImage"]?.[0];

  const adharImageUrl = adharImageFile
    ? `/uploads/${adharImageFile.filename}`
    : null;
  const panImageUrl = panImageFile ? `/uploads/${panImageFile.filename}` : null;
  const reraImageUrl = reraImageFile
    ? `/uploads/${reraImageFile.filename}`
    : null;

  let updateSql = `UPDATE territorypartner SET fullname = ?, contact = ?, email = ?, intrest = ?,
    address = ?, state = ?, city = ?, pincode = ?, experience = ?, adharno = ?, panno = ?,
     rerano = ?, bankname = ?, accountholdername = ?, accountnumber = ?, ifsc = ?, updated_at = ?`;
  const updateValues = [
    fullname,
    contact,
    email,
    intrest,
    address,
    state,
    city,
    pincode,
    experience,
    adharno,
    panno,
    rerano,
    bankname,
    accountholdername,
    accountnumber,
    ifsc,
    currentdate,
  ];

  if (adharImageUrl) {
    updateSql += `, adharimage = ?`;
    updateValues.push(adharImageUrl);
  }

  if (panImageUrl) {
    updateSql += `, panimage = ?`;
    updateValues.push(panImageUrl);
  }

  if (reraImageUrl) {
    updateSql += `, reraimage = ?`;
    updateValues.push(reraImageUrl);
  }

  updateSql += ` WHERE id = ?`;
  updateValues.push(partnerid);

  db.query(updateSql, updateValues, (updateErr, result) => {
    if (updateErr) {
      console.error("Error updating Territory Partner:", updateErr);
      return res
        .status(500)
        .json({ message: "Database error during update", error: updateErr });
    }

    res.status(200).json({ message: "Territory Partner updated successfully" });
  });
};
