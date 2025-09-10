import express from "express";
import { getAllActive, getForMobile } from "../../controllers/frontend/sliderController.js";

const router = express.Router();

router.get("/", getAllActive);
router.get("/mobile/image", getForMobile);
export default router;
