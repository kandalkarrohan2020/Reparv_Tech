import db from "../../config/dbconnect.js";
import moment from "moment";

// **Fetch All **
export const getAll = (req, res) => {
  const sql = "SELECT * FROM redeem_codes ORDER BY id DESC";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching redeem codes:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    // Format dates
    const formattedResult = result.map((row) => ({
      ...row,
      startDate: row.startDate ? moment(row.startDate).format("DD MMM YYYY") : null,
      endDate: row.endDate ? moment(row.endDate).format("DD MMM YYYY") : null,
    }));

    res.status(200).json(formattedResult);
  });
};

// **Fetch Single by ID**
export const getById = (req, res) => {
  const Id = parseInt(req.params.id);
  const sql = "SELECT * FROM redeem_codes WHERE id = ?";

  db.query(sql, [Id], (err, result) => {
    if (err) {
      console.error("Error fetching :", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "discount not found" });
    }
    // Format dates
    const formattedResult = result.map((row) => ({
      ...row,
      startDate: row.startDate ? moment(row.startDate).format("DD MMM YYYY") : null,
      endDate: row.endDate ? moment(row.endDate).format("DD MMM YYYY") : null,
    }));

    res.status(200).json(formattedResult[0]);
  });
};

// Helper to generate 8-char case-sensitive alphanumeric redeem code
const generateRedeemCode = () => {
  const letters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += letters[Math.floor(Math.random() * letters.length)];
  }
  return code;
};

export const addDiscount = (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const { partnerType, planId, discount, startDate, endDate } = req.body;

  if (
    !partnerType ||
    !planId ||
    !discount ||
    !startDate ||
    !endDate
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const redeemCode = generateRedeemCode();

  const insertSQL = `INSERT INTO redeem_codes ( redeemCode, partnerType, planId, discount, startDate, endDate, updated_at, created_at)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    insertSQL,
    [
      redeemCode,
      partnerType,
      planId,
      discount,
      startDate,
      endDate,
      currentdate,
      currentdate,
    ],
    (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          // Retry if duplicate redeemCode
          return addDiscount(req, res);
        }
        return res.status(500).json({ message: "Database error", error: err });
      }

      res.status(201).json({
        message: "Discount added successfully",
        redeemCode,
        discountId: result.insertId,
      });
    }
  );
};

export const updateDiscount = (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const Id = parseInt(req.params.id, 10);
  if(!Id){
    return res.status(400).json({ message: "Invalid Id" });
  }
  const { partnerType, planId, discount, startDate, endDate } = req.body;

  if (
    !partnerType ||
    !planId ||
    !discount ||
    !startDate ||
    !endDate
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  db.query("SELECT * FROM redeem_codes WHERE id = ?", [Id], (err, result) => {
    if (err)
      return res.status(500).json({ message: "Database error", error: err });
    if (result.length === 0)
      return res.status(404).json({ message: "Discount not found" });

    const updateSQL = `UPDATE redeem_codes 
                       SET partnerType=?, planId=?, discount=?, startDate=?, endDate=?, updated_at=?
                       WHERE id=?`;

    db.query(
      updateSQL,
      [
        partnerType,
        planId,
        discount,
        startDate,
        endDate,
        currentdate,
        Id,
      ],
      (err) => {
        if (err)
          return res
            .status(500)
            .json({ message: "Database error", error: err });

        res.status(200).json({ message: "Discount updated successfully" });
      }
    );
  });
};

// **Delete **
export const del = (req, res) => {
  const Id = parseInt(req.params.id);
  console.log(Id);
  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  db.query(
    "SELECT * FROM redeem_codes WHERE id = ?",
    [Id],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      if (result.length === 0) {
        return res
          .status(404)
          .json({ message: "discount not found" });
      }

      db.query("DELETE FROM redeem_codes WHERE id = ?", [Id], (err) => {
        if (err) {
          console.error("Error deleting :", err);
          return res
            .status(500)
            .json({ message: "Database error", error: err });
        }
        res
          .status(200)
          .json({ message: "Discount deleted successfully" });
      });
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
    "SELECT * FROM redeem_codes WHERE id = ?",
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
        "UPDATE redeem_codes SET status = ? WHERE id = ?",
        [status, Id],
        (err, result) => {
          if (err) {
            console.error("Error deleting :", err);
            return res
              .status(500)
              .json({ message: "Database error", error: err });
          }
          res.status(200).json({
            message: "Discount status change successfully",
          });
        }
      );
    }
  );
};
