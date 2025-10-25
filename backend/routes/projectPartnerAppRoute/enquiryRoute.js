import express from "express";
import {
  assignEnquiry,
  assignEnquiryToTerritoryPartner,
  getAll,
} from "../../controllers/projectPartnerApp/enquiryController.js";

const router = express.Router();

router.get("/get/:source", getAll);
router.post("/assignEnquiry/:id", assignEnquiry);
router.post("/assignEnquryTerritory/:id", assignEnquiryToTerritoryPartner);
export default router;
