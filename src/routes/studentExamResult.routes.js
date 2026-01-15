import express from "express";
import { StudentExamResultController } from "../controllers/studentExamResult.controller.js";

const router = express.Router();

router.post("/student-exam-result", StudentExamResultController.create);
router.get("/student-exam-result", StudentExamResultController.getAll);
router.get("/student-exam-result/:id", StudentExamResultController.getById);
router.get("/student-exam-result/student/:studentId", StudentExamResultController.getByStudent);
router.put("/student-exam-result/:id", StudentExamResultController.update);
router.delete("/student-exam-result/:id", StudentExamResultController.delete);

export default router;
