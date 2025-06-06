import express from "express";
import {
  getAll,
  getById,
  status,
  followUp,
  acceptEnquiry, rejectEnquiry
} from "../../controllers/territoryPartner/enquirerController.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.get("/status/:id", status);
router.put("/accept/:id", acceptEnquiry);
router.put("/reject/:id", rejectEnquiry);
router.post("/followup/:id", followUp);

export default router;
