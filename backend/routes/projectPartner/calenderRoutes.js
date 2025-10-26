import express from "express";
import { getAll, } from "../../controllers/projectPartner/calenderController.js";

const router = express.Router();

router.get("/meetings", getAll);

export default router;
