import express from "express";
import { FeeStructureController } from "../controllers/feeStructure.controller.js";

const router = express.Router();

router.post("/fee-structure", FeeStructureController.create);
router.get("/fee-structure", FeeStructureController.getAll);
router.get("/fee-structure/by-class", FeeStructureController.getByClass);
router.put("/fee-structure/:id", FeeStructureController.update);
router.delete("/fee-structure/:id", FeeStructureController.delete);

export default router;
