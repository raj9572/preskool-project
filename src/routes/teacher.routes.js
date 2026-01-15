import express from "express";
import { TeacherController } from "../controllers/teacher.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();


router.use(protect);

router.get("/", TeacherController.getAll);
router.get("/:id", TeacherController.getById);
router.post("/", TeacherController.createOrUpdate); // CREATE + UPDATE
router.delete("/:id", TeacherController.delete);

export default router;
