import express from "express";
import { acceptAgreement } from "../../controllers/projectPartner/agreementController.js";

const router = express.Router();

router.put("/accept/:id", acceptAgreement);

export default router;