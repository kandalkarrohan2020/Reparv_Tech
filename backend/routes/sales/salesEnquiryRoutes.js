import express from "express";
import { add, addEnquiry } from "../../controllers/sales/enquiryController.js";

const router = express.Router();

router.post("/add", add);
router.post("/add/enquiry", addEnquiry);

export default router;