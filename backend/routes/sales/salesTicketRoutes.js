import express from "express";
import {getAll, getById, add, update, del } from "../../controllers/sales/ticketController.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/add", add);
router.put("/edit/:id", update);
router.delete("/delete/:id", del);

export default router;
