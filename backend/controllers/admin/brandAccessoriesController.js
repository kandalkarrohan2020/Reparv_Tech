import db from "../../config/dbconnect.js";
import moment from "moment";
import path from "path";
import fs from "fs";

export const getAll = (req, res) => {
  const sql = `SELECT
    ba.*,
    ba.productQuantity AS totalQuantity,
    ba.created_at AS productCreatedAt,
    ba.updated_at AS productUpdatedAt,
    bas.*,
    bas.created_at AS stockCreatedAt,
    bas.updated_at AS stockUpdatedAt
    FROM 
    brandAccessories ba
    INNER JOIN
    (
        SELECT *
        FROM brandAccessoriesStock
        WHERE (productId, updated_at) IN (
            SELECT productId, MAX(updated_at)
            FROM brandAccessoriesStock
            GROUP BY productId
        )
    ) bas
    ON
    ba.productId = bas.productId
    ORDER BY
    ba.productId DESC`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching :", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    const formatted = result.map((row) => ({
      ...row,
      productCreatedAt: moment(row.productCreatedAt).format(
        "DD MMM YYYY | hh:mm A"
      ),
      productUpdatedAt: moment(row.productUpdatedAt).format(
        "DD MMM YYYY | hh:mm A"
      ),
      stockCreatedAt: moment(row.stockCreatedAt).format(
        "DD MMM YYYY | hh:mm A"
      ),
      stockUpdatedAt: moment(row.stockUpdatedAt).format(
        "DD MMM YYYY | hh:mm A"
      ),
    }));

    res.json(formatted);
  });
};

// **Fetch All**
export const getAllActive = (req, res) => {
  const sql =
    "SELECT * FROM brandAccessories WHERE status = 'Active' ORDER BY id DESC";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.json(result);
  });
};

// Fetch Stock List
export const getStockList = (req, res) => {
  const Id = parseInt(req.params.id);
  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Product ID" });
  }
  const sql = `SELECT * FROM brandAccessoriesStock 
               WHERE productId = ? 
               ORDER BY created_at
              `;
  db.query(sql, [Id], (err, result) => {
    if (err) {
      console.error("Error fetching:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    const formatted = result.map((row) => ({
      ...row,
      created_at: moment(row.created_at).format("DD MMM YYYY"),
      updated_at: moment(row.updated_at).format("DD MMM YYYY"),
    }));

    res.json(formatted);
  });
};

// **Fetch Single by ID**
export const getById = (req, res) => {
  const Id = parseInt(req.params.id);
  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Product ID" });
  }

  const sql = `
    SELECT 
      brandAccessories.*,
      brandAccessories.productQuantity AS availableQuantity,
      brandAccessories.created_at AS productCreatedAt,
      brandAccessories.updated_at AS productUpdatedAt,
      
      brandAccessoriesStock.*,
      brandAccessoriesStock.created_at AS stockCreatedAt,
      brandAccessoriesStock.updated_at AS stockUpdatedAt

    FROM brandAccessories 
    INNER JOIN brandAccessoriesStock ON brandAccessories.productId = brandAccessoriesStock.productId
    WHERE brandAccessories.productId = ?
  `;

  db.query(sql, [Id], (err, result) => {
    if (err) {
      console.error("Error fetching product:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(result[0]);
  });
};

// ADD Product with One Stock
export const add = (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const {
    productName,
    productDescription,
    productSize,
    gstPercentage,
    productQuantity,
    productPrice,
    sellingPrice,
    lotNumber,
  } = req.body;

  if (
    !productName ||
    !productDescription ||
    !productSize ||
    !productPrice ||
    !gstPercentage ||
    !productQuantity ||
    !sellingPrice ||
    !lotNumber
  ) {
    return res.status(400).json({ message: "All Fields are Required" });
  }

  const gstPrice = (productPrice * gstPercentage) / 100;
  const totalPrice = parseInt(productPrice) + parseInt(gstPrice);

  const productImageFile = req.files?.["productImage"]?.[0];
  const productImageUrl = productImageFile
    ? `/uploads/${productImageFile.filename}`
    : null;

  // Step 1: Insert into brandAccessories
  const insertProductSql = `
    INSERT INTO brandAccessories (productName, productDescription, productQuantity, productImage, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    insertProductSql,
    [
      productName,
      productDescription,
      productQuantity,
      productImageUrl,
      currentdate,
      currentdate,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting into brandAccessories:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      const productId = result.insertId;

      // Step 2: Insert into brandAccessoriesStock
      const insertStockSql = `
        INSERT INTO brandAccessoriesStock 
        (productId, productSize, gstPercentage, productQuantity, productPrice, 
         sellingPrice, lotNumber, totalPrice, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      db.query(
        insertStockSql,
        [
          productId,
          productSize,
          gstPercentage,
          productQuantity,
          productPrice,
          sellingPrice,
          lotNumber,
          totalPrice,
          currentdate,
          currentdate,
        ],
        (err2) => {
          if (err2) {
            console.error("Error inserting into brandAccessoriesStock:", err2);
            return res
              .status(500)
              .json({ message: "Database error", error: err2 });
          }

          return res.status(201).json({
            message: "Product and stock added successfully",
            productId,
          });
        }
      );
    }
  );
};

