import express from "express";
import {
  getAll,
  getAllCity,
  getAllLocation,
  getLocationsByCityAndCategory,
} from "../../controllers/frontend/propertiesController.js";

const router = express.Router();

router.get("/", getAll);
router.get("/cities", getAllCity);
router.get("/location/all", getAllLocation);
router.get("/location", getLocationsByCityAndCategory);
export default router;
