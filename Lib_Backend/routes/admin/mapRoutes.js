import express from "express";
import { getAllCity, getCityWiseProperties } from "../../controllers/admin/mapController.js";

const router = express.Router();

router.get("/properties/cities/", getAllCity);
router.get("/properties/get/:city", getCityWiseProperties);

export default  router;
