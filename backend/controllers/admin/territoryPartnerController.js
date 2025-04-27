import db from "../../config/dbconnect.js";
import moment from "moment";
import bcrypt from "bcryptjs";
import sendEmail from "../../utils/nodeMailer.js";

const saltRounds = 10;
// **Fetch All **
export const getAll = (req, res) => {
  const sql = "SELECT * FROM territorypartner ORDER BY id DESC";
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
    "SELECT * FROM territorypartner WHERE status = 'Active' ORDER BY id DESC";
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
  const sql = "SELECT * FROM territorypartner WHERE id = ?";

  db.query(sql, [Id], (err, result) => {
    if (err) {
      console.error("Error fetching :", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Territory Partner not found" });
    }
    res.json(result[0]);
  });
};

// **Add New **
export const add = (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");

  const {
    fullname,
    contact,
    email,
    address,
    city,
    experience,
    adharno,
    panno,
  } = req.body;

  // Validate required fields
  if (!fullname || !contact || !email || !city) {
    return res.status(400).json({ message: "all fields required!" });
  }

  // Handle uploaded files safely
  const adharImageFile = req.files?.["adharImage"]?.[0];
  const panImageFile = req.files?.["panImage"]?.[0];

  const adharImageUrl = adharImageFile ? `/uploads/${adharImageFile.filename}` : null;
  const panImageUrl = panImageFile ? `/uploads/${panImageFile.filename}` : null;

  // Check if Territory Partner already exists
  const checkSql = `SELECT * FROM territorypartner WHERE contact = ? OR email = ?`;

  db.query(checkSql, [contact, email], (checkErr, checkResult) => {
    if (checkErr) {
      console.error("Error checking existing Territory Partner:", checkErr);
      return res.status(500).json({ message: "Database error during validation", error: checkErr });
    }

    if (checkResult.length > 0) {
      return res.status(409).json({
        message: "Territory Partner already exists with this Contact or Email.",
      });
    }

    // Insert only if no duplicate found
    const insertSql = `
      INSERT INTO territorypartner 
      (fullname, contact, email, address, city, experience, adharno, panno, adharimage, panimage, updated_at, created_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      insertSql,
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
      (insertErr, insertResult) => {
        if (insertErr) {
          console.error("Error inserting Territory Partner:", insertErr);
          return res.status(500).json({ message: "Database error during insertion", error: insertErr });
        }

        res.status(201).json({
          message: "Territory Partner added successfully",
          Id: insertResult.insertId,
        });
      }
    );
  });
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

  let updateSql = `UPDATE territorypartner SET fullname = ?, contact = ?, email = ?, address = ?, city = ?, experience = ?, adharno = ?, panno = ?, updated_at = ?`;
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
      console.error("Error updating Territory Partner:", updateErr);
      return res
        .status(500)
        .json({ message: "Database error during update", error: updateErr });
    }

    res.status(200).json({ message: "Territory Partner updated successfully" });
  });
};

// **Delete **
export const del = (req, res) => {
  const Id = parseInt(req.params.id);

  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Partner ID" });
  }

  db.query(
    "SELECT * FROM territorypartner WHERE id = ?",
    [Id],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Territory Partner not found" });
      }

      db.query(
        "DELETE FROM territorypartner WHERE id = ?",
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
            .json({ message: "Territory Partner deleted successfully" });
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
    "SELECT * FROM territorypartner WHERE id = ?",
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
        "UPDATE territorypartner SET status = ? WHERE id = ?",
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
            .json({ message: "Territory Partner status change successfully" });
        }
      );
    }
  );
};

export const assignLogin = async (req, res) => {
  try {
    const { username, password, propertyType } = req.body;
    const Id = parseInt(req.params.id);

    if (isNaN(Id)) {
      return res.status(400).json({ message: "Invalid Partner ID" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Use 10 as salt rounds

    db.query(
      "SELECT * FROM territorypartner WHERE id = ?",
      [Id],
      (err, result) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ message: "Database error", error: err });
        }
        if (result.length === 0) {
          return res.status(404).json({ message: "Territory Partner not found" });
        }

        let loginstatus = result[0].loginstatus === "Active" ? "Inactive" : "Active";
        const email = result[0].email; 

        db.query(
          "UPDATE territorypartner SET loginstatus = ?, username = ?, password = ?, propertytype = ? WHERE id = ?",
          [loginstatus, username, hashedPassword, propertyType, Id],
          (err, updateResult) => {
            if (err) {
              console.error("Error updating record:", err);
              return res.status(500).json({ message: "Database error", error: err });
            }

            // Send email after successful update
            sendEmail(email, username, password, "Territory Partner", "https://territory.reparv.in")
              .then(() => {
                res.status(200).json({ message: "Territory Partner login assigned successfully and email sent." });
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