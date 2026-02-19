import express from "express";
import { PendingFeeController } from "../controllers/pendingfee.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.use(protect);

router.get("/pending-fees", PendingFeeController.getPendingFees);

export default router;
