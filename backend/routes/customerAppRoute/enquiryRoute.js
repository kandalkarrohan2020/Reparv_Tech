import express from "express";
import { add, getAll, getBookingOnly, getPaymentList, getVisitsOnly } from "../../controllers/customerAppController/enquiryController.js";

const router = express.Router();
router.post('/add',add)
router.get('/get',getAll)
router.get('/getVisitProperty',getVisitsOnly)
router.get('/getBookingProperty',getBookingOnly)
router.get('/payment/get',getPaymentList)
export default router;
