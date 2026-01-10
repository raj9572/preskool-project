import express from "express";
import { FeeSubmissionController } from "../controllers/feeSubmission.controller.js";

const router = express.Router();

router.post("/fee-submission", FeeSubmissionController.create);
router.get("/fee-submission", FeeSubmissionController.getAll);
router.get("/fee-submission/student/:studentId", FeeSubmissionController.getByStudent);
// router.get("/fee-submission/transaction/:transactionId", FeeSubmissionController.getByTransaction);
// router.delete("/fee-submission/:id", FeeSubmissionController.delete);

export default router;
