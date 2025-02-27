import express from "express";
import {getAll, getById, add, status, approve, del} from  "../../controllers/admin/propertyController.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/add", add);
router.put("/edit/:id", add);
router.put("/status/:id", status);
router.put("/approve/:id", approve);
router.delete("/delete/:id", del);

export default router;
