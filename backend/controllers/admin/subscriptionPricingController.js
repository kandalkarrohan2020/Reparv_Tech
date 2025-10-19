import db from "../../config/dbconnect.js";
import moment from "moment";
import fs from "fs";
import path from "path";

// **Fetch All **
export const getAll = (req, res) => {
  const sql = "SELECT * FROM subscriptionPricing ORDER BY id DESC";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching :", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.json(result);
  });
};

// **Fetch All **
export const getAllPlans = (req, res) => {
  const partnerType = req.params.partnerType;

  const sql = `
    SELECT 
      sp.*, 
      rc.redeemCode, 
      rc.discount, 
      rc.startDate, 
      rc.endDate
    FROM subscriptionPricing AS sp
    LEFT JOIN redeem_codes AS rc 
      ON sp.id = rc.planId 
      AND rc.status = 'Active'
    WHERE sp.status = 'Active' 
      AND sp.partnerType = ?
    ORDER BY sp.planDuration;
  `;

  db.query(sql, [partnerType], (err, result) => {
    if (err) {
      console.error("Error fetching plans:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.json(result);
  });
};

// **Fetch Single by ID**
export const getById = (req, res) => {
  const Id = parseInt(req.params.id);
  const sql = "SELECT * FROM subscriptionPricing WHERE id = ?";

  db.query(sql, [Id], (err, result) => {
    if (err) {
      console.error("Error fetching :", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "Subscription Pricing not found" });
    }
    res.json(result[0]);
  });
};

// Add Subscription with 3 images
export const addSubscription = (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const { partnerType, planDuration, planName, totalPrice, features } = req.body;

  if (!partnerType || !planDuration || !planName || !totalPrice || !features) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const firstImage = req.files?.firstImage ? "/uploads/subscriptionBanners/" + req.files.firstImage[0].filename : null;
  const secondImage = req.files?.secondImage ? "/uploads/subscriptionBanners/" + req.files.secondImage[0].filename : null;
  const thirdImage = req.files?.thirdImage ? "/uploads/subscriptionBanners/" + req.files.thirdImage[0].filename : null;

  // Check if plan already exists
  db.query(
    "SELECT * FROM subscriptionPricing WHERE planName = ? AND planDuration = ?",
    [planName, planDuration],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Database error", error: err });
      if (result.length > 0) return res.status(202).json({ message: "Subscription Plan already exists!" });

      const insertSQL = `INSERT INTO subscriptionPricing 
        (partnerType, planDuration, planName, totalPrice, features, firstImage, secondImage, thirdImage, updated_at, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      db.query(
        insertSQL,
        [partnerType, planDuration, planName, totalPrice, features, firstImage, secondImage, thirdImage, currentdate, currentdate],
        (err, result) => {
          if (err) return res.status(500).json({ message: "Database error", error: err });
          return res.status(201).json({ message: "Subscription Plan added successfully", Id: result.insertId });
        }
      );
    }
  );
};

// Update Subscription with 3 images
export const updateSubscription = (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const { partnerType, planDuration, planName, totalPrice, features } = req.body;
  const id = parseInt(req.params.id);

  if (!partnerType || !planDuration || !planName || !totalPrice || !features) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const firstImage = req.files?.firstImage ? "/uploads/subscriptionBanners/" + req.files.firstImage[0].filename : null;
  const secondImage = req.files?.secondImage ? "/uploads/subscriptionBanners/" + req.files.secondImage[0].filename : null;
  const thirdImage = req.files?.thirdImage ? "/uploads/subscriptionBanners/" + req.files.thirdImage[0].filename : null;

  // Fetch existing subscription
  db.query("SELECT * FROM subscriptionPricing WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    if (result.length === 0) return res.status(404).json({ message: "Subscription Plan not found" });

    const oldData = result[0];
    let updateSQL = `UPDATE subscriptionPricing SET partnerType=?, planDuration=?, planName=?, totalPrice=?, features=?, updated_at=?`;
    const params = [partnerType, planDuration, planName, totalPrice, features, currentdate];

    // Replace images if uploaded
    if (firstImage) {
      if (oldData.firstImage) {
        const oldPath = path.join(".", oldData.firstImage);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      updateSQL += `, firstImage=?`;
      params.push(firstImage);
    }
    if (secondImage) {
      if (oldData.secondImage) {
        const oldPath = path.join(".", oldData.secondImage);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      updateSQL += `, secondImage=?`;
      params.push(secondImage);
    }
    if (thirdImage) {
      if (oldData.thirdImage) {
        const oldPath = path.join(".", oldData.thirdImage);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      updateSQL += `, thirdImage=?`;
      params.push(thirdImage);
    }

    updateSQL += ` WHERE id=?`;
    params.push(id);

    db.query(updateSQL, params, (err) => {
      if (err) return res.status(500).json({ message: "Database error", error: err });
      return res.status(200).json({ message: "Subscription Plan updated successfully" });
    });
  });
};

// Add Or Update Subscription with Images
export const addOrUpdateSubscription = (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const { id, partnerType, planDuration, planName, totalPrice, features } = req.body;

  if (!partnerType || !planDuration || !planName || !totalPrice || !features) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Prepare new image filenames (relative paths)
  const firstImage = req.files?.firstImage ? "/uploads/subscriptionBanners/" + req.files.firstImage[0].filename : null;
  const secondImage = req.files?.secondImage ? "/uploads/subscriptionBanners/" + req.files.secondImage[0].filename : null;
  const thirdImage = req.files?.thirdImage ? "/uploads/subscriptionBanners/" + req.files.thirdImage[0].filename : null;

  if (id) {
    // Update existing subscription
    db.query("SELECT * FROM subscriptionPricing WHERE id = ?", [id], (err, result) => {
      if (err) return res.status(500).json({ message: "Database error", error: err });
      if (result.length === 0) return res.status(404).json({ message: "Subscription Plan not found" });

      const oldData = result[0];

      // Build dynamic update query
      let updateSQL = `UPDATE subscriptionPricing SET partnerType=?, planDuration=?, planName=?, totalPrice=?, features=?, updated_at=?`;
      const params = [partnerType, planDuration, planName, totalPrice, features, currentdate];

      // Replace images if new ones are uploaded and delete old files
      if (firstImage) {
        const oldPath = path.join("./uploads/subscriptionBanners/", path.basename(oldData.firstImage));
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        updateSQL += `, firstImage=?`;
        params.push(firstImage);
      }

      if (secondImage) {
        const oldPath = path.join("./uploads/subscriptionBanners/", path.basename(oldData.secondImage));
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        updateSQL += `, secondImage=?`;
        params.push(secondImage);
      }

      if (thirdImage) {
        const oldPath = path.join("./uploads/subscriptionBanners/", path.basename(oldData.thirdImage));
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        updateSQL += `, thirdImage=?`;
        params.push(thirdImage);
      }

      updateSQL += ` WHERE id=?`;
      params.push(id);

      db.query(updateSQL, params, (err) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });
        return res.status(200).json({ message: "Subscription Plan updated successfully" });
      });
    });
  } else {
    // Insert new subscription (with images)
    db.query("SELECT * FROM subscriptionPricing WHERE planName = ? AND planDuration = ?", [planName, planDuration], (err, result) => {
      if (err) return res.status(500).json({ message: "Database error", error: err });
      if (result.length > 0) return res.status(202).json({ message: "Subscription Pricing Plan already exists!" });

      const insertSQL = `INSERT INTO subscriptionPricing 
        (partnerType, planDuration, planName, totalPrice, features, firstImage, secondImage, thirdImage, updated_at, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      db.query(insertSQL, [partnerType, planDuration, planName, totalPrice, features, firstImage, secondImage, thirdImage, currentdate, currentdate], (err, result) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });
        return res.status(201).json({ message: "Subscription Plan added successfully", Id: result.insertId });
      });
    });
  }
};

