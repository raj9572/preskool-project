import express from "express";
import { SalaryController } from "../controllers/salary.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);


router.get("/salary/all", SalaryController.getAll);
router.get("/salary/teacher/:teacherId", SalaryController.getTeacherById);
router.get("/salary/staff/:staffId", SalaryController.getStaffById);

router.put("/salary/teacher/:id", SalaryController.updateTeacher);
router.put("/salary/staff/:id", SalaryController.updateStaff);

export default router;
