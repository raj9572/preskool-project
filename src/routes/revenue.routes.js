import express from "express";
import { RevenueController } from "../controllers/revenue.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.get("/revenue/session-revenue", RevenueController.getRevenueSummary);

export default router;
