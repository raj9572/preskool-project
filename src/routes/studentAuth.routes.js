import express from "express";
import { StudentController } from "../controllers/studentAuth.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();


router.use(protect);

router.get("/students", StudentController.getAll);

router.get("/students/:id", StudentController.getById);

router.post("/students", StudentController.createAndUpdateStudent);

// router.put("/students/:id", StudentController.createAndUpdateStudent);

router.delete("/students/:id", StudentController.delete);

export default router;
