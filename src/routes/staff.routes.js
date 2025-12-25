import express from "express";
import { StaffController } from "../controllers/staff.controller.js";

const router = express.Router();

router.get("/staff", StaffController.getAll);
router.get("/staff/:id", StaffController.getById);
router.post("/staff", StaffController.createOrUpdate);   // CREATE + UPDATE
router.delete("/staff/:id", StaffController.delete);

export default router;
