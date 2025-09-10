import express from "express";
import {
  addInWishList,
  getUserWishlist,
} from "../../controllers/customerAppController/propertyController.js";

const router = express.Router();

router.post("/add-wishlist", addInWishList);
router.get("/get-wishlist/:user_id", getUserWishlist);

export default router;
