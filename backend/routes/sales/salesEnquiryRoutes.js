import express from "express";
import { add } from "../../controllers/sales/enquiryController.js";

const router = express.Router();

router.post("/add", add);

export default router;