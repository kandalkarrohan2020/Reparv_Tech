import express from "express";
import {getAll, getById, del} from "../../controllers/employee/enquirerController.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
// router.post("/add", enquiryController.add);
// router.put("/edit/:id", enquiryController.update);
router.delete("/delete/:id", del);

export default router;
