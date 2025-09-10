import express from "express";
import multer from "multer";
import path from "path";
import { getAllProperty } from "../../controllers/builderApp/propertyController.js";
import { getById } from "../../controllers/sales/propertyinfoController.js";



const router = express.Router();


router.get("/", getAllProperty);
router.get("/:id",getById)

export default router;
