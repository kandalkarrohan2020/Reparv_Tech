import express from "express";
import { getAllActive, } from "../../controllers/onboardingPartner/builderController.js";

const router = express.Router();

router.get("/active", getAllActive);

export default  router;
