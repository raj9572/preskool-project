import express from "express";
import { TeacherTimeTableController } from "../controllers/teacherTimeTable.controller.js";

const router = express.Router();

router.post("/teacher-timetable", TeacherTimeTableController.create);
router.get("/teacher-timetable", TeacherTimeTableController.getAll);
router.get("/teacher-timetable/:id", TeacherTimeTableController.getById);
router.get("/teacher-timetable/teacher/:teacherId", TeacherTimeTableController.getByTeacher);
router.put("/teacher-timetable/:id", TeacherTimeTableController.update);
router.delete("/teacher-timetable/:id", TeacherTimeTableController.delete);

export default router;
