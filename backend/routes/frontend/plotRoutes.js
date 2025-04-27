import express from "express";
import {getAll, getAllCity, getAllLocation, addLike} from "../../controllers/frontend/plotController.js";
import { getLocationByCity } from "../../controllers/frontend/commercialController.js";

const router = express.Router();

router.get("/", getAll);
router.put("/like/:id", addLike);
router.get("/allcity", getAllCity);
router.get("/alllocation", getAllLocation);
router.get("/location/:city", getLocationByCity);
export default  router;