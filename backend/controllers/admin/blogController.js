import db from "../../config/dbconnect.js";
import moment from "moment";
import bcrypt from "bcryptjs";

// **Fetch All **
export const getAll = (req, res) => {
  const sql = "SELECT * FROM blogs ORDER BY created_at DESC";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching :", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    const formatted = result.map((row) => ({
      ...row,
      created_at: moment(row.created_at).format("DD MMM YYYY | hh:mm A"),
      updated_at: moment(row.updated_at).format("DD MMM YYYY | hh:mm A"),
    }));

    res.json(formatted);
  });
};

// **Fetch All**
export const getAllActive = (req, res) => {
  const sql =
    "SELECT * FROM blogs WHERE status = 'Active' ORDER BY id DESC";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.json(result);
  });
};

// **Fetch Single by ID**
export const getById = (req, res) => {
  const Id = parseInt(req.params.id);
  const sql = "SELECT * FROM blogs WHERE id = ?";

  db.query(sql, [Id], (err, result) => {
    if (err) {
      console.error("Error fetching :", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(result[0]);
  });
};

// **Add New **
export const add = (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const { tittle, description, content } = req.body;

  if (!tittle || !description || !content) {
    return res.status(400).json({ message: "All Fields are Required" });
  }

  const blogImageFile = req.files?.["blogImage"]?.[0];
  const blogImageUrl = blogImageFile ? `/uploads/${blogImageFile.filename}` : null;

  const sql = `INSERT INTO blogs (tittle, description, content, image, created_at, updated_at) 
               VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [tittle, description, content, blogImageUrl, currentdate, currentdate],
    (err, result) => {
      if (err) {
        console.error("Error inserting blog:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      return res.status(201).json({
        message: "Blog added successfully",
        blogId: result.insertId,
      });
    }
  );
};

export const edit = (req, res) => {
  const blogId = req.params.id;
  if (!blogId) {
    return res.status(400).json({ message: "Invalid Blog ID" });
  }

  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const { tittle, description, content } = req.body;

  if (!tittle || !description || !content) {
    return res.status(400).json({ message: "all fields are required" });
  }

  // Handle uploaded image
  const blogImageFile = req.files?.["blogImage"]?.[0];
  const blogImageUrl = blogImageFile ? `/uploads/${blogImageFile.filename}` : null;

  // Build update SQL
  let updateSql = `UPDATE blogs SET tittle = ?, description = ?, content = ?, updated_at = ?`;
  const updateValues = [tittle, description, content, currentdate];

  if (blogImageUrl) {
    updateSql += `, blogImage = ?`;
    updateValues.push(blogImageUrl);
  }

  updateSql += ` WHERE id = ?`;
  updateValues.push(blogId);

  db.query(updateSql, updateValues, (err, result) => {
    if (err) {
      console.error("Error updating blog:", err);
      return res.status(500).json({ message: "Database error during update", error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({ message: "Blog updated successfully" });
  });
};


//**Change status */
export const status = (req, res) => {
  const Id = parseInt(req.params.id);
  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Blog ID" });
  }

  db.query(
    "SELECT * FROM blogs WHERE id = ?",
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
        "UPDATE blogs SET status = ? WHERE id = ?",
        [status, Id],
        (err, result) => {
          if (err) {
            console.error("Error deleting :", err);
            return res
              .status(500)
              .json({ message: "Database error", error: err });
          }
          res
            .status(200)
            .json({ message: "Blog status change successfully" });
        }
      );
    }
  );
};

//* ADD Seo Details */
export const seoDetails = (req, res) => {
  const { seoTittle, seoDescription } = req.body;
  if (!seoTittle || !seoDescription) {
    return res.status(401).json({ message: "All Field Are Required" });
  }
  const Id = parseInt(req.params.id);
  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Property ID" });
  }

  db.query(
    "SELECT * FROM blogs WHERE id = ?",
    [Id],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      db.query(
        "UPDATE blogs SET seoTittle = ?, seoDescription = ? WHERE id = ?",
        [seoTittle, seoDescription, Id],
        (err, result) => {
          if (err) {
            console.error("Error While Add Seo Details:", err);
            return res
              .status(500)
              .json({ message: "Database error", error: err });
          }
          res
            .status(200)
            .json({ message: "Seo Details Add successfully" });
        }
      );
    }
  );
};

// **Delete **
export const del = (req, res) => {
  const Id = parseInt(req.params.id);

  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Blog ID" });
  }

  db.query(
    "SELECT * FROM blogs WHERE id = ?",
    [Id],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Blog not found" });
      }

      db.query(
        "DELETE FROM blogs WHERE id = ?",
        [Id],
        (err) => {
          if (err) {
            console.error("Error deleting :", err);
            return res
              .status(500)
              .json({ message: "Database error", error: err });
          }
          res.status(200).json({ message: "Blog deleted successfully" });
        }
      );
    }
  );
};
