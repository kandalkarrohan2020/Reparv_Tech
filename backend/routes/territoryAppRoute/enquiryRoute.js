import express from "express";
import {
  addEnquiry,
  oldaddEnquiry,
  updateEnquiry,
} from "../../controllers/territoryApp/enquiryController.js";

const router = express.Router();

router.post("/add/enquiry",oldaddEnquiry);
router.post("/add/:id",addEnquiry)
router.put("/update/enquiry/:id", updateEnquiry);
export default router;
