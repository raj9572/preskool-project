import { poolPromise, sql } from "../config/db.js";

export const FeeSubmissionModel = {

  async getAll() {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT * FROM dbo.fee_submission
      ORDER BY SubmissionID DESC
    `);
    return result.recordset;
  },

  async getById(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("SubmissionID", sql.Int, id)
      .query(`
        SELECT * FROM dbo.fee_submission
        WHERE SubmissionID = @SubmissionID
      `);
    return result.recordset[0];
  },

  async getByStudentId(studentId) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("StudentID", sql.Int, studentId)
      .query(`
        SELECT * FROM dbo.fee_submission
        WHERE StudentID = @StudentID
        ORDER BY SubmittedDate DESC
      `);
    return result.recordset;
  },

  async create(data) {
    const pool = await poolPromise;

    const result = await pool.request()
      .input("StudentID", sql.Int, data.studentId)
      .input("TransactionID", sql.NVarChar, data.transactionId)
      .input("FeeType", sql.NVarChar, data.feeType)
      .input("OriginalAmount", sql.Decimal(10,2), data.originalAmount)
      .input("DiscountID", sql.Int, data.discountId || null)
      .input("DiscountAmount", sql.Decimal(10,2), data.discountAmount || 0)
      .input("PaidAmount", sql.Decimal(10,2), data.paidAmount)
      .input("PaymentMode", sql.NVarChar, data.paymentMode)
      .input("PaymentStatus", sql.NVarChar, data.paymentStatus || "SUCCESS")
      .input("SubmittedBy", sql.NVarChar, data.submittedBy)
      .input("Remarks", sql.NVarChar, data.remarks)
      .query(`
        INSERT INTO dbo.fee_submission
        (StudentID, TransactionID, FeeType, OriginalAmount,
         DiscountID, DiscountAmount, PaidAmount,
         PaymentMode, PaymentStatus, SubmittedBy, Remarks)
        VALUES
        (@StudentID, @TransactionID, @FeeType, @OriginalAmount,
         @DiscountID, @DiscountAmount, @PaidAmount,
         @PaymentMode, @PaymentStatus, @SubmittedBy, @Remarks);

        SELECT SCOPE_IDENTITY() AS SubmissionID;
      `);

    return result.recordset[0];
  },
  async getByTransaction(transactionId) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input("TransactionID", sql.VarChar(50), transactionId)
    .query(`
      SELECT * FROM dbo.fee_submission
      WHERE TransactionID = @TransactionID
    `);
  return result.recordset[0];
  },

  async delete(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("SubmissionID", sql.Int, id)
      .query(`
        DELETE FROM dbo.fee_submission
        WHERE SubmissionID = @SubmissionID
      `);
    return result.rowsAffected[0] > 0;
  }
};



