import express from "express";
import {
  addEnquiry,
  assignEnquiry,
  assignEnquiryToTerritoryPartner,
  getAll,
  getAllCreatedEnquiry,
  status,
} from "../../controllers/projectPartnerApp/enquiryController.js";

const router = express.Router();
router.post("/add",addEnquiry);
router.get("/get/:source/:id", getAll);
router.get("/enquiry/:id",getAllCreatedEnquiry)
router.post("/assignEnquiry/:id", assignEnquiry);
router.post("/assignEnquryTerritory/:id", assignEnquiryToTerritoryPartner);
router.put("/enquiry/status/:id",status)
export default router;
