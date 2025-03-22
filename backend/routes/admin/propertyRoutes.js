import express from "express";
import {
  getAll,
  getById,
  add,
  update,
  status,
  approve,
  del,
  addImages,
  editAdditionalInfo,
  additionalInfoAdd,
  propertyInfo,
} from "../../controllers/admin/propertyController.js";
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
router.get("/:id", getById);
router.post("/add", upload.single("image"), add);
router.put("/edit/:id", upload.single("image"), update);
router.put("/status/:id", status);
router.put("/approve/:id", approve);
router.delete("/delete/:id", del);
router.post("/addimages",upload.array("images[]"), addImages);
router.post("/additionalinfoadd", additionalInfoAdd);
router.get("/propertyinfo/:id", propertyInfo);
router.put("/editadditionalinfo/:id", editAdditionalInfo);

export default router;
