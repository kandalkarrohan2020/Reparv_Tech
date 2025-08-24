import express from "express";
import { getAll } from "../../controllers/builder/propertyController.js";

const router = express.Router();

router.get("/", getAll);

export default router;