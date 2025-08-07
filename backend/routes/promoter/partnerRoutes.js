import express from "express";
import multer from "multer";
import path from "path";
import {
  getAll,
  add,
  edit,
} from "../../controllers/promoter/partnerController.js";

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

router.get("/:paymentStatus", getAll);
router.post(
  "/add",
  upload.fields([
    { name: "adharImage", maxCount: 1 },
    { name: "panImage", maxCount: 1 },
  ]),
  add
);
router.put(
  "/edit/:id",
  upload.fields([
    { name: "adharImage", maxCount: 1 },
    { name: "panImage", maxCount: 1 },
  ]),
  edit
);

export default router;
