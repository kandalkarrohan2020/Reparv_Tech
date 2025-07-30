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
      brandAccessories.productQuantity AS totalQuantity,
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

// Fetch Product Size List
export const getProductSizeList = (req, res) => {
  const Id = parseInt(req.params.id);
  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Product ID" });
  }

  const sql = `SELECT productSize FROM brandAccessoriesStock 
               WHERE productId = ? 
               ORDER BY productSize`;

  db.query(sql, [Id], (err, result) => {
    if (err) {
      console.error("Error fetching:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    // Extract only productSize values and remove duplicates
    const sizeList = [...new Set(result.map((row) => row.productSize))];
    res.json(sizeList);
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

  const gstPrice = (sellingPrice * gstPercentage) / 100;
  const totalPrice = parseInt(sellingPrice) + parseInt(gstPrice);

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

  db.query(
    "SELECT * FROM brandAccessories WHERE productId = ?",
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
        "UPDATE brandAccessories SET status = ? WHERE productId = ?",
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
            .json({ message: "Product status change successfully" });
        }
      );
    }
  );
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

// Fetch All Orders on the Basis of Selected Partner
export const getOrdersOld = (req, res) => {
  const selectedPartner = req.params.role;

  const roleToColumn = {
    "Sales Partner": "salesPartnerId",
    "Onboarding Partner": "onboardingPartnerId",
    "Project Partner": "projectPartnerId",
    "Territory Partner": "territoryPartnerId",
    Promoter: "promoterId",
  };

  const column = roleToColumn[selectedPartner];

  // Build base query
  let sql = `
    SELECT 
      bao.*,
      bao.status AS orderStatus,
      ba.*,
      ba.status AS productStatus
    FROM brandAccessoriesOrders AS bao
    LEFT JOIN brandAccessories AS ba ON bao.productId = ba.productId
  `;

  // Add WHERE clause if valid column found
  if (column) {
    sql += ` WHERE bao.${column} IS NOT NULL`;
  }

  sql += ` ORDER BY bao.created_at DESC`;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error("Error fetching orders:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    const formatted = rows.map((row) => ({
      ...row,
      created_at: moment(row.created_at).format("DD MMM YYYY | hh:mm A"),
      updated_at: moment(row.updated_at).format("DD MMM YYYY | hh:mm A"),
    }));

    res.json(formatted);
  });
};

