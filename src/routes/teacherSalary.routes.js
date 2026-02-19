import express from "express";
import { TeacherSalaryController } from "../controllers/teacherSalary.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.use(protect);

router.post("/teacher-salary", TeacherSalaryController.create);
router.post("/teacher-salary/bulk-mark-paid", TeacherSalaryController.bulkMarkPaid);
router.get("/teacher-salary", TeacherSalaryController.getAll);
router.get("/teacher-salary/:id", TeacherSalaryController.getById);

router.put("/teacher-salary/:id", TeacherSalaryController.update);
router.delete("/teacher-salary/:id", TeacherSalaryController.delete);
// router.get("/teacher-salary/teacher/:teacherId", TeacherSalaryController.getByTeacher);


export default router;
