import express from "express";
import { submitEmiForm } from "../../controllers/customerAppController/loanEmiController.js";


const router = express.Router();

router.post('/emiform',submitEmiForm)

export default router;
