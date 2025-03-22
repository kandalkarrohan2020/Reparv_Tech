import db from "../../config/dbconnect.js";
import moment from "moment";
import bcrypt from "bcryptjs";

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
  const sql = "SELECT * FROM salespersons WHERE status = 'Active' ORDER BY salespersonsid DESC";
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
    address,
    city,
    experience,
    rerano,
    adharno,
    panno,
  } = req.body;

  if (
    !fullname ||
    !contact ||
    !address ||
    !city ||
    !experience ||
    !rerano ||
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

  const checkSql = `SELECT * FROM salespersons WHERE contact = ? OR adharno = ?`;

  db.query(checkSql, [contact, adharno], (checkErr, checkResult) => {
    if (checkErr) {
      console.error("Error checking existing salesperson:", checkErr);
      return res
        .status(500)
        .json({ message: "Database error during validation", error: checkErr });
    }

    if (checkResult.length > 0) {
      return res
        .status(409)
        .json({
          message:
            "Sales person already exists with this contact or Aadhaar number",
        });
    }
  });
  const sql = `INSERT INTO salespersons (fullname, contact, address, city, experience, rerano, adharno, panno, adharimage, panimage, updated_at, created_at) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [
      fullname,
      contact,
      address,
      city,
      experience,
      rerano,
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
      res
        .status(201)
        .json({
          message: "Sales person added successfully",
          Id: result.insertId,
        });
    }
  );
};

export const edit = (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const {
    fullname,
    contact,
    address,
    city,
    experience,
    rerano,
    adharno,
    panno,
  } = req.body;
  const salespersonsid = req.params.id;

  if (
    !fullname ||
    !contact ||
    !address ||
    !city ||
    !experience ||
    !rerano ||
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

    let updateSql = `UPDATE salespersons SET fullname = ?, contact = ?, address = ?, city = ?, experience = ?, rerano = ?, adharno = ?, panno = ?, updated_at = ?`;
    const updateValues = [
      fullname,
      contact,
      address,
      city,
      experience,
      rerano,
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

    updateSql += ` WHERE salespersonsid = ?`;
    updateValues.push(salespersonsid);

    db.query(updateSql, updateValues, (updateErr, result) => {
      if (updateErr) {
        console.error("Error updating salesperson:", updateErr);
        return res.status(500).json({ message: "Database error during update", error: updateErr });
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

export const assignLogin2 = async (req, res) => {
  const { username, password } = req.body;
  const Id = parseInt(req.params.id);

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Employee ID" });
  }

  db.query("SELECT * FROM salespersons WHERE salespersonsid = ?", [Id], async (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Sales Person not found" });
    } else {
      let loginstatus = result[0].loginstatus === 'Active' ? 'Inactive' : 'Active';

      try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        db.query(
          "UPDATE salespersons SET loginstatus = ?, username = ?, password = ? WHERE salespersonsid = ?",
          [loginstatus, username, hashedPassword, Id],
          (err, updateResult) => {
            if (err) {
              console.error("Error updating login info:", err);
              return res.status(500).json({ message: "Database error", error: err });
            }
            res.status(200).json({ message: "Sales Person login assigned successfully" });
          }
        );
      } catch (hashError) {
        console.error("Password hashing error:", hashError);
        return res.status(500).json({ message: "Error hashing password", error: hashError });
      }
    }
  });
};

export const assignLogin = async (req, res) => {
  
  const { username,password } = req.body;
  const Id = parseInt(req.params.id);
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Employee ID" });
  }

  db.query("SELECT * FROM salespersons WHERE salespersonsid = ?", [Id], (err, result) => {
    if (err) {  
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error", error: err });
    } 
    if (result.length === 0) {      
      return res.status(404).json({ message: "Sales Person not found" });
    } else {
      let loginstatus='';
    if (result[0].loginstatus === 'Active') {
      loginstatus='Inactive';
    }else{
      loginstatus='Active';
    }
    
      db.query("UPDATE salespersons SET loginstatus = ?, username = ?, password = ? WHERE salespersonsid = ?", [loginstatus, username, hashedPassword, Id], (err,result) => {
        if (err) {
          console.error("Error deleting :", err);
          return res.status(500).json({ message: "Database error", error: err });
        }
        res.status(200).json({ message: "Sales Person login assigned successfully" });
      });
    }
  });
};