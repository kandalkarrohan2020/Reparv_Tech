import express from "express";
import {getAll, getAllPlans, getById, add, status, del, highlight} from "../../controllers/admin/subscriptionPricingController.js";

const router = express.Router();

router.get("/", getAll);
router.get("/plans/:partnerType", getAllPlans);
router.get("/:id", getById);
router.post("/add", add);
router.put("/edit/:id", add);
router.put("/status/:id", status);
router.put("/highlight/:id", highlight);
router.delete("/delete/:id", del);

export default  router;
