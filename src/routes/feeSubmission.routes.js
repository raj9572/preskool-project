import express from "express";
import { FeeSubmissionController } from "../controllers/feeSubmission.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { poolPromise, sql } from "../config/db.js";

const router = express.Router();


router.use(protect);


router.post("/fee-submissions", FeeSubmissionController.create);
router.get("/fee-submissions", FeeSubmissionController.getAll);
router.get("/fee-submissions/:id", FeeSubmissionController.getById);
router.get("/fee-submissions/student/:studentId", FeeSubmissionController.getByStudent);
router.put("/fee-submissions/:id", FeeSubmissionController.update);
router.delete("/fee-submissions/:id", FeeSubmissionController.delete);

router.get("/fee-collection-by-date", async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date is required"
      });
    }

    const pool = await poolPromise;

    const result = await pool.request()
      .input("Date", sql.Date, date)
      .query(`
        SELECT 
          SubmissionID,
          StudentID,
          TransactionID,
          FeeType,
          OriginalAmount,
          DiscountID,
          DiscountAmount,
          PaidAmount,
          PaymentMode,
          PaymentStatus,
          SubmittedBy,
          SubmittedDate,
          Remarks
        FROM fee_submission
        WHERE PaymentStatus = 'SUCCESS'
        AND CAST(CreatedAt AS DATE) = @Date
        ORDER BY CreatedAt DESC
      `);

    res.json({
      success: true,
      data: result.recordset
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});
// router.get("/fee-submissions", FeeSubmissionController.getAll);
// router.post("/fee-submissions", FeeSubmissionController.create);
// router.delete("/fee-submissions/:id", FeeSubmissionController.delete);
// router.get("/fee-submissions/transaction/:transactionId", FeeSubmissionController.getByTransaction);


export default router;
