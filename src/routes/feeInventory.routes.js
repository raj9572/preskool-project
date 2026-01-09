import express from "express";
import { FeeInventoryController } from "../controllers/feeInventory.controller.js";

const router = express.Router();

router.post("/fee-inventory", FeeInventoryController.create);
router.get("/fee-inventory", FeeInventoryController.getAll);
// router.get("/fee-inventory/:id", FeeInventoryController.getById);
router.put("/fee-inventory/:id", FeeInventoryController.update);
router.delete("/fee-inventory/:id", FeeInventoryController.delete);

export default router;
