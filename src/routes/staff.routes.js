import express from "express";
import { StaffController } from "../controllers/staff.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();


router.use(protect);

router.get("/", StaffController.getAll);
router.get("/:id", StaffController.getById);
router.post("/", StaffController.createOrUpdate);   // CREATE + UPDATE
router.delete("/:id", StaffController.delete);

export default router;
