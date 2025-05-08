import express from "express";
import {
  getAll,
  getById,
  getImages,
  deleteImages,
  addProperty,
  update,
  status,
  approve,
  del,
  addImages,
  editAdditionalInfo,
  additionalInfoAdd,
  propertyInfo,
  addRejectReason,
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
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only JPEG, PNG, and JPG images are allowed"));
    }
    cb(null, true);
  },
});

router.get("/get/:lister", getAll);
router.get("/:id", getById);
router.get("/images/:id", getImages);
router.delete("/images/delete/:id", deleteImages);

router.post(
  "/add",
  upload.fields([
    { name: "frontView", maxCount: 10 },
    { name: "nearestLandmark", maxCount: 10 },
    { name: "developedAmenities", maxCount: 10 },
    { name: "sideView", maxCount: 10 },
    { name: "hallView", maxCount: 10 },
    { name: "kitchenView", maxCount: 10 },
    { name: "bedroomView", maxCount: 10 },
    { name: "bathroomView", maxCount: 10 },
    { name: "balconyView", maxCount: 10 },
  ]),
  addProperty
);

router.put(
  "/edit/:id",
  upload.fields([
    { name: "frontView", maxCount: 10 },
    { name: "nearestLandmark", maxCount: 10 },
    { name: "developedAmenities", maxCount: 10 },
    { name: "sideView", maxCount: 10 },
    { name: "hallView", maxCount: 10 },
    { name: "kitchenView", maxCount: 10 },
    { name: "bedroomView", maxCount: 10 },
    { name: "bathroomView", maxCount: 10 },
    { name: "balconyView", maxCount: 10 },
  ]),
  update
);
router.put("/status/:id", status);
router.put("/reject/:id", addRejectReason);
router.put("/approve/:id", approve);
router.delete("/delete/:id", del);
router.post("/addimages", upload.array("images[]"), addImages);
router.get("/propertyinfo/:id", propertyInfo);
router.post(
  "/additionalinfoadd",
  upload.fields([
    { name: "owneradhar", maxCount: 1 },
    { name: "ownerpan", maxCount: 1 },
    { name: "schedule", maxCount: 1 },
    { name: "signed", maxCount: 1 },
    { name: "satbara", maxCount: 1 },
    { name: "ebill", maxCount: 1 },
  ]),
  additionalInfoAdd
);
router.put(
  "/editadditionalinfo/:id",
  upload.fields([
    { name: "owneradhar", maxCount: 1 },
    { name: "ownerpan", maxCount: 1 },
    { name: "schedule", maxCount: 1 },
    { name: "signed", maxCount: 1 },
    { name: "satbara", maxCount: 1 },
    { name: "ebill", maxCount: 1 },
  ]),
  editAdditionalInfo
);

export default router;
