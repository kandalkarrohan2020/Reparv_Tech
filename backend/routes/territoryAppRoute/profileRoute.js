import express from "express";
import {
  resetPassword,
  sendOtp,
  sendRequest,
  verifyOtp,
} from "../../controllers/territoryApp/ProfileController.js";

const router = express.Router();

router.get("/send-otp/:id", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);
router.post("/partnerchange/request",sendRequest)

export default router;
