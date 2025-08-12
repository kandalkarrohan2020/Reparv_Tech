import express from "express";
import {
  getAll,
  getAllCity,
  getAllLocation,
  getLocationsByCityAndCategory,
  fetchAdditionalInfo,
  fetchFlatById,
} from "../../controllers/frontend/propertiesController.js";

const router = express.Router();

router.get("/", getAll);
router.get("/cities", getAllCity);
router.get("/location/all", getAllLocation);
router.get("/location", getLocationsByCityAndCategory);
router.get("/additionalinfo/get/:id", fetchAdditionalInfo);
router.get("/additionalinfo/flat/get/:id", fetchFlatById);
export default router;