export const getOrders = (req, res) => {
  const selectedPartner = req.params.role;

  // Map each role to its column name and related table info
  const partnerMap = {
    "Sales Partner": {
      column: "salesPartnerId",
      table: "salespersons",
      alias: "sp",
      joinOn: "sp.salespersonsid = bao.salesPartnerId",
      select:
        "sp.fullname AS partnerName, sp.contact AS partnerContact, sp.state AS partnerState, sp.city AS partnerCity",
    },
    "Onboarding Partner": {
      column: "onboardingPartnerId",
      table: "onboardingpartner",
      alias: "op",
      joinOn: "op.partnerid = bao.onboardingPartnerId",
      select:
        "op.fullname AS partnerName, op.contact AS partnerContact, op.state AS partnerState, op.city AS partnerCity",
    },
    "Project Partner": {
      column: "projectPartnerId",
      table: "projectpartner",
      alias: "pp",
      joinOn: "pp.id = bao.projectPartnerId",
      select:
        "pp.fullname AS partnerName, pp.contact AS partnerContact, pp.state AS partnerState, pp.city AS partnerCity",
    },
    "Territory Partner": {
      column: "territoryPartnerId",
      table: "territorypartner",
      alias: "tp",
      joinOn: "tp.id = bao.territoryPartnerId",
      select:
        "tp.fullname AS partnerName, tp.contact AS partnerContact, tp.state AS partnerState, tp.city AS partnerCity",
    },
    Promoter: {
      column: "promoterId",
      table: "promoter",
      alias: "pr",
      joinOn: "pr.promoterId = bao.promoterId",
      select: "pr.fullname AS partnerName, pr.contact AS partnerContact",
    },
  };

  const partner = partnerMap[selectedPartner];

  // Base select fields
  let selectFields = `
    bao.*,
    bao.status AS orderStatus,
    ba.*,
    ba.status AS productStatus
  `;

  let joins = "";
  let whereClause = "";

  // If matching role is found, build JOIN and WHERE clause
  if (partner) {
    selectFields += `, ${partner.select}`;
    joins += ` LEFT JOIN ${partner.table} AS ${partner.alias} ON ${partner.joinOn}`;
    whereClause = `WHERE bao.${partner.column} IS NOT NULL`;
  }

  const sql = `
    SELECT ${selectFields}
    FROM brandAccessoriesOrders AS bao
    LEFT JOIN brandAccessories AS ba ON bao.productId = ba.productId
    ${joins}
    ${whereClause}
    ORDER BY bao.created_at DESC
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error("Error fetching orders:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    const formatted = rows.map((row) => ({
      ...row,
      created_at: moment(row.created_at).format("DD MMM YYYY | hh:mm A"),
      updated_at: moment(row.updated_at).format("DD MMM YYYY | hh:mm A"),
    }));

    res.json(formatted);
  });
};

// Fetch All Orders By Using Partner Aadhaar Id
export const getAllOrdersByUserId = (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(400).json({ message: "Unauthorized. Please login!" });
  }

  const role = req.params?.role;

  // Allow only specific role fields for safety
  const allowedRoles = [
    "salesPartnerId",
    "territoryPartnerId",
    "onboardingPartnerId",
    "projectPartnerId",
    "promoterId",
  ];

  if (!role || !allowedRoles.includes(role)) {
    return res.status(400).json({ message: "Invalid or missing role in URL" });
  }

  const sql = `
    SELECT 
      bao.*,
      bao.status AS orderStatus,
      bao.created_at AS orderCreatedAt,
      bao.updated_at AS orderUpdatedAt,
      ba.*,
      ba.status AS productStatus,
      ba.created_at AS productCreatedAt,
      ba.updated_at AS productUpdatedAt
    FROM brandAccessoriesOrders AS bao
    LEFT JOIN brandAccessories AS ba 
      ON bao.productId = ba.productId
    WHERE bao.${role} = ?
    ORDER BY bao.created_at DESC
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching orders:", err);
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
      orderCreatedAt: moment(row.orderCreatedAt).format(
        "DD MMM YYYY | hh:mm A"
      ),
      orderUpdatedAt: moment(row.orderUpdatedAt).format(
        "DD MMM YYYY | hh:mm A"
      ),
    }));

    res.json(formatted);
  });
};

// Fetch Single Order by ID
export const getOrderById = (req, res) => {
  const orderId = parseInt(req.params?.id);

  if (isNaN(orderId)) {
    return res.status(400).json({ message: "Invalid order ID" });
  }

  const sql = `
    SELECT 
      bao.*,
      bao.created_at AS orderCreatedAt,
      bao.updated_at AS orderUpdatedAt, 
      bao.status AS orderStatus, 
      ba.*, 
      bao.created_at AS orderCreatedAt,
      ba.updated_at AS productUpdatedAt,
      ba.status AS productStatus
    FROM brandAccessoriesOrders AS bao
    LEFT JOIN brandAccessories AS ba ON bao.productId = ba.productId
    WHERE bao.id = ?
  `;

  db.query(sql, [orderId], (err, result) => {
    if (err) {
      console.error("Error fetching order by ID:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    const formatted = result.map((row) => ({
      ...row,
      productCreatedAt: moment(row.productCreatedAt).format(
        "DD MMM YYYY | hh:mm A"
      ),
      productUpdatedAt: moment(row.productUpdatedAt).format(
        "DD MMM YYYY | hh:mm A"
      ),
      orderCreatedAt: moment(row.orderCreatedAt).format(
        "DD MMM YYYY | hh:mm A"
      ),
      orderUpdatedAt: moment(row.orderUpdatedAt).format(
        "DD MMM YYYY | hh:mm A"
      ),
    }));

    res.json(formatted[0]);
  });
};

