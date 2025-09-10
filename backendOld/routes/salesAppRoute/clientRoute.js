import express from "express";
import { addClient } from "../../controllers/salesApp/ClientController.js";
import {
  resetPassword,
  sendOtp,
  verifyOtp,
} from "../../controllers/salesApp/ProfileController.js";

const router = express.Router();

router.post("/add", addClient);
router.get("/send-otp/:id", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

export default router;
