import express from "express";
import { getAll, getById, add, update, status, del } from "../../controllers/admin/testimonialController.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/add", add);
router.put("/edit/:id", update);
router.put("/status/:id", status);
router.delete("/delete/:id", del);

export default  router;
