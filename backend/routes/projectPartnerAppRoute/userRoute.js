import express from "express";
import {
  getAll,
  getProjectPartner,
  resetPassword,
  sendOtp,
  verifyOtp,
} from "../../controllers/projectPartnerApp/userController.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:city", getProjectPartner);
router.put("/changepassword", resetPassword);
router.get("/send-otp/:id", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);
export default router;