// **Delete **
export const del = (req, res) => {
  const Id = parseInt(req.params.id);
  console.log(Id);
  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  db.query(
    "SELECT * FROM subscriptionPricing WHERE id = ?",
    [Id],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      if (result.length === 0) {
        return res
          .status(404)
          .json({ message: "Subscription Pricing not found" });
      }

      db.query("DELETE FROM subscriptionPricing WHERE id = ?", [Id], (err) => {
        if (err) {
          console.error("Error deleting :", err);
          return res
            .status(500)
            .json({ message: "Database error", error: err });
        }
        res
          .status(200)
          .json({ message: "Subscription Pricing deleted successfully" });
      });
    }
  );
};

//**Change status */
export const highlight = (req, res) => {
  const Id = parseInt(req.params.id);

  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  db.query(
    "SELECT * FROM subscriptionPricing WHERE id = ?",
    [Id],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      let status = "";
      if (result[0].highlight === "False") {
        status = "True";
      } else {
        status = "False";
      }
      //console.log(status);
      db.query(
        "UPDATE subscriptionPricing SET highlight = ? WHERE id = ?",
        [status, Id],
        (err, result) => {
          if (err) {
            console.error("Error changing highlight :", err);
            return res
              .status(500)
              .json({ message: "Database error", error: err });
          }
          res.status(200).json({
            message: "Subscription Plan highlight successfully",
          });
        }
      );
    }
  );
};

//**Change status */
export const status = (req, res) => {
  const Id = parseInt(req.params.id);

  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  db.query(
    "SELECT * FROM subscriptionPricing WHERE id = ?",
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
        "UPDATE subscriptionPricing SET status = ? WHERE id = ?",
        [status, Id],
        (err, result) => {
          if (err) {
            console.error("Error deleting :", err);
            return res
              .status(500)
              .json({ message: "Database error", error: err });
          }
          res.status(200).json({
            message: "Subscription Pricing status change successfully",
          });
        }
      );
    }
  );
};
