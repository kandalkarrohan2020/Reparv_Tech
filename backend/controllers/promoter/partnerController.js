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

  let sql = "";

  const followUpJoin = `
    LEFT JOIN (
      SELECT p1.*
      FROM partnerFollowup p1
      INNER JOIN (
        SELECT partnerId, MAX(created_at) AS latest
        FROM partnerFollowup
        WHERE role = 'Onboarding Partner'
        GROUP BY partnerId
      ) p2 ON p1.partnerId = p2.partnerId AND p1.created_at = p2.latest
      WHERE p1.role = 'Onboarding Partner'
    ) pf ON onboardingpartner.partnerid = pf.partnerId
  `;

  switch (paymentStatus) {
    case "Success":
      sql = `
        SELECT onboardingpartner.*, pf.followUp, pf.created_at AS followUpDate
        FROM onboardingpartner
        ${followUpJoin}
        WHERE onboardingpartner.paymentstatus = 'Success' AND onboardingpartner.partneradder = ${partnerAdderId} 
        ORDER BY onboardingpartner.created_at DESC`;
      break;

    case "Follow Up":
      sql = `
        SELECT onboardingpartner.*, pf.followUp, pf.created_at AS followUpDate
        FROM onboardingpartner
        ${followUpJoin}
        WHERE onboardingpartner.paymentstatus = 'Follow Up' AND onboardingpartner.loginstatus = 'Inactive'  AND onboardingpartner.partneradder = ${partnerAdderId} 
        ORDER BY onboardingpartner.updated_at DESC`;
      break;

    case "Pending":
      sql = `
        SELECT onboardingpartner.*, pf.followUp, pf.created_at AS followUpDate
        FROM onboardingpartner
        ${followUpJoin}
        WHERE onboardingpartner.paymentstatus = 'Pending' AND onboardingpartner.partneradder = ${partnerAdderId}
        ORDER BY onboardingpartner.created_at DESC`;
      break;

    case "Free":
      sql = `
        SELECT onboardingpartner.*, pf.followUp, pf.created_at AS followUpDate
        FROM onboardingpartner
        ${followUpJoin}
        WHERE onboardingpartner.paymentstatus != 'Success'
          AND onboardingpartner.loginstatus = 'Active' AND onboardingpartner.partneradder = ${partnerAdderId}
        ORDER BY onboardingpartner.created_at DESC`;
      break;

    default:
      sql = `SELECT * FROM onboardingpartner WHERE partneradder = ${partnerAdderId} ORDER BY partnerid DESC`;
  }

  db.query(sql, (err, partners) => {
    if (err) {
      console.error("Error fetching partners:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    // Updated count query for accurate grouping including "Free"
    const countQuery = `
      SELECT 'Success' AS status, COUNT(*) AS count
      FROM onboardingpartner
      WHERE paymentstatus = 'Success' AND partneradder = ${partnerAdderId} 
      UNION ALL
      SELECT 'Pending', COUNT(*)
      FROM onboardingpartner
      WHERE paymentstatus = 'Pending' AND partneradder = ${partnerAdderId} 
      UNION ALL
      SELECT 'Follow Up', COUNT(*)
      FROM onboardingpartner
      WHERE paymentstatus = 'Follow Up' AND loginstatus = 'Inactive' AND partneradder = ${partnerAdderId} 
      UNION ALL
      SELECT 'Free', COUNT(*)
      FROM onboardingpartner
      WHERE paymentstatus != 'Success' AND loginstatus = 'Active' AND partneradder = ${partnerAdderId} 
    `;

    db.query(countQuery, (countErr, counts) => {
      if (countErr) {
        console.error("Error fetching counts:", countErr);
        return res
          .status(500)
          .json({ message: "Database error", error: countErr });
      }

      const formatted = (partners || []).map((row) => ({
        ...row,
        created_at: moment(row.created_at).format("DD MMM YYYY | hh:mm A"),
        updated_at: moment(row.updated_at).format("DD MMM YYYY | hh:mm A"),
        followUp: row.followUp || null,
        followUpDate: row.followUpDate
          ? moment(row.followUpDate).format("DD MMM YYYY | hh:mm A")
          : null,
      }));

      const paymentStatusCounts = {};
      counts.forEach((item) => {
        paymentStatusCounts[item.status] = item.count;
      });

      return res.json({
        data: formatted,
        paymentStatusCounts,
      });
    });
  });
};

// **Add New **
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
    bankname,
    accountholdername,
    accountnumber,
    ifsc,
  } = req.body;

  if (!fullname || !contact || !email || !intrest) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const createReferralCode = (length = 6) => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";
    let code = "";
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return "REF-" + code;
  };

  const generateUniqueReferralCode = (callback) => {
    const code = createReferralCode();
    db.query(
      "SELECT referral FROM onboardingpartner WHERE referral = ?",
      [code],
      (err, results) => {
        if (err) {
          return callback(err, null);
        }
        if (results.length > 0) {
          // Code exists, retry
          return generateUniqueReferralCode(callback);
        }
        // Unique code found
        return callback(null, code);
      }
    );
  };

  const adharImageFile = req.files?.["adharImage"]?.[0];
  const panImageFile = req.files?.["panImage"]?.[0];

  const adharImageUrl = adharImageFile
    ? `/uploads/${adharImageFile.filename}`
    : null;
  const panImageUrl = panImageFile ? `/uploads/${panImageFile.filename}` : null;

  const checkSql = `SELECT * FROM onboardingpartner WHERE contact = ? OR email = ?`;

  db.query(checkSql, [contact, email], (checkErr, checkResult) => {
    if (checkErr) {
      console.error("Error checking existing Partner:", checkErr);
      return res.status(500).json({
        message: "Database error during validation",
        error: checkErr,
      });
    }

    if (checkResult.length > 0) {
      return res.status(409).json({
        message: "OnBoarding Partner already exists with this contact or email",
      });
    }

    // Now generate a unique referral code
    generateUniqueReferralCode((referralErr, referralCode) => {
      if (referralErr) {
        console.error("Referral code generation failed:", referralErr);
        return res.status(500).json({
          message: "Error generating unique referral code",
          error: referralErr,
        });
      }

      const sql = `INSERT INTO onboardingpartner 
      (fullname, contact, email, intrest, partneradder, refrence, referral, address, state, city, pincode, experience, adharno, panno, bankname, accountholdername, accountnumber, ifsc, adharimage, panimage, updated_at, created_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      db.query(
        sql,
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
          bankname,
          accountholdername,
          accountnumber,
          ifsc,
          adharImageUrl,
          panImageUrl,
          currentdate,
          currentdate,
        ],
        (err, result) => {
          if (err) {
            console.error("Error inserting:", err);
            return res
              .status(500)
              .json({ message: "Database error", error: err });
          }

          // Insert default follow-up
          db.query(
            "INSERT INTO partnerFollowup (partnerId, role, followUp, followUpText, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
            [
              result.insertId,
              "Onboarding Partner",
              "New",
              "Newly Added Onboarding Partner",
              currentdate,
              currentdate,
            ],
            (insertErr, insertResult) => {
              if (insertErr) {
                console.error("Error Adding Follow Up:", insertErr);
                return res
                  .status(500)
                  .json({ message: "Database error", error: insertErr });
              }

              return res.status(201).json({
                message: "OnBoarding Partner added successfully",
                Id: result.insertId,
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
    bankname,
    accountholdername,
    accountnumber,
    ifsc,
  } = req.body;

  if (!fullname || !contact || !email ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Handle uploaded files
  const adharImageFile = req.files?.["adharImage"]?.[0];
  const panImageFile = req.files?.["panImage"]?.[0];

  const adharImageUrl = adharImageFile
    ? `/uploads/${adharImageFile.filename}`
    : null;
  const panImageUrl = panImageFile ? `/uploads/${panImageFile.filename}` : null;

  let updateSql = `UPDATE onboardingpartner SET fullname = ?, contact = ?, email = ?, intrest = ?, address = ?, state = ?, city = ?, pincode = ?, experience = ?, adharno = ?, panno = ?, bankname = ?, accountholdername = ?, accountnumber = ?, ifsc = ?, updated_at = ?`;
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

  updateSql += ` WHERE partnerid = ?`;
  updateValues.push(partnerid);

  db.query(updateSql, updateValues, (updateErr, result) => {
    if (updateErr) {
      console.error("Error updating Partner:", updateErr);
      return res
        .status(500)
        .json({ message: "Database error during update", error: updateErr });
    }

    res.status(200).json({ message: "Partner updated successfully" });
  });
};