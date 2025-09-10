import db from "../../config/dbconnect.js";
import cron from "node-cron";

// Runs every midnight
cron.schedule("0 0 * * *", async () => {
  try {
    console.log("⏰ Running reset job for inactive users...");

    // Territory partners
    await db.query(
      `UPDATE territorypartner 
       SET is_active = 'Active', inactive_until = NULL 
       WHERE inactive_until < CURDATE()`
    );
    console.log("✅ Territory partners reset successfully");

    // Salespersons
    await db.query(
      `UPDATE salesperson 
       SET is_active = 'Active', inactive_until = NULL 
       WHERE inactive_until < CURDATE()`
    );
    console.log("✅ Salespersons reset successfully");
  } catch (err) {
    console.error("❌ Error resetting inactive users:", err);
  }
});
