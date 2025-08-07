import express from "express";
import {
  getAll,
} from "../../controllers/promoter/emiController.js";

const router = express.Router();

router.get("/:filterStatus", getAll);

export default router;
