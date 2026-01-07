import express from "express";
import { StaffController } from "../controllers/staff.controller.js";

const router = express.Router();

router.get("/", StaffController.getAll);
router.get("/:id", StaffController.getById);
router.post("/", StaffController.createOrUpdate);   // CREATE + UPDATE
router.delete("/:id", StaffController.delete);

export default router;
