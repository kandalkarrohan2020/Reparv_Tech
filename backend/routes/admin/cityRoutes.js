import express from "express";
import {cityController} from "../../controllers/admin/cityController.js";

const router = express.Router();

//router.get("/", roleController.getAll);
router.get("/:id", cityController.getById);
// router.post("/add", roleController.add);
// router.put("/edit/:id", roleController.add);
// router.put("/status/:id", roleController.status);
// router.delete("/delete/:id", roleController.del);

export default  router;
