import express from "express";
import {rawmaterialController} from "../../controllers/admin/rawmaterialController.js";

const router = express.Router();

router.get("/", rawmaterialController.getAll);
router.get("/:id", rawmaterialController.getById);
router.post("/add", rawmaterialController.add);
router.put("/edit/:id", rawmaterialController.update);
router.delete("/delete/:id", rawmaterialController.del);

export default  router;
