import express from "express";
import { acceptAgreement } from "../../controllers/promoter/agreementController.js";

const router = express.Router();

router.put("/accept/:id", acceptAgreement);

export default router;