import express from "express";
import { ExpenseController } from "../controllers/expense.controller.js";

const router = express.Router();

router.post("/expenses", ExpenseController.create);
router.get("/expenses", ExpenseController.getAll);
router.put("/expenses/:id", ExpenseController.update);
router.delete("/expenses/:id", ExpenseController.delete);

export default router;
