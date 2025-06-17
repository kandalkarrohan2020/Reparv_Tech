import express from "express";
import {getAll,getById} from "../../controllers/frontend/blogController.js";

const router = express.Router();

router.get("/", getAll);
router.get("/details/:id", getById);
export default  router;