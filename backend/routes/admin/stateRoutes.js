import express from "express";
import {stateController} from "../../controllers/admin/stateController.js";

const router = express.Router();

router.get("/", stateController.getAll);
// router.get("/:id", stateController.getById);
// router.post("/add", stateController.add);
// router.put("/edit/:id", stateController.add);
// router.put("/status/:id", stateController.status);
// router.delete("/delete/:id", stateController.del);

export default router;
