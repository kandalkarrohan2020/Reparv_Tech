import express from "express";
import {getAll, getById, del} from "../../controllers/admin/propertytypeController.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
// router.post("/add", propertytypeController.add);
// router.put("/edit/:id", propertytypeController.update);
router.delete("/delete/:id", del);

export default  router;
