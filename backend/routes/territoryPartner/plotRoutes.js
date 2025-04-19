import express from "express";
import {getAll, getAllCity, getAllLocation, addLike} from "../../controllers/territoryPartner/plotController.js";

const router = express.Router();

router.get("/", getAll);
router.put("/like/:id", addLike);
router.get("/allcity", getAllCity);
router.get("/alllocation", getAllLocation);
export default  router;