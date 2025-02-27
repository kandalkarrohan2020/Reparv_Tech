import express from "express";
import {getAll, getById,  status, del} from  "../../controllers/admin/salespersonController.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
// router.post("/add", salesController.add);
// router.put("/edit/:id", salesController.update);
router.put("/status/:id", status);
router.delete("/delete/:id", del);

export default  router;
