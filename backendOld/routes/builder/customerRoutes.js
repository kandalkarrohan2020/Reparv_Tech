import express from "express";

import {
  getAll,
  getById,
  getPaymentList,
} from "../../controllers/builder/customerController.js";
const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.get("/payment/get/:id", getPaymentList);
export default router;
