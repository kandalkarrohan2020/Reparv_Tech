import express from "express";
import { acceptAgreement } from "../../controllers/sales/agreementController.js";

const router = express.Router();

router.put("/accept/:id", acceptAgreement);

export default router;