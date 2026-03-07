import express from "express";
import { getClasswiseBudget } from "../controllers/budget.controller.js";

const router = express.Router();

router.get("/classwise-budget", getClasswiseBudget);

export default router;