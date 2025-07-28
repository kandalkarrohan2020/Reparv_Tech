import express from "express";
import { add, getAll, getVisitsOnly } from "../../controllers/customerAppController/enquiryController.js";

const router = express.Router();
router.post('/add',add)
router.get('/get',getAll)
router.get('/getVisitProperty',getVisitsOnly)

export default router;
