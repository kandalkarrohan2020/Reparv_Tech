import express from "express";
import {getAll, getById} from "../../controllers/admin/customerController.js";
const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
export default  router;