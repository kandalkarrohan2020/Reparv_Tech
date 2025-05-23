import db from "../../config/dbconnect.js";
import moment from "moment";
import bcrypt from "bcryptjs";
import sendEmail from "../../utils/nodeMailer.js";

const saltRounds = 10;
// **Fetch All **
export const getAll = (req, res) => {
  const sql = "SELECT * FROM salespersons ORDER BY salespersonsid DESC";
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
    "SELECT * FROM salespersons WHERE status = 'Active' ORDER BY salespersonsid DESC";
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
  const sql = "SELECT * FROM salespersons WHERE salespersonsid = ?";

  db.query(sql, [Id], (err, result) => {
    if (err) {
      console.error("Error fetching :", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Sales person not found" });
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
    state,
    city,
    pincode,
    experience,
    rerano,
    adharno,
    panno,
    bankname,
    accountholdername,
    accountnumber,
    ifsc,
  } = req.body;

  // Validate required fields
  if (!fullname || !contact || !email) {
    return res
      .status(400)
      .json({ message: "FullName, Contact and Email Required!" });
  }

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

  // First check if salesperson already exists
  const checkSql = `SELECT * FROM salespersons WHERE contact = ? OR email = ?`;

  db.query(checkSql, [contact, email], (checkErr, checkResult) => {
    if (checkErr) {
      console.error("Error checking existing salesperson:", checkErr);
      return res
        .status(500)
        .json({ message: "Database error during validation", error: checkErr });
    }

    if (checkResult.length > 0) {
      return res.status(409).json({
        message: "Sales person already exists with this Contact or Email Id.",
      });
    }

    // Insert new salesperson only if no duplicate found
    const insertSql = `
      INSERT INTO salespersons 
      (fullname, contact, email, address, state, city, pincode, experience, rerano, adharno, panno, 
      bankname, accountholdername, accountnumber, ifsc, adharimage, panimage, reraimage, updated_at, created_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      insertSql,
      [
        fullname,
        contact,
        email,
        address,
        state,
        city,
        pincode,
        experience,
        rerano,
        adharno,
        panno,
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
          console.error("Error inserting Sales Person:", insertErr);
          return res
            .status(500)
            .json({ message: "Database error", error: insertErr });
        }

        res.status(201).json({
          message: "Sales Person added successfully",
          Id: insertResult.insertId,
        });
      }
    );
  });
};

export const edit = (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const {
    fullname,
    contact,
    email,
    address,
    state,
    city,
    pincode,
    experience,
    rerano,
    adharno,
    panno,
    bankname,
    accountholdername,
    accountnumber,
    ifsc,
  } = req.body;
  const salespersonsid = req.params.id;

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

  let updateSql = `UPDATE salespersons SET fullname = ?, contact = ?, email = ?, address = ?, state = ?, city = ?, pincode = ?, experience = ?, 
  rerano = ?, adharno = ?, panno = ?, bankname = ?, accountholdername = ?, accountnumber = ?, ifsc = ?, updated_at = ?`;
  const updateValues = [
    fullname,
    contact,
    email,
    address,
    state,
    city,
    pincode,
    experience,
    rerano,
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

  if (reraImageUrl) {
    updateSql += `, reraimage = ?`;
    updateValues.push(reraImageUrl);
  }

  updateSql += ` WHERE salespersonsid = ?`;
  updateValues.push(salespersonsid);

  db.query(updateSql, updateValues, (updateErr, result) => {
    if (updateErr) {
      console.error("Error updating salesperson:", updateErr);
      return res
        .status(500)
        .json({ message: "Database error during update", error: updateErr });
    }

    res.status(200).json({ message: "Sales person updated successfully" });
  });
};

// **Delete **
export const del = (req, res) => {
  const Id = parseInt(req.params.id);

  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Sales person ID" });
  }

  db.query(
    "SELECT * FROM salespersons WHERE salespersonsid = ?",
    [Id],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Sales person not found" });
      }

      db.query(
        "DELETE FROM salespersons WHERE salespersonsid = ?",
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
            .json({ message: "Sales person deleted successfully" });
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
    return res.status(400).json({ message: "Invalid Sales person ID" });
  }

  db.query(
    "SELECT * FROM salespersons WHERE salespersonsid = ?",
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
        "UPDATE salespersons SET status = ? WHERE salespersonsid = ?",
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
            .json({ message: "Sales person status change successfully" });
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
      return res.status(400).json({ message: "Invalid ID" });
    }

    // Hash the password securely
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Fetch salesperson details first
    db.query(
      "SELECT * FROM salespersons WHERE salespersonsid = ?",
      [Id],
      (err, result) => {
        if (err) {
          console.error("Database error:", err);
          return res
            .status(500)
            .json({ message: "Database error", error: err });
        }

        if (result.length === 0) {
          return res.status(404).json({ message: "Sales Person not found" });
        }

        // Store original email before updating the database
        const email = result[0].email;
        let loginstatus =
          result[0].loginstatus === "Active" ? "Inactive" : "Active";

        // Update salesperson details
        db.query(
          "UPDATE salespersons SET loginstatus = ?, username = ?, password = ? WHERE salespersonsid = ?",
          [loginstatus, username, hashedPassword, Id],
          (updateErr, updateResult) => {
            if (updateErr) {
              console.error("Error updating salesperson:", updateErr);
              return res
                .status(500)
                .json({ message: "Database error", error: updateErr });
            }

            // Send email after successful update
            sendEmail(
              email,
              username,
              password,
              "Sales Person",
              "https://sales.reparv.in"
            );

            res
              .status(200)
              .json({ message: "Sales Person login assigned successfully" });
          }
        );
      }
    );
  } catch (error) {
    console.error("Error assigning login:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
