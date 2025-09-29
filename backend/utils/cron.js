// cronJobs.js
import db from "../config/dbconnect.js";
import cron from "node-cron";
import dayjs from "dayjs";
import fetch from "node-fetch"; // For Node <18; on Node 18+ global fetch works

// 🔔 OneSignal config – set these in your .env

const ONE_SIGNAL_APP_ID = "1627d043-41c5-4f5b-8287-ae817b2c6f00";
const ONE_SIGNAL_API_KEY = "oljiyijn3ecbmmudbktzydsbc";
/* ---------------------------------------------------
   1️⃣  Clean past dates in `territorypartner.inactive_until`
---------------------------------------------------- */
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

/* ---------------------------------------------------
   2️⃣  Reject old enquiries after 10 minutes
---------------------------------------------------- */
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

/* ---------------------------------------------------
   3️⃣  NEW: Send 8:30 AM notifications for today's 9–10 slot
---------------------------------------------------- */
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

// const notifyMorningSlot = (timeSlot) => {
//   // Format today as "DD-M-YYYY" to match your DB
//   const today = dayjs().format("D-M-YYYY"); // e.g., 24-7-2025
//   console.log(`Running notification job for ${timeSlot} slot on ${today}...`);

//   const selectSql = `
//     SELECT e.enquirersid,
//            e.visitdate,
//            e.territorytimeslot,
//            tp.onesignalId
//     FROM enquirers e
//     JOIN territorypartner tp
//       ON tp.id = e.territorypartnerid
//     WHERE e.visitdate = ?
//       AND e.territorytimeslot = ?
//   `;

//   db.query(selectSql, [today, timeSlot], (err, results) => {
//     if (err) {
//       console.error("❌ Database Query Error:", err);
//       return;
//     }

//     if (!results.length) {
//       console.log(`No enquiries for ${timeSlot} slot today.`);
//       return;
//     }

//     results.forEach((row) => {
//       if (!row.onesignalId) return;

//       const payload = {
//         app_id: ONE_SIGNAL_APP_ID,
//         include_player_ids: ["a09306d1-4730-408e-acac-60de221fca35"],
//         headings: { en: "Upcoming Visit Reminder" },
//         contents: {
//           en: `Enquiry #${row.enquirersid} visit scheduled today ${timeSlot}.`,
//         },
//         priority: 10,
//       };

//       fetch("https://api.onesignal.com/notifications", {
//         method: "POST",
//         headers: {
//           Authorization: `Basic ${ONE_SIGNAL_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           console.log(
//             `✅ Notification sent to partner ${row.onesignalId}`,
//             data.id
//           );
//         })
//         .catch((notifyErr) => {
//           console.error(
//             `❌ Error sending notification to ${row.onesignalId}:`,
//             notifyErr
//           );
//         });
//     });
//   });
// };

const notifySlot = (timeSlot) => {
  const today = dayjs().format("D-M-YYYY"); // match DB format
  console.log(`\nRunning notification job for slot "${timeSlot}" on ${today}`);

  const sql = `
    SELECT e.enquirersid, e.visitdate, e.territorytimeslot, tp.onesignalId
    FROM enquirers e
    JOIN territorypartner tp ON tp.id = e.territorypartnerid
    WHERE e.visitdate = ? AND e.territorytimeslot = ?
  `;

  db.query(sql, [today, timeSlot], (err, results) => {
    if (err) return console.error("❌ Database Query Error:", err);
    if (!results.length)
      return console.log(`No enquiries for slot "${timeSlot}" today.`);

    results.forEach((row) => {
      if (!row.onesignalId) {
        console.log(`❌ No OneSignal ID for enquirer ${row.enquirersid}`);
        return;
      }

      console.log(`Sending notification to OneSignal ID: ${row.onesignalId}`);

      //   const payload = {
      //     app_id: ONE_SIGNAL_APP_ID,
      //     included_segments: ["Subscribed Users"], // or ["All"]
      //     headings: { en: "Global Announcement" },
      //     contents: { en: "Hello to every subscribed user!" },
      //     priority: 10,
      //   };

      //   fetch("https://onesignal.com/api/v1/notifications", {
      //     method: "POST",
      //     headers: {
      //       Authorization: `Basic ${"os_v2_app_cyt5aq2byvhvxauhv2axwldpab6xsxxrqhuua5uohzjm3wugk2qj3jtkxy77blh4a6jl4nkf2u45pavvzzy4ikq7sxynxki62dfqdfa"}`, // REST API Key from OneSignal dashboard
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(payload),
      //   })
      //     .then((res) => res.json())
      //     .then((data) => console.log("✅ Notification response:", data))
      //     .catch((err) => console.error("❌ Error sending notification:", err));
      // });

      const url = "https://onesignal.com/api/v1/notifications";

      const payload = {
        app_id: ONE_SIGNAL_APP_ID,
        included_segments: ["3a85a86e-cda2-4c33-bcc2-c89df380d376"], // sends to all subscribed users
        headings: { en: "Global Announcement" },
        contents: {
          en: "Hello! This is a test notification to all subscribed users.",
        },
        priority: 10,
      };

      const options = {
        method: "POST",
        headers: {
          Authorization: `Basic os_v2_app_cyt5aq2byvhvxauhv2axwldpab6xsxxrqhuua5uohzjm3wugk2qj3jtkxy77blh4a6jl4nkf2u45pavvzzy4ikq7sxynxki62dfqdfa`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      };

      (async () => {
        try {
          const response = await fetch(url, options);
          const data = await response.json();
          console.log("✅ Notification response:", data);
        } catch (error) {
          console.error("❌ Error sending notification:", error);
        }
      })();
    });
  });
};

/* ---------------------------------------------------
   CRON SCHEDULES
---------------------------------------------------- */
// 🕛 Run every day at midnight to clean inactive_until
cron.schedule("0 0 * * *", cleanInactiveUntil);

// 🕐 Run every minute to reject old enquiries
cron.schedule("* * * * *", checkEnquiriesWithTime);

// 🕣 NEW: Run every day at 8:30 AM to alert territory partners for 9–10 slot

allTimeSlots.forEach((slot) => {
  const [startStr, endStr] = slot.split(" - "); // e.g., "11", "12PM"
  let hour = parseInt(startStr);

  // Only add 12 for PM if start hour < 12 AND start hour >= 1PM
  if (hour >= 1 && hour <= 5 && endStr.includes("PM")) {
    hour += 12;
  }
  // 12 PM stays 12, all AM slots keep their hour

  const cronHour = hour - 1 >= 0 ? hour - 1 : 23; // 30 min before
  const cronMinute = 30;

  cron.schedule(`${cronMinute} ${cronHour} * * *`, () => {
    notifySlot(slot);
  });

  console.log(
    `Scheduled notification for slot "${slot}" at ${cronHour}:${cronMinute}`
  );
});
// notifySlot("12 - 1AM");
