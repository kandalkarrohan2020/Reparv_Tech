import express from "express";
import {getCount, getProperties} from "../../controllers/guestUser/dashboardController.js";

const router = express.Router();

router.get("/count", getCount);
// get properties for overview
router.get("/properties", getProperties);

export default router;
