// cronJobs.js
import db from "../config/dbconnect.js";
import cron from "node-cron";
import dayjs from "dayjs";
import fetch from "node-fetch"; // For Node <18; on Node 18+ global fetch works
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import fs from "fs";
import admin from "firebase-admin";

dayjs.extend(utc);
dayjs.extend(timezone);

// 🔔 Territory Partner Firebase app

// utils/cron.js → backend/config/...
const tpServiceAccount = JSON.parse(
  fs.readFileSync(
    new URL(
      "../config/territorypush-firebase-adminsdk-fbsvc-7b5ddd57ed.json",
      import.meta.url
    ),
    "utf8"
  )
);

const spServiceAccount = JSON.parse(
  fs.readFileSync(
    new URL(
      "../config/salespush-3c2e2-firebase-adminsdk-fbsvc-443437baa5.json",
      import.meta.url
    ),
    "utf8"
  )
);

const tpApp = admin.initializeApp(
  {
    credential: admin.credential.cert(tpServiceAccount),
  },
  "territoryPartnerApp"
); // give a name for clarity

// 🔔 Salesperson Firebase app

const spApp = admin.initializeApp(
  {
    credential: admin.credential.cert(spServiceAccount),
  },
  "salespersonApp"
); // must give a unique name

// Send notification to Territory Partner
async function sendTPNotification(token, title, body) {
  if (!token) return; // safety check
  const message = {
    token,
    notification: { title, body },
    android: { priority: "high" },
    apns: { headers: { "apns-priority": "10" } },
  };

  try {
    const response = await tpApp.messaging().send(message);
    console.log("✅ Territory Partner notification sent:", response);
  } catch (err) {
    console.error("❌ Error sending TP notification:", err);
  }
}

// Send notification to Salesperson
async function sendSPNotification(token, title, body) {
  if (!token) return; // safety check
  const message = {
    token,
    notification: { title, body },
    android: { priority: "high" },
    apns: { headers: { "apns-priority": "10" } },
  };

  try {
    const response = await spApp.messaging().send(message);
    console.log("✅ Salesperson notification sent:", response);
  } catch (err) {
    console.error("❌ Error sending SP notification:", err);
  }
}

const cleanInactiveUntil = async () => {
  console.log("Running cron job to clean inactive_until...");

  try {
    const [rows] = await db.query(`
      SELECT id, inactive_until
      FROM territorypartner
      WHERE inactive_until IS NOT NULL
    `);

    const today = dayjs().format("YYYY-MM-DD");

    for (const row of rows) {
      let dates;
      try {
        dates = JSON.parse(row.inactive_until);
      } catch (err) {
        console.error(`Invalid JSON for partner ${row.id}`, err);
        continue;
      }
      if (!Array.isArray(dates)) continue;

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
    if (!results.length) {
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
      console.log(`✅ Rejected ${updateResult.affectedRows} enquiries.`);
    });
  });
};

cron.schedule("0 0 * * *", cleanInactiveUntil);

// 🕐 Run every minute to reject old enquiries
cron.schedule("* * * * *", checkEnquiriesWithTime);
// 🕣 NEW: Run every day at 8:30 AM to alert territory partners for 9–10 slot
const allTimeSlots = [
  "8 - 9AM",
  "9 - 10AM",
  "10 - 11AM",
  "11 - 12PM",
  "12 - 1PM",
  "1 - 2PM",
  "2 - 3PM",
  "3 - 4PM",
  "4 - 5PM",
  "5 - 6PM", // fixed typo 5-6AM → 5-6PM
];

const slotStartAMPM = {
  8: "AM",
  9: "AM",
  10: "AM",
  11: "AM",
  12: "PM",
  1: "PM",
  2: "PM",
  3: "PM",
  4: "PM",
  5: "PM",
};

async function notifySlot(timeSlot) {
  const today = dayjs().tz("Asia/Kolkata").format("D-M-YYYY");
  console.log(`\n🔔 Running notifySlot for "${timeSlot}" on ${today}`);

  const sql = `
  SELECT 
    e.enquirersid,
    e.customer,  
    e.contact,  
    e.location,       
    e.city,          
    tp.onesignalid
  FROM enquirers e
  JOIN territorypartner tp ON tp.id = e.territorypartnerid
  WHERE e.visitdate = ?
    AND e.territorytimeslot = ?
`;

  db.query(sql, [today, timeSlot], async (err, results) => {
    if (err) {
      console.error(`❌ Database Query Error in notifySlot(${timeSlot}):`, err);
      return;
    }

    if (!results.length) {
      console.log(`ℹ️ No enquiries for slot ${timeSlot} on ${today}`);
      return;
    }

    console.log(`📌 Found ${results.length} enquiries for slot ${timeSlot}`);

    for (const row of results) {
      if (!row.onesignalid) {
        console.warn(`⚠️ No FCM token for enquiry ${row.enquirersid}`);
        continue;
      }

      await sendTPNotification(
        row.onesignalid,
        "🔔 Visit Reminder",
        `Hello Territory Partner 👋,

You have a scheduled visit today! 

🗓 Date: ${today}
⏰ Time Slot: ${timeSlot}
👤 Customer: ${row.customer} 
📞 Contact: ${row.contact}
📍 Location: ${row.location}, ${row.city}

Please make sure to follow up on time and provide the best service.

✅ Reminder: Be punctual and prepared for the visit!

Thank you,
Team Reparv`
      );
    }
  });
}

