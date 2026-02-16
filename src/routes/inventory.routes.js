import express from "express";
import { InventoryController } from "../controllers/inventory.controller.js";

const router = express.Router();

router.post("/book-inventory", InventoryController.create);
router.get("/book-inventory", InventoryController.getAll);
router.get("/book-inventory/:id", InventoryController.getById);
router.put("/book-inventory/:id", InventoryController.update);
router.delete("/book-inventory/:id", InventoryController.delete);

export default router;
