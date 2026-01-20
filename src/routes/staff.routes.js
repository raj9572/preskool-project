import express from "express";
import { StaffController } from "../controllers/staff.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.get("/staffs", StaffController.getAll);
router.get("/staffs/:id", StaffController.getById);

router.post("/staffs/upsert", StaffController.createOrUpdate);
router.delete("/staffs/:id", StaffController.delete);

export default router;
