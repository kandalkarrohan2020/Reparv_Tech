import express from "express";
import multer from "multer";
import path from "path";
import {
  getAll,
  getAllActive,
  getById,
  add,
  edit,
  del,
  placeOrder,
  getOrders,
  getAllOrdersByUserId,
  getOrderById,
  addStock,
  getStockList,
  status,
} from "../../controllers/admin/brandAccessoriesController.js";

const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only JPEG, PNG, and JPG images are allowed"));
    }
    cb(null, true);
  },
});

// Products Routes
router.get("/products", getAll);
router.get("/products/active", getAllActive);
router.get("/product/:id", getById);
router.get("/product/stock/list/:id", getStockList);

router.post(
  "/product/add",
  upload.fields([
    { name: "productImage", maxCount: 1 },
  ]),
  add
);

router.put(
  "/product/edit/:id",
  upload.fields([
    { name: "productImage", maxCount: 1 },
  ]),
  edit
);

// ADD Stock
router.post("/product/stock/add/:id", addStock);
// change status
router.put("/product/status/:id", status);
// Delete Product
router.delete("/product/delete/:id", del);

// Order Routes 

// get Routes
router.get("/product/orders/get", getOrders);
router.get("/product/order/:id", getOrderById);
// partner Orders
router.get("/partner/orders", getAllOrdersByUserId);


// place order
router.post("/product/buy/:id", placeOrder);

//router.delete("/product/order/cancel/:id", cancelOrder);
export default router;