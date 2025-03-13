import express from "express";
import {getAll, getById, add, status, del} from "../../controllers/admin/departmentController.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/add", add);
//router.put("/update/:id", update);
router.put("/status/:id", status);
router.delete("/delete/:id", del);

export default router;
