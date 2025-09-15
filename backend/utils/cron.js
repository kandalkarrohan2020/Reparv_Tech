import db from "../config/dbconnect.js";
import cron from "node-cron";
import dayjs from "dayjs";

// 🕛 1. Clean past dates in `territorypartner.inactive_until`
const cleanInactiveUntil = async () => {
  console.log("Running cron job to clean inactive_until...");

  try {
    const [rows] = await db.query(`
      SELECT id, inactive_until 
      FROM territorypartner 
      WHERE inactive_until IS NOT NULL
    `);

    for (const row of rows) {
      let dates = [];

      try {
        dates = JSON.parse(row.inactive_until); // stored as JSON array
      } catch (err) {
        console.error(`Invalid JSON for partner ${row.id}`, err);
        continue;
      }

      if (!Array.isArray(dates)) continue;

      const today = dayjs().format("YYYY-MM-DD");
      const futureDates = dates.filter((d) => d >= today);

      if (futureDates.length !== dates.length) {
        await db.query(
          `UPDATE territorypartner 
           SET inactive_until = ? 
           WHERE id = ?`,
          [futureDates.length ? JSON.stringify(futureDates) : null, row.id]
        );
        console.log(`Cleaned past dates for partner ${row.id}`);
      }
    }

    console.log("✅ inactive_until cleanup done");
  } catch (err) {
    console.error("❌ Error running inactive_until cron job:", err);
  }
};

// 🕐 2. Reject old enquiries after 10 min
export const checkEnquiriesWithTime = () => {
  const selectSql = `
    SELECT teid 
    FROM territoryenquiry
    WHERE status = 'New' 
      AND created_at <= NOW() - INTERVAL 10 MINUTE
  `;

  db.query(selectSql, (err, results) => {
    if (err) {
      console.error("❌ Database Query Error:", err);
      return;
    }

    if (results.length === 0) {
      console.log("No enquiries to reject.");
      return;
    }

    const idsToUpdate = results.map((row) => row.teid);

    const updateSql = `
      UPDATE territoryenquiry
      SET status = 'Rejected'
      WHERE teid IN (?)
    `;

    db.query(updateSql, [idsToUpdate], (updateErr, updateResult) => {
      if (updateErr) {
        console.error("❌ Error updating enquiries:", updateErr);
        return;
      }

      console.log(
        `✅ Successfully rejected ${updateResult.affectedRows} enquiries.`
      );
    });
  });
};

// CRON SCHEDULES
// 🕛 Run every day at midnight
cron.schedule("0 0 * * *", () => {
  cleanInactiveUntil();
});

// 🕐 Run every 1 minute
cron.schedule("* * * * *", () => {
  console.log("Checking and rejecting old enquiries...");
  checkEnquiriesWithTime();
});
