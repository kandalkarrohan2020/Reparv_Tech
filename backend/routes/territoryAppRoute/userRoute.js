import express from "express";
import { getAll } from "../../controllers/territoryApp/UsersController.js";

const router = express.Router();

router.get("/", getAll);

export default router;
