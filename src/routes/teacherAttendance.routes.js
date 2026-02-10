import express from "express";
import { TeacherAttendanceController } from "../controllers/teacherAttendance.controller.js";
import { TeacherAttendanceMatrixController } from "../controllers/teacherAttendanceMatrix.controller.js";
import { WriteTeacherAttendanceController } from "../controllers/writeTeacherAttendance.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();


router.use(protect);


// Read today
router.get("/getteacherattendance/today", TeacherAttendanceController.getToday);
router.get("/getteacherattendance/monthly-summary", TeacherAttendanceController.getMonthlyAttendanceSummary);
router.get("/getteacherattendance/all-monthly-summary", TeacherAttendanceController.getAllTeachersMonthlySummary);

// Matrix
router.get("/v1/teacher-attendance/all", TeacherAttendanceMatrixController.getAll);
router.get("/v1/teacher-attendance/by-id/:teacherId", TeacherAttendanceMatrixController.getById);

// Write
router.post("/writeteacherattendance/today", WriteTeacherAttendanceController.writeToday);
router.post("/writeteacherattendance/:date", WriteTeacherAttendanceController.writeForDate);

export default router;
