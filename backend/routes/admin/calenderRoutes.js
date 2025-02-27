const express = require("express");
import { calenderController } from "../../controllers/admin/calenderController.js";

const router = express.Router();

router.get("/", calenderController.getAll);
router.get("/:id", calenderController.getById);
router.post("/add", calenderController.add);
router.put("/edit/:id", calenderController.update);
router.delete("/delete/:id", calenderController.del);

export default router;
