import express from "express";

import {
  getAll,
} from "../../controllers/promoter/customerController.js";
const router = express.Router();

router.get("/", getAll);

export default router;
