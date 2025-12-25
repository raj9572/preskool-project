import express from "express";
import { StudentController } from "../controllers/studentAuth.controller.js";

const router = express.Router();

router.get("/students", StudentController.getAll);

router.get("/students/:id", StudentController.getById);

router.post("/students", StudentController.createAndUpdateStudent);

// router.put("/students/:id", StudentController.createAndUpdateStudent);

router.delete("/students/:id", StudentController.delete);

export default router;
