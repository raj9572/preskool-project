import express from "express";
import { StudentController } from "../controllers/studentAuth.controller.js";

const router = express.Router();

router.get("/students", StudentController.getAll);
router.get("/students/:id", StudentController.getById);
router.post("/students", StudentController.save);       // CREATE
router.put("/students/:id", StudentController.save);    // UPDATE
router.delete("/students/:id", StudentController.delete);


// import {
//   registerUser,
//   loginUser
// } from "../controllers/userAuth.controller.js";

// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);

export default router;

