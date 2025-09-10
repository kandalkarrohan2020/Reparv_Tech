import express from "express";
import {
  getAll,
  changeStatus,
} from "../../controllers/territoryPartner/calenderController.js";

const router = express.Router();

router.get("/meetings", getAll);
router.put("/meeting/status/:id", changeStatus);

export default router;
