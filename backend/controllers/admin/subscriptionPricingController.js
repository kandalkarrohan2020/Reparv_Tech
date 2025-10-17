import db from "../../config/dbconnect.js";
import moment from "moment";

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
  const sql =
    "SELECT * FROM subscriptionPricing WHERE status = 'Active' AND partnerType = ? ORDER BY planDuration";
  db.query(sql, [partnerType], (err, result) => {
    if (err) {
      console.error("Error fetching :", err);
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

// Add Or Update
export const add = (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const { id, partnerType, planDuration, planName, totalPrice, features } =
    req.body;

  //console.log("Received data:", req.body);

  if (!partnerType || !planDuration || !planName || !totalPrice || !features) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (id) {
    // **Update existing Subscription**
    db.query(
      "SELECT * FROM subscriptionPricing WHERE id = ?",
      [id],
      (err, result) => {
        if (err)
          return res
            .status(500)
            .json({ message: "Database error", error: err });
        if (result.length === 0)
          return res
            .status(404)
            .json({ message: "Subscription Plan not found" });

        const updateSQL = `UPDATE subscriptionPricing SET partnerType=?, planDuration=?, planName=?, totalPrice=?, features=?, updated_at=? WHERE id=?`;

        db.query(
          updateSQL,
          [
            partnerType,
            planDuration,
            planName,
            totalPrice,
            features,
            currentdate,
            id,
          ],
          (err) => {
            if (err) {
              console.error("Error updating:", err);
              return res
                .status(500)
                .json({ message: "Database error", error: err });
            }
            return res
              .status(200)
              .json({
                message: "Subscription Pricing Plan updated successfully",
              });
          }
        );
      }
    );
  } else {
    // **Check if Subscription Already Exists**
    db.query(
      "SELECT * FROM subscriptionPricing WHERE planName = ? And planDuration = ?",
      [planName, planDuration],
      (err, result) => {
        if (err)
          return res
            .status(500)
            .json({ message: "Database error", error: err });

        if (result.length > 0) {
          return res
            .status(202)
            .json({ message: "Subscription Pricing Plan already exists!" });
        }

        // **Add new subscription price**
        const insertSQL = `INSERT INTO subscriptionPricing (partnerType, planDuration, planName, totalPrice, features, updated_at, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`;

        db.query(
          insertSQL,
          [
            partnerType,
            planDuration,
            planName,
            totalPrice,
            features,
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
            return res.status(201).json({
              message: "Subscription Plan added successfully",
              Id: result.insertId,
            });
          }
        );
      }
    );
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
