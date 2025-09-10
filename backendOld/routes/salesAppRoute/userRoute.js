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

router.post("/set-inactive/:id", async (req, res) => {
  const salespersonId = req.params.id;
  const { isAvailable, inactiveUntil } = req.body;

  try {
    await db.query(
      "UPDATE salesperson SET is_active = ?, inactive_until = ? WHERE id = ?",
      [isAvailable, inactiveUntil, salespersonId]
    );

    res.json({ success: true, message: "Availability updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
export default router;
