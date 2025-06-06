import express from "express";
import {
  fetchAdditionalInfo,
  getAll,
  getById,
} from "../../controllers/sales/propertyController.js";

const router = express.Router();


router.get("/", getAll);
router.get("/:id", getById);
router.get("/additionalinfo/get/:id", fetchAdditionalInfo );

export default router;
