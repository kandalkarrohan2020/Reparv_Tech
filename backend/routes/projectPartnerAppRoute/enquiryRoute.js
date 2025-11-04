import express from "express";
import {
  addEnquiry,
  assignEnquiry,
  assignEnquiryToTerritoryPartner,
  assignToReparv,
  getAll,
  getAllCreatedEnquiry,
  getAllDigitalEnquiry,
  getPartnersEnquiry,
  status,
} from "../../controllers/projectPartnerApp/enquiryController.js";

const router = express.Router();
router.post("/add",addEnquiry);
router.get("/get/partnersenquiry/:source/:id",getPartnersEnquiry)
router.get("/get/:source/:id", getAll);
router.get("/enquiry/:id",getAllCreatedEnquiry)
router.post("/assignEnquiry/:id", assignEnquiry);
router.post("/assignEnquryTerritory/:id", assignEnquiryToTerritoryPartner);
router.put("/enquiry/status/:id",status)
router.put("/assign/to/reparv/:id/:enquiryid", assignToReparv);
router.get("/getdigitalenquiry/:id",getAllDigitalEnquiry)
export default router;
