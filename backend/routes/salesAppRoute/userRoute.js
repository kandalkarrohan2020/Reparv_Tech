import express from "express";
import { getAll } from "../../controllers/salesApp/UsersController.js";
import db from "../../config/dbconnect.js";
const router = express.Router();

router.get("/", getAll);
// POST /api/follow
router.post("/follow", (req, res) => {
  const { follower_id, following_id } = req.body;
  console.log(follower_id, "ff", following_id);

  if (!follower_id || !following_id) {
    return res.status(400).json({ error: "Missing follower or following ID" });
  }

  db.query(
    "SELECT * FROM salesFollowers WHERE follower_id = ? AND following_id = ?",
    [follower_id, following_id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: "Database error" });

      if (rows.length > 0) {
        return res
          .status(409)
          .json({ message: "Already following this salesperson" });
      }

      db.query(
        "INSERT INTO salesFollowers (follower_id, following_id, created_at) VALUES (?, ?, NOW())",
        [follower_id, following_id],
        (insertErr) => {
          if (insertErr)
            return res.status(500).json({ error: "Insert failed" });
          res.json({ status: "Followed successfully" });
        }
      );
    }
  );
});

router.post("/unfollow", (req, res) => {
  const { follower_id, following_id } = req.body;
  console.log(follower_id, "unfollowing", following_id);

  if (!follower_id || !following_id) {
    return res.status(400).json({ error: "Missing follower or following ID" });
  }

  db.query(
    "DELETE FROM salesFollowers WHERE follower_id = ? AND following_id = ?",
    [follower_id, following_id],
    (err, result) => {
      if (err) {
        console.error("Unfollow error:", err);
        return res.status(500).json({ error: "Database error" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Not following this user" });
      }

      res.status(200).json({ status: "Unfollowed successfully" });
    }
  );
});

// GET /api/:id/followers
router.get("/:id/followers", (req, res) => {
  const id = req.params.id;
  console.log(id, "ddd");

  db.query(
    `
    SELECT s.salespersonsid, s.fullname, s.userimage
    FROM salesFollowers f
    JOIN salespersons s ON s.salespersonsid = f.follower_id
    WHERE f.following_id = ?
  `,
    [id],
    (err, result) => {
      if (err) {
        console.error("Error fetching followers:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      res.json(result);
    }
  );
});

// GET /api/:id/following
router.get("/:id/following", async (req, res) => {
  const id = req.params.id;
  //   console.log(id,'ddffd');
  db.query(
    `
    SELECT s.salespersonsid, s.fullname, s.userimage
    FROM salesFollowers f
    JOIN salespersons s ON s.salespersonsid = f.following_id
    WHERE f.follower_id = ?`,
    [id],
    (err, result) => {
      if (err) {
        console.error("Error fetching followers:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      console.log(result);

      res.json(result);
    }
  );
});

// GET /salesapp/user/:id/following-posts
router.get("/:id/following-posts", (req, res) => {
  const userId = req.params.id;
  console.log(userId, "xx");

  const query = `
    SELECT
      p.postId,
      p.userId,
      p.postContent,
      p.image,
      p.likes,
      p.created_at,
      u.fullname,
      u.city,
      u.userimage
    FROM 
      salespersonposts p
    JOIN 
      salesFollowers f ON f.following_id = p.userId
    LEFT JOIN 
      salespersons u ON p.userId = u.salespersonsid
    WHERE 
      f.follower_id = ?
    ORDER BY 
      p.created_at DESC
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching following posts:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json(results);
  });
});

// Update availability

// router.post("/set-inactive/:id", async (req, res) => {
//   const salespersonId = req.params.id;
//   const { isAvailable, inactiveUntil } = req.body;

//   try {
//     await db.query(
//       "UPDATE salesperson SET is_active = ?, inactive_until = ? WHERE id = ?",
//       [isAvailable, inactiveUntil, salespersonId]
//     );

//     res.json({ success: true, message: "Availability updated successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

router.post("/set-inactive/:id", async (req, res) => {
  const Id = req.params.id;
  const { isAvailable, inactiveDates } = req.body; // expect array of dates

  try {
    await db.query(
      "UPDATE salespersons SET is_active = ?, inactive_until = ? WHERE salespersonsid = ?",
      [isAvailable, JSON.stringify(inactiveDates), Id]
    );

    res.json({ success: true, message: "Availability updated successfully" });
  } catch (err) {
    console.error("Error updating salesperson availability:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET /unavailable-dates/:id
router.get("/unavailable-dates/:id", async (req, res) => {
  const salespersonId = req.params.id;

  try {
    const [rows] = await db.query(
      "SELECT inactive_until FROM salesperson WHERE salespersonsid = ?",
      [salespersonId]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Salesperson not found" });
    }

    let unavailableDates = [];
    if (rows[0].inactive_until) {
      try {
        unavailableDates = JSON.parse(rows[0].inactive_until); // parse JSON array
      } catch (err) {
        console.error("Invalid JSON in inactive_until:", err);
      }
    }

    res.json({ success: true, unavailableDates });
  } catch (err) {
    console.error("❌ Error fetching unavailable dates:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// DELETE /salesperson/:id/unavailable-dates
router.delete("/delete/unavailable-dates/:id", async (req, res) => {
  const salespersonId = req.params.id;
  const { date } = req.body; // single date to remove, e.g., "2025-09-12"

  if (!date) {
    return res
      .status(400)
      .json({ success: false, message: "Provide a date to remove" });
  }

  try {
    // Find the index of the date in the JSON array
    const [rows] = await db.query(
      `SELECT JSON_SEARCH(inactive_until, 'one', ?) AS path
       FROM salesperson
       WHERE salespersonsid = ?`,
      [date, salespersonId]
    );

    const path = rows[0]?.path;

    if (!path) {
      return res.json({ success: false, message: "Date not found" });
    }

    // Remove the date from the JSON array
    await db.query(
      `UPDATE salesperson
       SET inactive_until = JSON_REMOVE(inactive_until, ?)
       WHERE salespersonsid = ?`,
      [path, salespersonId]
    );

    res.json({ success: true, message: "Date removed successfully" });
  } catch (err) {
    console.error("❌ Error removing date:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
export default router;
