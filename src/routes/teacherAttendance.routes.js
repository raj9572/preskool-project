import express from "express";
import { TeacherAttendanceController } from "../controllers/teacherAttendance.controller.js";
import { TeacherAttendanceMatrixController } from "../controllers/teacherAttendanceMatrix.controller.js";
import { WriteTeacherAttendanceController } from "../controllers/writeTeacherAttendance.controller.js";

const router = express.Router();

// Read today
router.get("/getteacherattendance/today", TeacherAttendanceController.getToday);

// Matrix
router.get("/v1/teacher-attendance/all", TeacherAttendanceMatrixController.getAll);
router.get("/v1/teacher-attendance/by-id/:teacherId", TeacherAttendanceMatrixController.getById);

// Write
router.post("/writeteacherattendance/today", WriteTeacherAttendanceController.writeToday);
router.post("/writeteacherattendance/:date", WriteTeacherAttendanceController.writeForDate);

export default router;
