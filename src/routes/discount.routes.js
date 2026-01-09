import express from "express";
import { DiscountController } from "../controllers/discount.controller.js";

const router = express.Router();

router.post("/discount", DiscountController.create);
router.get("/discount", DiscountController.getAll);
router.get("/discount/:id", DiscountController.getById);
router.put("/discount/:id", DiscountController.update);
router.delete("/discount/:id", DiscountController.delete);

export default router;
