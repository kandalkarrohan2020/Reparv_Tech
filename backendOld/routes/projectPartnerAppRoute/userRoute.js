import express from "express";
import { getAll } from "../../controllers/projectPartnerApp/userController.js";



const router = express.Router();

router.get("/", getAll);


export default router;
