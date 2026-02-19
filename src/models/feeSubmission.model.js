import { poolPromise, sql } from "../config/db.js";

export const FeeSubmissionModel = {

  // 🔹 CREATE
  async create(data) {
  const pool = await poolPromise;

  const result = await pool.request()
    .input("StudentID", sql.Int, data.studentId)
    .input("TransactionID", sql.VarChar(50), data.transactionId)
    .input("FeeType", sql.VarChar(50), data.feeType)
    .input("OriginalAmount", sql.Decimal(10, 2), data.originalAmount)
    .input("DiscountID", sql.Int, data.discountId || null)
    .input("DiscountAmount", sql.Decimal(10, 2), data.discountAmount || 0)
    .input("PaidAmount", sql.Decimal(10, 2), data.paidAmount)
    .input("PaymentMode", sql.VarChar(20), data.paymentMode)
    .input("PaymentStatus", sql.VarChar(20), data.paymentStatus || "SUCCESS")
    .input("SubmittedBy", sql.VarChar(50), data.submittedBy)
    .input("SubmittedDate", sql.Date, data.submittedDate)
    .input("Remarks", sql.NVarChar(sql.MAX), data.remarks || null)
    .query(`
      INSERT INTO dbo.fee_submission (
        StudentID, TransactionID, FeeType,
        OriginalAmount, DiscountID, DiscountAmount,
        PaidAmount, PaymentMode, PaymentStatus,
        SubmittedBy, SubmittedDate, Remarks
      )
      VALUES (
        @StudentID, @TransactionID, @FeeType,
        @OriginalAmount, @DiscountID, @DiscountAmount,
        @PaidAmount, @PaymentMode, @PaymentStatus,
        @SubmittedBy, @SubmittedDate, @Remarks
      );

      SELECT * FROM dbo.fee_submission 
      WHERE SubmissionID = SCOPE_IDENTITY();
    `);

  return result.recordset[0];
},

  // 🔹 GET ALL
  async getAll() {
    const pool = await poolPromise;
    const result = await pool.request()
      .query(`SELECT * FROM dbo.fee_submission ORDER BY SubmittedDate DESC`);
    return result.recordset;
  },

  // 🔹 GET BY ID
  async getById(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("SubmissionID", sql.VarChar(100), id)
      .query(`SELECT * FROM dbo.fee_submission WHERE SubmissionID = @SubmissionID`);
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

  // 🔹 UPDATE (Dynamic)
  async update(id, data) {
    const pool = await poolPromise;
    const request = pool.request();

    request.input("SubmissionID", sql.VarChar(100), id);

    const fields = [];
    const mapping = {
      studentId: "StudentID",
      transactionId: "TransactionID",
      feeType: "FeeType",
      originalAmount: "OriginalAmount",
      discountId: "DiscountID",
      discountAmount: "DiscountAmount",
      paidAmount: "PaidAmount",
      paymentMode: "PaymentMode",
      paymentStatus: "PaymentStatus",
      submittedBy: "SubmittedBy",
      submittedDate: "SubmittedDate",
      remarks: "Remarks"
    };

    Object.keys(data).forEach(key => {
      if (mapping[key]) {
        fields.push(`${mapping[key]} = @${mapping[key]}`);
        request.input(mapping[key], data[key]);
      }
    });

    if (!fields.length) {
      throw new Error("No fields to update");
    }

    const query = `
      UPDATE dbo.fee_submission
      SET ${fields.join(", ")}
      WHERE SubmissionID = @SubmissionID;

      SELECT * FROM dbo.fee_submission WHERE SubmissionID = @SubmissionID;
    `;

    const result = await request.query(query);
    return result.recordset[0];
  },

  // 🔹 DELETE
  async delete(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("SubmissionID", sql.VarChar(100), id)
      .query(`
        DELETE FROM dbo.fee_submission
        WHERE SubmissionID = @SubmissionID;

        SELECT @@ROWCOUNT AS affectedRows;
      `);

    return result.recordset[0];
  }
};
