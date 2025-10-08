import express from "express";
import {
  getAll,
  resetPassword,
  sendOtp,
  verifyOtp,
} from "../../controllers/projectPartnerApp/userController.js";

const router = express.Router();

router.get("/", getAll);
router.put("/changepassword", resetPassword);
router.get("/send-otp/:id", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);
export default router;
