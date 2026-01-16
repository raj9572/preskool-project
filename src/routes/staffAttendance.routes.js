import express from "express";
import { StaffAttendanceMatrixController } from "../controllers/staffAttendanceMatrix.controller.js";
import { WriteStaffAttendanceController } from "../controllers/writeStaffAttendance.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();


router.use(protect);

// Matrix
router.get("/v1/staff-attendance/all", StaffAttendanceMatrixController.getAll);
router.get("/v1/staff-attendance/by-id/:staffId", StaffAttendanceMatrixController.getById);

// Write / Read daily
router.post("/write-staff-attendence/today", WriteStaffAttendanceController.writeToday);
router.get("/write-staff-attendence/today", WriteStaffAttendanceController.getToday);
router.post("/write-staff-attendence/:date", WriteStaffAttendanceController.writeForDate);

export default router;
