import express from "express";
import { FeeSubmissionController } from "../controllers/feeSubmission.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();


router.use(protect);


router.get("/fee-submissions", FeeSubmissionController.getAll);
router.get("/fee-submissions/student/:studentId", FeeSubmissionController.getByStudent);
router.post("/fee-submissions", FeeSubmissionController.create);
router.delete("/fee-submissions/:id", FeeSubmissionController.delete);
router.get("/fee-submissions/transaction/:transactionId", FeeSubmissionController.getByTransaction);


export default router;
