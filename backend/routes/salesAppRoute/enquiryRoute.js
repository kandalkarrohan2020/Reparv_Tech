import express from "express";
import {
  addEnquiry,
  assignEnquiry,
  getAll,
  updateEnquiry,
} from "../../controllers/salesApp/enquiryController.js";
const router = express.Router();

router.post("/assign/to/partner/:id", assignEnquiry);
router.get("/getAll/:id", getAll);
router.post("/add/enquiry", addEnquiry);
router.put("/update/enquiry/:id", updateEnquiry);
export default router;
