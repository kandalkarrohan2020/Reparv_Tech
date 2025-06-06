import express from "express";
import {getData, getCount} from "../../controllers/employee/dashboardController.js";

const router = express.Router();

router.get("/", getData);
router.get("/count", getCount);

export default router;
