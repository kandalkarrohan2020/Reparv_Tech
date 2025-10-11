import express from "express";

import Razorpay from "razorpay";
import db from "../../config/dbconnect.js";

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//  CREATE SUBSCRIPTION

router.post("/create", async (req, res) => {
  try {
    const { user_id, plan, payment_id } = req.body;
    console.log("Request Body:", req.body);

    const plans = {
      "1M": { amount: 599, months: 1 },
      "3M": { amount: 999, months: 3 },
      "6M": { amount: 1599, months: 6 },
      "12M": { amount: 4999, months: 12 },
    };

    const selected = plans[plan];
    if (!selected) return res.status(400).json({ message: "Invalid plan" });

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + selected.months);

    // Insert into subscriptions table
    await db.query(
      `INSERT INTO subscriptions (territoryid, plan, amount, start_date, end_date, payment_id, status)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [user_id, plan, selected.amount, startDate, endDate, payment_id, "active"]
    );

    //  Update paymentstatus in territoryid table
    await db.query(
      `UPDATE territorypartner
   SET paymentstatus = ?, paymentid = ?, amount = ? 
   WHERE id= ?`,
      ["Success", payment_id, selected.amount, user_id]
    );

    res.json({ success: true, message: "Subscription created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

//  GET A USER’S CURRENT SUBSCRIPTION
router.get("/user/:userId", (req, res) => {
  const { userId } = req.params;

  // Fetch latest subscription
  db.query(
    `SELECT * FROM subscriptions WHERE territoryid = ? ORDER BY created_at DESC LIMIT 1`,
    [userId],
    (err, rows) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ success: false, message: "Server error" });
      }

      if (!rows.length) {
        return res.json({
          success: true,
          active: false,
          message: "No subscription found",
        });
      }

      const sub = rows[0];
      const now = new Date();
      let status = sub.status;

      // Check if subscription expired
      if (new Date(sub.end_date) < now && sub.status !== "expired") {
        db.query(
          `UPDATE subscriptions SET status = 'expired' WHERE id = ?`,
          [sub.id],
          (err) => {
            if (err) console.error("Error updating subscription status:", err);
          }
        );

        status = "expired";

        // Update salesperson table to expired
        db.query(
          `UPDATE territorypartner 
           SET paymentstatus = ?, paymentid = ?, amount = ? 
           WHERE id = ?`,
          ["Expired", null, 0, userId],
          (err) => {
            if (err) console.error("Error updating salesperson:", err);
          }
        );
      } else if (status === "active") {
        // Update salesperson table for active subscription
        db.query(
          `UPDATE territorypartner
           SET paymentstatus = ?, paymentid = ?, amount = ? 
           WHERE id = ?`,
          ["Success", sub.payment_id, sub.amount, userId],
          (err) => {
            if (err) console.error("Error updating territorypartner:", err);
          }
        );
      }

      // Send response
      res.json({
        success: true,
        active: status === "active",
        plan: sub.plan,
        amount: sub.amount,
        start_date: sub.start_date,
        end_date: sub.end_date,
        status,
      });
    }
  );
});

export default router;
