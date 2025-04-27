import express from "express";
import {getAll, getAllCity, getAllLocation, getLocationByCity, addLike} from "../../controllers/sales/resaleController.js";

const router = express.Router();

router.get("/", getAll);
router.put("/like/:id", addLike);
router.get("/allcity", getAllCity);
router.get("/alllocation", getAllLocation);
router.get("/location/:city", getLocationByCity);
export default  router;