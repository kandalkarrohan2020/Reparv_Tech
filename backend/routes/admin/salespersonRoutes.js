import express from "express";
import multer from "multer";
import path from "path";
import {
  getAll,
  getAllActive,
  add,
  edit,
  getById,
  status,
  del,
  assignLogin,
  updatePaymentId,
  fetchFollowUpList,
  addFollowUp,
} from "../../controllers/admin/salespersonController.js";

const router = express.Router();

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
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size (5MB)
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only JPEG, PNG, and JPG images are allowed"));
    }
    cb(null, true);
  },
});

router.get("/active", getAllActive); // specific path first
router.get("/get/:id", getById); // more specific dynamic route
router.get("/:partnerlister", getAll);
router.post(
  "/add",
  upload.fields([
    { name: "adharImage", maxCount: 1 },
    { name: "panImage", maxCount: 1 },
    { name: "reraImage", maxCount: 1 },
  ]),
  add
);
router.put(
  "/edit/:id",
  upload.fields([
    { name: "adharImage", maxCount: 1 },
    { name: "panImage", maxCount: 1 },
    { name: "reraImage", maxCount: 1 },
  ]),
  edit
);
router.put("/status/:id", status);
router.put("/update/paymentid/:id", updatePaymentId);
router.get("/followup/list/:id", fetchFollowUpList);
router.post("/followup/add/:id", addFollowUp);
router.put("/assignlogin/:id", assignLogin);
router.delete("/delete/:id", del);

export default router;
