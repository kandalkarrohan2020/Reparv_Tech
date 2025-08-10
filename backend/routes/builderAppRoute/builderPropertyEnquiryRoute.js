import express from "express";
import multer from "multer";
import path from "path";
import { getBookedProperty, getCountData, getEnquiries, } from "../../controllers/builderApp/propertyEnquiryController.js";
import { getPaymentList } from "../../controllers/sales/customerController.js";

const router = express.Router();


router.get("/",getEnquiries);
router.get("/booked-property",getBookedProperty)
router.get('/getCountData',getCountData)
router.get("/payment/get/:id", getPaymentList);

export default router;