const notifiedSlotsToday = new Set();

// Reset the set at midnight
cron.schedule("0 0 * * *", () => {
  notifiedSlotsToday.clear();
  console.log("🗓 Reset notified slots for the new day");
});
// Notification cron: runs every minute
cron.schedule("* * * * *", () => {
  const now = dayjs().tz("Asia/Kolkata");
  const currentHour = now.hour();
  const currentMinute = now.minute();
  const today = now.format("D-M-YYYY");

  allTimeSlots.forEach((slot) => {
    const [startStr] = slot.split(" - ");
    let hour = parseInt(startStr);
    const ampm = slotStartAMPM[startStr];

    if (ampm === "PM" && hour < 12) hour += 12;
    if (ampm === "AM" && hour === 12) hour = 0;

    // Notification time = 30 min before slot
    const notifyTime = dayjs()
      .hour(hour)
      .minute(0)
      .second(0)
      .subtract(40, "minute");
    const notifyHour = notifyTime.hour();
    const notifyMinute = notifyTime.minute();

    const slotKey = `${today}-${slot}`; // unique key for slot today

    // Only notify if current time matches AND we haven't notified yet
    if (
      currentHour === notifyHour &&
      currentMinute === notifyMinute &&
      !notifiedSlotsToday.has(slotKey)
    ) {
      console.log(
        `🔔 Sending notification for slot "${slot}" at ${now.format("HH:mm")}`
      );
      notifySlot(slot);
      notifiedSlotsToday.add(slotKey); // mark as notified
    }
  });
});

export const checkNewEnquiries = async () => {
  const query = `
    SELECT e.*, t.onesignalId
    FROM enquirers e
    INNER JOIN territorypartner t
      ON e.territorypartnerid = t.id
    WHERE e.territorypartnerid IS NOT NULL
      AND e.status = 'New'
  `;

  db.query(query, async (err, results) => {
    if (err) {
      console.error("❌ Database query error:", err);
      return;
    }

    if (results.length === 0) {
      console.log("No new enquiries for territory partners.");
      return;
    }

    // Use for...of to allow await
    for (const enquiry of results) {
      console.log(
        `Sending notification to OneSignal ID: ${enquiry.onesignalid} for enquiry ID: ${enquiry.id}`
      );

      await sendTPNotification(
        enquiry.onesignalid,
        "🔔 New Enquiry Assigned",
        `Hello Territory Partner 👋,

You have been assigned a new enquiry!  

👤 Customer: ${enquiry.customer} 
📞 Contact: ${enquiry.contact}
📍 Location: ${enquiry.location}, ${enquiry.city}

Please take action on this enquiry: Accept ✅ or Reject ❌. 

Ensure timely follow-up and provide the best service.

Thank you,
Team Reparv`
      );
    }
  });
};

export const sendVisitReminders = async () => {
  const visitDate = new Date().toISOString().split("T")[0];
  const sql = `
    SELECT pf.*, 
           e.territorypartnerid, 
           e.salespersonid, 
           tp.onesignalid AS territoryOneSignalId, 
           sp.onesignalid AS salesOneSignalId,
           e.customer, e.contact, e.location, e.city
    FROM propertyfollowup pf
    JOIN enquirers e ON pf.enquirerid = e.enquirersid
    LEFT JOIN territorypartner tp ON e.territorypartnerid = tp.id
    LEFT JOIN salespersons sp ON e.salespersonid = sp.salespersonsid
    WHERE pf.visitdate = ?
      AND pf.status IN ('Follow Up', 'Visit Scheduled')
      AND (pf.notification_sent IS NULL OR pf.notification_sent = 0)
  `;

  db.query(sql, [visitDate], async (err, results) => {
    if (err) {
      console.error("❌ Database query error:", err);
      return;
    }

    for (const row of results) {
      // Notify Salesperson
      if (row.salesOneSignalId) {
        await sendSPNotification(
          row.salesOneSignalId,
          "🔔 Visit Reminder",
          `Hello Sales Partner 👋,

You have a scheduled visit today!  

👤 Customer: ${row.customer} 
📞 Contact: ${row.contact}
📍 Location: ${row.location}, ${row.city}

Please make sure to follow up on time and provide the best service.

Thank you,
Team Reparv




`
        );
      }
      // Notify Territory Partner
      if (row.territoryOneSignalId) {
        await sendTPNotification(
          row.territoryOneSignalId,
          "🔔 Visit  Reminder",
          `Hello Territory Partner 👋,

You have a scheduled visit today!  

👤 Customer: ${row.customer} 
📞 Contact: ${row.contact}
📍 Location: ${row.location}, ${row.city}

Please make sure to follow up on time and provide the best service.

Thank you,
Team Reparv   


`
        );
      }

      // Mark follow-up as notified
      db.query(
        "UPDATE propertyfollowup SET notification_sent = 1 WHERE followupid = ?",
        [row.followupid],
        (err) => {
          if (err) console.error("❌ Failed to mark notification_sent:", err);
        }
      );
    }
  });
};

// Cron: run every minute, but notifications will only send once per follow-up
cron.schedule("* * * * *", sendVisitReminders);

cron.schedule("* * * * *", checkNewEnquiries);
