import express from "express";
import { getAll, } from "../../controllers/employee/calenderController.js";

const router = express.Router();

router.get("/meetings", getAll);

export default router;
