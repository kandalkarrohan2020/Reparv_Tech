import express from "express";
import {marketingController} from "../../controllers/admin/marketingController.js";

const router = express.Router();

router.get("/", marketingController.getAll);
router.get("/:id", marketingController.getById);
router.post("/add", marketingController.add);
router.put("/edit/:id", marketingController.update);
router.delete("/delete/:id", marketingController.del);

export default  router;