// Place Order
export const placeOrder = (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");

  const userId = req.user?.id;
  if (!userId) {
    return res.status(400).json({ message: "Unauthorized. Please login!" });
  }

  const productId = req.params.id;
  if (!productId) {
    return res.status(400).json({ message: "Invalid Product ID" });
  }

  const { role, productSize, orderQuantity, sellingPrice, gstPercentage } =
    req.body;

  if (
    !role ||
    !productSize ||
    !orderQuantity ||
    !sellingPrice ||
    !gstPercentage
  ) {
    return res
      .status(400)
      .json({ message: "Product Size and Order Quantity are required!" });
  }

  const priceWithoutGST = sellingPrice * orderQuantity;
  const billAmount = priceWithoutGST + (priceWithoutGST * gstPercentage) / 100;

  let ordererIdName;
  if (role === "Sales Person") {
    ordererIdName = "salesPartnerId";
  } else if (role === "Onboarding Partner") {
    ordererIdName = "onboardingPartnerId";
  } else if (role === "Project Partner") {
    ordererIdName = "projectPartnerId";
  } else if (role === "Territory Partner") {
    ordererIdName = "territoryPartnerId";
  } else if (role === "Promoter") {
    ordererIdName = "promoterId";
  } else {
    return res.status(400).json({ message: "Invalid role" });
  }

  const generateOrderId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.from({ length: 15 }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join("");
  };

  const generateUniqueOrderId = (callback) => {
    const newId = generateOrderId();
    db.query(
      "SELECT * FROM brandAccessoriesOrders WHERE orderId = ?",
      [newId],
      (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ message: "Database error", error: err });
        if (results.length > 0) {
          generateUniqueOrderId(callback); // Retry
        } else {
          callback(newId);
        }
      }
    );
  };

  generateUniqueOrderId((orderId) => {
    const checkStockQuery = `SELECT productQuantity FROM brandAccessories WHERE productId = ?`;
    db.query(checkStockQuery, [productId], (err, results) => {
      if (err)
        return res.status(500).json({ message: "Database error", error: err });

      if (results.length === 0) {
        return res.status(404).json({ message: "Product not found" });
      }

      const availableQuantity = results[0].productQuantity;
      if (availableQuantity < orderQuantity) {
        return res
          .status(400)
          .json({ message: "Insufficient stock available" });
      }

      const insertQuery = `
        INSERT INTO brandAccessoriesOrders 
        (${ordererIdName}, productId, orderId, productSize, orderQuantity, billAmount, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      db.query(
        insertQuery,
        [
          userId,
          productId,
          orderId,
          productSize,
          orderQuantity,
          billAmount,
          currentdate,
          currentdate,
        ],
        (err) => {
          if (err)
            return res
              .status(500)
              .json({ message: "Database error", error: err });

          const updateQuantityQuery = `
          UPDATE brandAccessories 
          SET productQuantity = productQuantity - ? 
          WHERE productId = ?
        `;
          db.query(updateQuantityQuery, [orderQuantity, productId], (err) => {
            if (err) {
              return res.status(500).json({
                message: "Order placed but failed to update stock",
                orderId,
                warning: true,
              });
            }

            return res.status(201).json({
              message: "Order placed successfully",
              orderId,
            });
          });
        }
      );
    });
  });
};

/* Change Order status */
export const changeOrderStatus = (req, res) => {
  const { selectedStatus } = req.body;
  if (selectedStatus === "") {
    return res.status(400).json({ message: "Please Select Status!" });
  }

  const Id = parseInt(req.params.id);
  //console.log(Id);
  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  db.query(
    "SELECT * FROM brandAccessoriesOrders WHERE id = ?",
    [Id],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      db.query(
        "UPDATE brandAccessoriesOrders SET status = ? WHERE id = ?",
        [selectedStatus, Id],
        (err, result) => {
          if (err) {
            console.error("Error changing Status :", err);
            return res
              .status(500)
              .json({ message: "Database error", error: err });
          }
          res
            .status(200)
            .json({ message: "Order Status change successfully" });
        }
      );
    }
  );
};

/* Cancel Order through Partner */
export const cancelOrderByPartner = (req, res) => {
  const Id = parseInt(req.params.id);
  //console.log(Id);
  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  db.query(
    "SELECT * FROM brandAccessoriesOrders WHERE id = ?",
    [Id],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      db.query(
        "UPDATE brandAccessoriesOrders SET status = ? WHERE id = ?",
        ["Cancelled", Id],
        (err, result) => {
          if (err) {
            console.error("Error Cancellinhg Order :", err);
            return res
              .status(500)
              .json({ message: "Database error", error: err });
          }
          res
            .status(200)
            .json({ message: "Order Cancelled Successfully" });
        }
      );
    }
  );
};
