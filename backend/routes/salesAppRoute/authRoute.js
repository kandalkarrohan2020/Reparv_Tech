import express from "express";
import { loginUser } from "../../controllers/salesApp/ProfileController.js";

const router = express.Router();

router.post("/login", loginUser);

export default router;
