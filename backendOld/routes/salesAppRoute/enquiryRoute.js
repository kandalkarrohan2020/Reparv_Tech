import express from "express";
import { assignEnquiry, getAll } from "../../controllers/salesApp/enquiryController.js";
const router = express.Router();

router.post("/assign/to/partner/:id", assignEnquiry);
router.get('/getAll/:id',getAll)
export default router;
