import express from "express";
import { acceptAgreement } from "../../controllers/onboardingPartner/agreementController.js";

const router = express.Router();

router.put("/accept/:id", acceptAgreement);

export default router;