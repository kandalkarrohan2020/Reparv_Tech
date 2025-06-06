import express from "express";
import multer from "multer";
import path from "path";
import {
  getAll,
  getById,
  status,
  visitScheduled,
  cancelled,
  followUp,
  token,
  getTerritoryPartners,
  assignEnquiry,
  getPropertyCity,
  getByStatus,
} from "../../controllers/sales/enquirerController.js";

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
router.get("/property/city/:id", getPropertyCity);
router.get("/territorypartner/active/:city", getTerritoryPartners);
router.post("/assign/to/partner/:id", assignEnquiry);
router.put("/status/:id", status);
router.post("/visitscheduled/:id", visitScheduled);
router.post("/followup/:id", followUp);
router.post("/cancelled/:id", cancelled);
router.post("/token/:id", upload.single("paymentimage"), token);
//filter
router.get("/enquirybystatus/:id", getByStatus);

export default router;
