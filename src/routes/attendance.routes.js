import express from "express";
import { StudentAttendanceController } from "../controllers/studentAttendance.controller.js";
import { StudentAttendanceMatrixController } from "../controllers/studentAttendanceMatrix.controller.js";
import { AttendanceWriterController } from "../controllers/attendanceWriter.controller.js";
import { AttendanceCountController } from "../controllers/attendanceCount.controller.js";

const router = express.Router();

// Read attendance
router.get("/getstudentattendance", StudentAttendanceController.get);

// Matrix
router.get("/v1/student-attendance/all", StudentAttendanceMatrixController.getAll);
router.get("/v1/student-attendance/by-class/:class", StudentAttendanceMatrixController.getByClass);
router.get("/v1/student-attendance/by-id/:studentId", StudentAttendanceMatrixController.getById);

// Write
router.post("/writestudentattendance/today", AttendanceWriterController.setToday);
router.post("/writestudentattendance/:date", AttendanceWriterController.setForDate);

// Counts
router.get("/v1/attendance-count/today", AttendanceCountController.getToday);
router.get("/v1/attendance-count/by-date", AttendanceCountController.getByDate);

export default router;
