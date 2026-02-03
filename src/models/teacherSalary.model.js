import { poolPromise, sql } from "../config/db.js";

export const TeacherSalaryModel = {

  // CREATE
  async create(data) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("TeacherID", sql.Int, data.teacherId)
      .input("BasicSalary", sql.Decimal(10,2), data.basicSalary)
      .input("Allowances", sql.Decimal(10,2), data.allowances || 0)
      .input("Deductions", sql.Decimal(10,2), data.deductions || 0)
      .input("SalaryMonth", sql.VarChar(7), data.salaryMonth)
      .input("PaymentDate", sql.Date, data.paymentDate || null)
      .input("IsPaid", sql.Bit, data.isPaid || false)
      .query(`
        INSERT INTO dbo.TeacherSalary
        (TeacherID, BasicSalary, Allowances, Deductions, SalaryMonth, PaymentDate, IsPaid)
        VALUES
        (@TeacherID, @BasicSalary, @Allowances, @Deductions, @SalaryMonth, @PaymentDate, @IsPaid);

        SELECT SCOPE_IDENTITY() AS SalaryID;
      `);

    return result.recordset[0];
  },

  // GET ALL
  async getAll() {
    const pool = await poolPromise;
    const result = await pool.request()
      .query(`SELECT * FROM dbo.TeacherSalary ORDER BY SalaryMonth DESC`);
    return result.recordset;
  },

  // GET BY ID
  async getById(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("SalaryID", sql.Int, id)
      .query(`SELECT * FROM dbo.TeacherSalary WHERE SalaryID = @SalaryID`);
    return result.recordset[0];
  },

  // GET BY TEACHER
  async getByTeacher(teacherId) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("TeacherID", sql.Int, teacherId)
      .query(`
        SELECT * FROM dbo.TeacherSalary
        WHERE TeacherID = @TeacherID
        ORDER BY SalaryMonth DESC
      `);
    return result.recordset;
  },

  // UPDATE
  async update(id, data) {
    const pool = await poolPromise;
    await pool.request()
      .input("SalaryID", sql.Int, id)
      .input("BasicSalary", sql.Decimal(10,2), data.basicSalary)
      .input("Allowances", sql.Decimal(10,2), data.allowances)
      .input("Deductions", sql.Decimal(10,2), data.deductions)
      .input("PaymentDate", sql.Date, data.paymentDate || null)
      .input("IsPaid", sql.Bit, data.isPaid)
      .query(`
        UPDATE dbo.TeacherSalary
        SET BasicSalary = @BasicSalary,
            Allowances = @Allowances,
            Deductions = @Deductions,
            PaymentDate = @PaymentDate,
            IsPaid = @IsPaid
        WHERE SalaryID = @SalaryID
      `);

    return true;
  },

  // DELETE (manual only)
  async delete(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("SalaryID", sql.Int, id)
      .query(`DELETE FROM dbo.TeacherSalary WHERE SalaryID = @SalaryID`);
    return result.rowsAffected[0] > 0;
  }
};
