import express from "express";
import {getAll, getAllCity, getAllLocation, getLocationByCity} from "../../controllers/frontend/newprojectController.js";

const router = express.Router();

router.get("/", getAll);
router.get("/allcity", getAllCity);
router.get("/alllocation", getAllLocation);
router.get("/location/:city", getLocationByCity);
export default  router;