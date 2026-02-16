import { poolPromise, sql } from "../config/db.js";

export const ExpenseModel = {

  async create(data) {
    const pool = await poolPromise;

    const result = await pool.request()
      .input("ExpenseDate", sql.Date, data.expenseDate)
      .input("ExpenseCategory", sql.NVarChar(100), data.expenseCategory)
      .input("ExpenseTitle", sql.NVarChar(200), data.expenseTitle)
      .input("ExpenseDescription", sql.NVarChar(sql.MAX), data.expenseDescription || null)
      .input("Amount", sql.Decimal(12, 2), data.amount)
      .input("PaymentMode", sql.NVarChar(50), data.paymentMode || null)
      .input("PaymentStatus", sql.NVarChar(50), data.paymentStatus || "PAID")
      .input("ReferenceNumber", sql.NVarChar(100), data.referenceNumber || null)
      .input("PaidTo", sql.NVarChar(200), data.paidTo || null)
      .input("CreatedBy", sql.NVarChar(100), data.createdBy || null)
      .query(`
        INSERT INTO dbo.Expenses
        (ExpenseDate, ExpenseCategory, ExpenseTitle, ExpenseDescription, Amount,
         PaymentMode, PaymentStatus, ReferenceNumber, PaidTo, CreatedBy)
        VALUES
        (@ExpenseDate, @ExpenseCategory, @ExpenseTitle, @ExpenseDescription, @Amount,
         @PaymentMode, @PaymentStatus, @ReferenceNumber, @PaidTo, @CreatedBy);

        SELECT SCOPE_IDENTITY() AS ExpenseId;
      `);

    return result.recordset[0];
  },

  async getAll() {
    const pool = await poolPromise;
    const result = await pool.request()
      .query(`SELECT * FROM dbo.Expenses ORDER BY ExpenseDate DESC`);
    return result.recordset;
  },



  async update(id, data) {
    const pool = await poolPromise;

    const result = await pool.request()
      .input("ExpenseId", sql.Int, id)
      .input("ExpenseDate", sql.Date, data.expenseDate || null)
      .input("ExpenseCategory", sql.NVarChar(100), data.expenseCategory || null)
      .input("ExpenseTitle", sql.NVarChar(200), data.expenseTitle || null)
      .input("ExpenseDescription", sql.NVarChar(sql.MAX), data.expenseDescription || null)
      .input("Amount", sql.Decimal(12, 2), data.amount || null)
      .input("PaymentMode", sql.NVarChar(50), data.paymentMode || null)
      .input("PaymentStatus", sql.NVarChar(50), data.paymentStatus || null)
      .input("ReferenceNumber", sql.NVarChar(100), data.referenceNumber || null)
      .input("PaidTo", sql.NVarChar(200), data.paidTo || null)
      .query(`
        UPDATE dbo.Expenses
        SET
          ExpenseDate = COALESCE(@ExpenseDate, ExpenseDate),
          ExpenseCategory = COALESCE(@ExpenseCategory, ExpenseCategory),
          ExpenseTitle = COALESCE(@ExpenseTitle, ExpenseTitle),
          ExpenseDescription = COALESCE(@ExpenseDescription, ExpenseDescription),
          Amount = COALESCE(@Amount, Amount),
          PaymentMode = COALESCE(@PaymentMode, PaymentMode),
          PaymentStatus = COALESCE(@PaymentStatus, PaymentStatus),
          ReferenceNumber = COALESCE(@ReferenceNumber, ReferenceNumber),
          PaidTo = COALESCE(@PaidTo, PaidTo),
          UpdatedAt = GETDATE()
        WHERE ExpenseId = @ExpenseId;

        SELECT @@ROWCOUNT AS affectedRows;
      `);

    return result.recordset[0];
  },

  async delete(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("ExpenseId", sql.Int, id)
      .query(`
        DELETE FROM dbo.Expenses WHERE ExpenseId = @ExpenseId;
        SELECT @@ROWCOUNT AS affectedRows;
      `);

    return result.recordset[0];
  }

};