export const edit = (req, res) => {
  const productId = req.params.id;
  if (!productId) {
    return res.status(400).json({ message: "Invalid Product ID" });
  }

  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const { productName, productDescription } = req.body;

  if (!productName || !productDescription) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Step 1: Fetch existing product image
  db.query(
    "SELECT productImage FROM brandAccessories WHERE productId = ?",
    [productId],
    (err, result) => {
      if (err) {
        console.error("Error fetching product:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "Product not found" });
      }

      const oldImagePath = result[0].productImage;

      // Step 2: Check for new uploaded image
      const productImageFile = req.files?.["productImage"]?.[0];
      const newImageUrl = productImageFile
        ? `/uploads/${productImageFile.filename}`
        : null;

      // Step 3: Build update query
      let updateSql = `
      UPDATE brandAccessories 
      SET productName = ?, productDescription = ?, updated_at = ?
    `;
      const updateValues = [productName, productDescription, currentdate];

      if (newImageUrl) {
        updateSql += `, productImage = ?`;
        updateValues.push(newImageUrl);
      }

      updateSql += ` WHERE productId = ?`;
      updateValues.push(productId);

      // Step 4: Execute update
      db.query(updateSql, updateValues, (updateErr) => {
        if (updateErr) {
          console.error("Error updating product:", updateErr);
          return res.status(500).json({
            message: "Database error during update",
            error: updateErr,
          });
        }

        // Step 5: Delete old image if replaced
        if (newImageUrl && oldImagePath) {
          const fullPath = path.join("public", oldImagePath);
          if (fs.existsSync(fullPath)) {
            fs.unlink(fullPath, (unlinkErr) => {
              if (unlinkErr && unlinkErr.code !== "ENOENT") {
                console.error("Failed to delete old image:", unlinkErr);
              }
            });
          }
        }

        return res
          .status(200)
          .json({ message: "Product updated successfully" });
      });
    }
  );
};

// ADD New Stock
export const addStock = (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const productId = parseInt(req.params.id);
  if (isNaN(productId)) {
    return res.status(400).json({ message: "Invalid Product ID" });
  }

  const {
    productSize,
    gstPercentage,
    productQuantity,
    productPrice,
    sellingPrice,
    lotNumber,
  } = req.body;

  if (
    !productSize ||
    !productPrice ||
    !gstPercentage ||
    !productQuantity ||
    !sellingPrice ||
    !lotNumber
  ) {
    return res.status(400).json({ message: "All Fields are Required" });
  }

  const gstPrice = (productPrice * gstPercentage) / 100;
  const totalPrice = parseInt(productPrice) + parseInt(gstPrice);
  // Step 1: Update productQuantity in the brandAccessories
  const productSql = `UPDATE brandAccessories SET productQuantity = productQuantity + ? WHERE productId = ?`;
  db.query(productSql, [productQuantity, productId], (err2) => {
    if (err2) {
      console.error(
        "Error updating product Quantity in the brandAccessories:",
        err2
      );
      return res.status(500).json({ message: "Database error", error: err2 });
    }

    // Step 2: Insert into brandAccessoriesStock
    const insertStockSql = `
    INSERT INTO brandAccessoriesStock 
    (productId, productSize, gstPercentage, productQuantity, productPrice, 
     sellingPrice, lotNumber, totalPrice, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

    db.query(
      insertStockSql,
      [
        productId,
        productSize,
        gstPercentage,
        productQuantity,
        productPrice,
        sellingPrice,
        lotNumber,
        totalPrice,
        currentdate,
        currentdate,
      ],
      (err2) => {
        if (err2) {
          console.error("Error inserting into brandAccessoriesStock:", err2);
          return res
            .status(500)
            .json({ message: "Database error", error: err2 });
        }

        return res.status(201).json({
          message: "New Stock added successfully",
        });
      }
    );
  });
};

//**Change status */
export const status = (req, res) => {
  const Id = parseInt(req.params.id);
  
  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  db.query("SELECT * FROM brandAccessories WHERE productId = ?", [Id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    
    let status='';
    if (result[0].status === 'Active') {
      status = 'Inactive';
    }else{
      status = 'Active';
    }
    console.log(status);
    db.query("UPDATE brandAccessories SET status = ? WHERE productId = ?", [status, Id], (err,result) => {
      if (err) {
        console.error("Error deleting :", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(200).json({ message: "Product status change successfully" });
    });
  });
};

// Delete
export const del = (req, res) => {
  const Id = parseInt(req.params.id);

  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Product ID" });
  }

  // Step 1: Get the existing image path
  db.query(
    "SELECT productImage FROM brandAccessories WHERE productId = ?",
    [Id],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "Product not found" });
      }

      const imagePath = result[0].productImage;

      // Step 2: Delete the product record
      db.query(
        "DELETE FROM brandAccessories WHERE productId = ?",
        [Id],
        (delErr) => {
          if (delErr) {
            console.error("Error deleting product:", delErr);
            return res
              .status(500)
              .json({ message: "Database error", error: delErr });
          }

          // Step 3: Delete image from disk if exists
          if (imagePath) {
            const fullPath = path.join("public", imagePath);
            if (fs.existsSync(fullPath)) {
              fs.unlink(fullPath, (fsErr) => {
                if (fsErr && fsErr.code !== "ENOENT") {
                  console.error("Error deleting image:", fsErr);
                }
              });
            }
          }

          return res
            .status(200)
            .json({ message: "Product deleted successfully" });
        }
      );
    }
  );
};

// Orders Controllers

// Fetch All Orders
export const getOrders = (req, res) => {
  const sql = `SELECT brandAccessoriesOrders.*,
                      brandAccessories.*
                      FROM brandAccessoriesOrders
                      LEFT JOIN brandAccessories ON brandAccessoriesOrders.productId = brandAccessories.id 
                      ORDER BY brandAccessoriesOrders.created_at DESC`;
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

// Fetch All Orders By Using Partner Aadhaar Id
export const getAllOrdersByUserId = (req, res) => {
  const userId = req.user?.adharId;
  if (!userId) {
    return res.status(400).json({ message: "Unauthorized. Please login!" });
  }

  const sql = `SELECT brandAccessoriesOrders.*,
                      brandAccessories.*
                      FROM brandAccessoriesOrders
                      LEFT JOIN brandAccessories ON brandAccessoriesOrders.productId = brandAccessories.id
                      WHERE brandAccessoriesOrders.ordererId = ?
                      ORDER BY brandAccessoriesOrders.created_at DESC`;
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.json(result);
  });
};

// Fetch Single by ID
export const getOrderById = (req, res) => {
  const Id = parseInt(req.params.id);
  if (!Id) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  const sql = "SELECT * FROM brandAccessoriesOrders WHERE id = ?";

  db.query(sql, [Id], (err, result) => {
    if (err) {
      console.error("Error fetching :", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(result[0]);
  });
};

// Place Order
export const placeOrder = (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");

  const userId = req.user?.adharId;
  if (!userId) {
    return res.status(400).json({ message: "Unauthorized. Please login!" });
  }

  const productId = req.params.id;
  if (!productId) {
    return res.status(400).json({ message: "Invalid Product ID" });
  }

  const { role, orderQuantity } = req.body;

  if (!role || !orderQuantity) {
    return res
      .status(400)
      .json({ message: "Role and order quantity are required!" });
  }

  // Step 1: Fetch Orderer data
  const ordererQuery = `
    SELECT fullname, contact, state, city 
    FROM ${role} 
    WHERE adharno = ?
  `;

  db.query(ordererQuery, [userId], (err, ordererResult) => {
    if (err) {
      console.error("Error fetching partner data:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (ordererResult.length === 0) {
      return res
        .status(404)
        .json({ message: "Partner not found with given role" });
    }

    const { fullname, contact, state, city } = ordererResult[0];

    // Step 2: Generate unique orderId
    const generateOrderId = () => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let orderId = "";
      for (let i = 0; i < 15; i++) {
        orderId += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return orderId;
    };

    const generateUniqueOrderId = (callback) => {
      const newId = generateOrderId();
      db.query(
        "SELECT * FROM brandAccessoriesOrders WHERE orderId = ?",
        [newId],
        (err, results) => {
          if (err) {
            console.error("Error checking orderId uniqueness:", err);
            return res
              .status(500)
              .json({ message: "Database error", error: err });
          }

          if (results.length > 0) {
            generateUniqueOrderId(callback); // retry
          } else {
            callback(newId); // unique
          }
        }
      );
    };

    // Step 3: Insert order
    generateUniqueOrderId((orderId) => {
      const insertQuery = `
        INSERT INTO brandAccessoriesOrders 
        (ordererId, productId, orderId, role, orderQuantity, ordererName, ordererContact, ordererState, ordererCity, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      db.query(
        insertQuery,
        [
          userId,
          productId,
          orderId,
          role,
          orderQuantity,
          fullname,
          contact,
          state,
          city,
          currentdate,
          currentdate,
        ],
        (err, result) => {
          if (err) {
            console.error("Error inserting order:", err);
            return res
              .status(500)
              .json({ message: "Database error", error: err });
          }

          return res.status(201).json({
            message: "Order placed successfully",
            orderId,
          });
        }
      );
    });
  });
};
