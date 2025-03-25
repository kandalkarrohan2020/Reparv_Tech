import express from "express";
import {getAll, getAllCity, getAllLocation} from "../../controllers/sales/plotController.js";

const router = express.Router();

router.get("/", getAll);
router.get("/allcity", getAllCity);
router.get("/alllocation", getAllLocation);
export default  router;