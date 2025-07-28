import express from "express";
import multer from "multer";
import path from "path";
import { getAll,
     getAllActive,
 } from "../../controllers/customerAppController/trendController.js";


const router = express.Router();

router.get("/", getAll);
router.get("/active", getAllActive);




export default router;