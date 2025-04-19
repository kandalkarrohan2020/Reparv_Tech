import db from "../config/dbconnect";
import cron from "node-cron";

export const chechEnquiriesWithTime = () => {
  const selectSql = `
      SELECT * FROM territoryenquiry
      WHERE status = 'New' AND created_at <= NOW() - INTERVAL 10 MINUTE;
    `;

  db.query(selectSql, (err, results) => {
    if (err) {
      console.error("Database Query Error:", err);
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
        console.error("Error updating enquiries:", updateErr);
        return;
      }

      console.log(
        `Successfully rejected ${updateResult.affectedRows} enquiries.`
      );
    });
  });
};

// Run every 1 minutes
cron.schedule("* * * * *", () => {
  console.log('Checking and rejecting old enquiries...');
  chechEnquiriesWithTime();
});
