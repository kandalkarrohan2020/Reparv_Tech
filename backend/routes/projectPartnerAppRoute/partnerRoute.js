import express from "express";
import {
  getAllSalesPartner,
  getAllTerritoryPartner,
} from "../../controllers/projectPartnerApp/partnerController.js";

const router = express.Router();

router.get("/salespartner", getAllSalesPartner);
router.get("/territorypartner", getAllTerritoryPartner);

export default router;
