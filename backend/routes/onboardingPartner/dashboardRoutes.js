import express from "express";
import {getData, getCount, getProperties} from "../../controllers/onboardingPartner/dashboardController.js";

const router = express.Router();

router.get("/", getData);
router.get("/count", getCount);
// get properties for overview
router.get("/properties", getProperties);

export default router;
