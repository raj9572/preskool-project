import { poolPromise, sql } from "../config/db.js";

export const FeeSubmissionModel = {

  // CREATE (Submit Fee)
  async create(data) {
    const pool = await poolPromise;

    await pool.request()
      .input("submission_id", sql.VarChar(500), data.submission_id)
      .input("student_id", sql.VarChar(30), data.student_id)
      .input("transaction_id", sql.VarChar(50), data.transaction_id)
      .input("fee_type", sql.VarChar(50), data.fee_type)
      .input("original_amount", sql.Decimal(10,2), data.original_amount)
      .input("discount_id", sql.Int, data.discount_id || null)
      .input("discount_amount", sql.Decimal(10,2), data.discount_amount || 0)
      .input("paid_amount", sql.Decimal(10,2), data.paid_amount)
      .input("payment_mode", sql.VarChar(20), data.payment_mode)
      .input("payment_status", sql.VarChar(20), data.payment_status || "SUCCESS")
      .input("submitted_by", sql.VarChar(50), data.submitted_by)
      .input("submitted_date", sql.Date, data.submitted_date || new Date())
      .input("remarks", sql.NVarChar(sql.MAX), data.remarks || null)
      .query(`
        INSERT INTO dbo.fee_submission
        (submission_id, student_id, transaction_id, fee_type,
         original_amount, discount_id, discount_amount, paid_amount,
         payment_mode, payment_status, submitted_by, submitted_date, remarks)
        VALUES
        (@submission_id, @student_id, @transaction_id, @fee_type,
         @original_amount, @discount_id, @discount_amount, @paid_amount,
         @payment_mode, @payment_status, @submitted_by, @submitted_date, @remarks)
      `);
  },

  // READ ALL
  async getAll() {
    const pool = await poolPromise;
    const result = await pool.request()
      .query(`SELECT * FROM dbo.fee_submission`);
    //   .query(`SELECT * FROM dbo.fee_submission ORDER BY submitted_date DESC`);
    return result.recordset;
  },

  // READ BY STUDENT
  async getByStudent(studentId) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("student_id", sql.VarChar(30), studentId)
      .query(`
        SELECT * FROM dbo.fee_submission
        WHERE student_id = @student_id
        ORDER BY submitted_date DESC
      `);
    return result.recordset;
  },

  // READ BY TRANSACTION
//   async getByTransaction(transactionId) {
//     const pool = await poolPromise;
//     const result = await pool.request()
//       .input("transaction_id", sql.VarChar(50), transactionId)
//       .query(`
//         SELECT * FROM dbo.fee_submission
//         WHERE transaction_id = @transaction_id
//       `);
//     return result.recordset[0];
//   },

  // DELETE (Admin only – optional)
//   async delete(submissionId) {
//     const pool = await poolPromise;
//     await pool.request()
//       .input("submission_id", sql.VarChar(500), submissionId)
//       .query(`
//         DELETE FROM dbo.fee_submission
//         WHERE submission_id = @submission_id
//       `);
//   }
};
