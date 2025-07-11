import express from "express";
import {
  add,
  addLike,
  getAll,
  getAllByUser,
} from "../../controllers/salesApp/PostController.js";
import multer from "multer";
import path from "path";

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
  limits: { fileSize: 5 * 1024 * 1024 }, // ✅ Limit file size (5MB)
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only JPEG, PNG, and JPG images are allowed"));
    }
    cb(null, true);
  },
});
router.get("/", getAll);
router.get("/getUserPosts", getAllByUser);
router.post("/add", upload.single("image"), add);
router.put("/addlike", addLike);

export default router;
