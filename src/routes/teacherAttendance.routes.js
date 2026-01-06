import express from "express";
import { TeacherAttendanceController } from "../controllers/teacherAttendance.controller.js";
import { TeacherAttendanceMatrixController } from "../controllers/teacherAttendanceMatrix.controller.js";

const router = express.Router();

// Today attendance
router.get("/getteacherattendance/today", TeacherAttendanceController.getToday);

// Attendance matrix
router.get("/v1/teacher-attendance/all", TeacherAttendanceMatrixController.getAll);
router.get("/v1/teacher-attendance/by-id/:teacherId", TeacherAttendanceMatrixController.getById);

export default router;
