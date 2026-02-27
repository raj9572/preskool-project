import express from "express";
import {
  createFine,
  getAllFines,
  getFinesByStudent,
  updateFine,
  deleteFine
} from "../controllers/fine.controller.js";

const router = express.Router();

router.post("/fines", createFine);                     // Create fine
router.get("/fines", getAllFines);                     // Get all fines
router.get("/fines/student/:studentId", getFinesByStudent); // Get by student
router.put("/fines/:id", updateFine);                   // Update fine
router.delete("/fines/:id", deleteFine);                // Delete fine

export default router;