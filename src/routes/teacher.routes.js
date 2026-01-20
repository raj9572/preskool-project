import express from "express";
import { TeacherController } from "../controllers/teacher.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.get("/teachers", TeacherController.getAll);
router.get("/teachers/:id", TeacherController.getById);

router.post("/teachers/upsert", TeacherController.createOrUpdate);
router.delete("/teachers/:id", TeacherController.delete);

export default router;
