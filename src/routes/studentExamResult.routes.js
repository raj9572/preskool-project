import express from "express";
import { StudentExamResultController } from "../controllers/studentExamResult.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.get("/exam-results", StudentExamResultController.getAll);

router.get("/exam-results/by-student/:studentId", StudentExamResultController.getByStudentId);


router.get("/exam-results/:id", StudentExamResultController.getById);

router.post("/exam-results", StudentExamResultController.create);
router.put("/exam-results/:id", StudentExamResultController.update);

router.delete("/exam-results/:id", StudentExamResultController.delete);

export default router;
