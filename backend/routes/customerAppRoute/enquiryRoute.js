import express from "express";
import { add, getAll, getBookingOnly, getVisitsOnly } from "../../controllers/customerAppController/enquiryController.js";
import { getPaymentList } from "../../controllers/sales/customerController.js";

const router = express.Router();
router.post('/add',add)
router.get('/get',getAll)
router.get('/getVisitProperty',getVisitsOnly)
router.get('/getBookingProperty',getBookingOnly)
router.get("/payment/get/:id", getPaymentList);
export default router;
