import express from "express";
import { TeacherController } from "../controllers/teacher.controller.js";

const router = express.Router();

router.get("/", TeacherController.getAll);
router.get("/:id", TeacherController.getById);
router.post("/", TeacherController.createOrUpdate); // CREATE + UPDATE
router.delete("/:id", TeacherController.delete);

export default router;
