import express from "express";

import db from "../../config/dbconnect.js";
import { getAll } from "../../controllers/builderApp/userController.js";
const router = express.Router();
router.get("/",getAll)
//new onw
router.post("/add/follow", (req, res) => {
  const { follower_id, follower_type, following_id, following_type } = req.body;
console.log('dd', follower_id, follower_type, following_id, following_type );

  if (!follower_id || !following_id || !follower_type || !following_type) {
    return res.status(400).json({ error: "Missing follow data" });
  }

  const sql = `
    INSERT INTO userFollowers (follower_id, follower_type, following_id, following_type)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [follower_id, follower_type, following_id, following_type],
    (err) => {
      if (err) {
        console.error("Follow error:", err);
        return res.status(500).json({ error: "Database error" });
      }
console.log("Followed successfully");

      res.json({ status: "Followed successfully" });
    }
  );
});

router.post("/add/unfollow", (req, res) => {
  const { follower_id, follower_type, following_id, following_type } = req.body;
console.log( follower_id, follower_type, following_id, following_type );

  if (!follower_id || !following_id || !follower_type || !following_type) {
    return res.status(400).json({ error: "Missing unfollow data" });
  }

  const sql = `
    DELETE FROM userFollowers
    WHERE follower_id = ? AND follower_type = ? AND following_id = ? AND following_type = ?
  `;

  db.query(
    sql,
    [follower_id, follower_type, following_id, following_type],
    (err, result) => {
      if (err) {
        console.error("Unfollow error:", err);
        return res.status(500).json({ error: "Database error" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Not following this user" });
      }

      res.json({ status: "Unfollowed successfully" });
    }
  );
});

router.get("/add/:id/:type/followers", (req, res) => {
  const { id, type } = req.params;

  // Map user type to table and ID field
 const tableMap = {
  sales: { table: "salespersons", idField: "salespersonsid", nameField: "fullname" },
  territory: { table: "territorypartner", idField: "id", nameField: "fullname" },
  onboarding: { table: "onboardingpartner", idField: "partnerid", nameField: "fullname" },
  projectpartner: { table: "projectpartner", idField: "id", nameField: "fullname" },
  builder: { table: "builders", idField: "builderid", nameField: "contact_person" }, // <-- correct column
};


  const userMeta = tableMap[type];
  if (!userMeta) {
    return res.status(400).json({ error: "Invalid user type" });
  }

  const sql = `
  SELECT u.${userMeta.idField} AS id, u.${userMeta.nameField} AS fullname, u.userimage
  FROM userFollowers f
  JOIN ${userMeta.table} u 
    ON u.${userMeta.idField} = f.following_id
  WHERE f.following_id = ? AND f.following_type = ?
`;


  db.query(sql, [id, type], (err, results) => {
    if (err) {
      console.error("Fetch followers error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    res.json(results);
  });
});

router.get("/add/:id/:type/following", (req, res) => {
  const { id, type } = req.params;
  console.log(id, type, "ggggggggggggggg");

  // Map user type to table and ID field
 const tableMap = {
  sales: { table: "salespersons", idField: "salespersonsid", nameField: "fullname" },
  territory: { table: "territorypartner", idField: "id", nameField: "fullname" },
  onboarding: { table: "onboardingpartner", idField: "partnerid", nameField: "fullname" },
  projectpartner: { table: "projectpartner", idField: "id", nameField: "fullname" },
  builder: { table: "builders", idField: "builderid", nameField: "contact_person" }, 
};


  const userMeta = tableMap[type];
  if (!userMeta) {
    console.log("Invalid user type");

    return res.status(400).json({ error: "Invalid user type" });
  }

 const sql = `
  SELECT u.${userMeta.idField} AS id, u.${userMeta.nameField} AS fullname, u.userimage
  FROM userFollowers f
  JOIN ${userMeta.table} u 
    ON u.${userMeta.idField} = f.following_id
  WHERE f.follower_id = ? AND f.follower_type = ?
`;


  db.query(sql, [id, type], (err, results) => {
    if (err) {
      console.error("Fetch following error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    res.json(results);
  });
});;


router.get("/add/:id/:type/following-posts", (req, res) => {
  const { id, type } = req.params;

  const postMap = {
    sales: {
      postTable: "salespersonposts",
      userTable: "salespersons",
      userIdField: "salespersonsid",
    },
    territory: {
      postTable: "territorypartnerposts",
      userTable: "territorypartner",
      userIdField: "territorypartnerid",
    },
    // onboarding: {
    //   postTable: 'onboardingposts',
    //   userTable: 'onboardingpartner',
    //   userIdField: 'partnerid',
    // },
    // projectpartner: {
    //   postTable: 'projectpartnerposts',
    //   userTable: 'projectpartner',
    //   userIdField: 'id',
    // },
  };

  const map = postMap[type];
  if (!map) return res.status(400).json({ error: "Invalid user type" });

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
    FROM ${map.postTable} p
    JOIN userFollowers f ON f.following_id = p.userId AND f.following_type = ?
    JOIN ${map.userTable} u ON p.userId = u.${map.userIdField}
    WHERE f.follower_id = ? AND f.follower_type = ?
    ORDER BY p.created_at DESC
  `;

  db.query(query, [type, id, type], (err, result) => {
    if (err) {
      console.error("Fetch following posts error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    res.json(result);
  });
});

// GET /api/:id/followers
router.get("/:id/followers", (req, res) => {
  const id = req.params.id;
  console.log(id, "ddd");

  db.query(
    `
    SELECT s.builderid, s.contact_person, s.userimage
    FROM userfollowers f
    JOIN builders s ON s.builderid = f.follower_id
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
    SELECT s.builderid, s.contact_person, s.userimage
    FROM userfollowers f
    JOIN builders s ON s.builderid = f.following_id
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



export default router;
