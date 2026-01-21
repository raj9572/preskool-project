import express from "express";
import { studentController } from "../controllers/studentAuth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();


router.use(protect);

router.get("/students", studentController.getAll);
router.get("/students/:id", studentController.getById);

router.post("/students/upsert", studentController.createOrUpdate);  

router.delete("/students/:id", studentController.deleteStudentComplete);

export default router;
