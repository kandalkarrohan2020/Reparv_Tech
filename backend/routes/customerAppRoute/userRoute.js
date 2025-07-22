import express from "express";
import { add } from "../../controllers/customerAppController/userController.js";

const router = express.Router();

router.post("/signup", add);

export default router;
