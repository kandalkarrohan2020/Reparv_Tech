import db from "../../config/dbconnect.js";
import moment from "moment";
import bcrypt from "bcryptjs";
import sendEmail from "../../utils/nodeMailer.js";

const saltRounds = 10;
// **Fetch All **
export const getAll = (req, res) => {
  const sql = "SELECT * FROM projectpartner ORDER BY id DESC";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching :", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.json(result);
  });
};

// **Fetch All**
export const getAllActive = (req, res) => {
  const sql =
    "SELECT * FROM projectpartner WHERE status = 'Active' ORDER BY id DESC";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.json(result);
  });
};

// **Fetch Single by ID**
export const getById = (req, res) => {
  const Id = parseInt(req.params.id);
  const sql = "SELECT * FROM projectpartner WHERE id = ?";

  db.query(sql, [Id], (err, result) => {
    if (err) {
      console.error("Error fetching :", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Project Partner not found" });
    }
    res.json(result[0]);
  });
};

// **Add New **
export const add = (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const { fullname, contact, email, address, city, experience, adharno, panno } =
    req.body;

  if (
    !fullname ||
    !contact ||
    !email ||
    !address ||
    !city ||
    !experience ||
    !adharno ||
    !panno
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  // Handle uploaded files
  const adharImageFile = req.files?.["adharImage"]?.[0];
  const panImageFile = req.files?.["panImage"]?.[0];

  const adharImageUrl = adharImageFile
    ? `/uploads/${adharImageFile.filename}`
    : null;
  const panImageUrl = panImageFile ? `/uploads/${panImageFile.filename}` : null;

  const checkSql = `SELECT * FROM projectpartner WHERE contact = ? OR adharno = ? OR email = ?`;

  db.query(checkSql, [contact, adharno, email], (checkErr, checkResult) => {
    if (checkErr) {
      console.error("Error checking existing Partner:", checkErr);
      return res
        .status(500)
        .json({ message: "Database error during validation", error: checkErr });
    }

    if (checkResult.length > 0) {
      return res.status(409).json({
        message:
          "Project Partner already exists with this contact or Aadhaar number",
      });
    }
  });
  const sql = `INSERT INTO projectpartner (fullname, contact, email, address, city, experience, adharno, panno, adharimage, panimage, updated_at, created_at) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [
      fullname,
      contact,
      email,
      address,
      city,
      experience,
      adharno,
      panno,
      adharImageUrl,
      panImageUrl,
      currentdate,
      currentdate,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting :", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(201).json({
        message: "Project Partner added successfully",
        Id: result.insertId,
      });
    }
  );
};

export const edit = (req, res) => {
  const partnerid = req.params.id;
  if (!partnerid) {
    return res.status(400).json({ message: "Invalid Partner ID" });
  }
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const { fullname, contact, email, address, city, experience, adharno, panno } =
    req.body;

  if (
    !fullname ||
    !contact ||
    !email ||
    !address ||
    !city ||
    !experience ||
    !adharno ||
    !panno
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Handle uploaded files
  const adharImageFile = req.files?.["adharImage"]?.[0];
  const panImageFile = req.files?.["panImage"]?.[0];

  const adharImageUrl = adharImageFile
    ? `/uploads/${adharImageFile.filename}`
    : null;
  const panImageUrl = panImageFile ? `/uploads/${panImageFile.filename}` : null;

  let updateSql = `UPDATE projectpartner SET fullname = ?, contact = ?, email = ?, address = ?, city = ?, experience = ?, adharno = ?, panno = ?, updated_at = ?`;
  const updateValues = [
    fullname,
    contact,
    email,
    address,
    city,
    experience,
    adharno,
    panno,
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

  updateSql += ` WHERE id = ?`;
  updateValues.push(partnerid);

  db.query(updateSql, updateValues, (updateErr, result) => {
    if (updateErr) {
      console.error("Error updating project Partner:", updateErr);
      return res
        .status(500)
        .json({ message: "Database error during update", error: updateErr });
    }

    res.status(200).json({ message: "Project Partner updated successfully" });
  });
};

// **Delete **
export const del = (req, res) => {
  const Id = parseInt(req.params.id);

  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Partner ID" });
  }

  db.query(
    "SELECT * FROM projectpartner WHERE id = ?",
    [Id],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Project Partner not found" });
      }

      db.query(
        "DELETE FROM projectpartner WHERE id = ?",
        [Id],
        (err) => {
          if (err) {
            console.error("Error deleting :", err);
            return res
              .status(500)
              .json({ message: "Database error", error: err });
          }
          res
            .status(200)
            .json({ message: "Project Partner deleted successfully" });
        }
      );
    }
  );
};

//**Change status */
export const status = (req, res) => {
  const Id = parseInt(req.params.id);
  console.log(Id);
  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Partner ID" });
  }

  db.query(
    "SELECT * FROM projectpartner WHERE id = ?",
    [Id],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      let status = "";
      if (result[0].status === "Active") {
        status = "Inactive";
      } else {
        status = "Active";
      }
      console.log(status);
      db.query(
        "UPDATE projectpartner SET status = ? WHERE id = ?",
        [status, Id],
        (err, result) => {
          if (err) {
            console.error("Error deleting :", err);
            return res
              .status(500)
              .json({ message: "Database error", error: err });
          }
          res
            .status(200)
            .json({ message: "Project Partner status change successfully" });
        }
      );
    }
  );
};

export const assignLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const Id = parseInt(req.params.id);

    if (isNaN(Id)) {
      return res.status(400).json({ message: "Invalid Partner ID" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Use 10 as salt rounds

    db.query(
      "SELECT * FROM projectpartner WHERE id = ?",
      [Id],
      (err, result) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ message: "Database error", error: err });
        }
        if (result.length === 0) {
          return res.status(404).json({ message: "Projet Partner not found" });
        }

        let loginstatus = result[0].loginstatus === "Active" ? "Inactive" : "Active";
        const email = result[0].email; 

        db.query(
          "UPDATE projectpartner SET loginstatus = ?, username = ?, password = ? WHERE id = ?",
          [loginstatus, username, hashedPassword, Id],
          (err, updateResult) => {
            if (err) {
              console.error("Error updating record:", err);
              return res.status(500).json({ message: "Database error", error: err });
            }

            // Send email after successful update
            sendEmail(email, username, password, "Project Partner")
              .then(() => {
                res.status(200).json({ message: "Project Partner login assigned successfully and email sent." });
              })
              .catch((emailError) => {
                console.error("Error sending email:", emailError);
                res.status(500).json({ message: "Login updated but email failed to send." });
              });
          }
        );
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ message: "Unexpected server error", error });
  }
};