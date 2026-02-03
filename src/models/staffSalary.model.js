import { poolPromise, sql } from "../config/db.js";

export const StaffSalaryModel = {

  async create(data) {
    const pool = await poolPromise;

    const netSalary =
      Number(data.basicSalary) +
      Number(data.allowances || 0) -
      Number(data.deductions || 0);

    const result = await pool.request()
      .input("StaffID", sql.Int, data.staffId)
      .input("BasicSalary", sql.Decimal(10, 2), data.basicSalary)
      .input("Allowances", sql.Decimal(10, 2), data.allowances || 0)
      .input("Deductions", sql.Decimal(10, 2), data.deductions || 0)
      .input("NetSalary", sql.Decimal(10, 2), netSalary)
      .input("SalaryMonth", sql.NVarChar, data.salaryMonth)
      .input("PaymentDate", sql.Date, data.paymentDate || null)
      .input("IsPaid", sql.Bit, data.isPaid ? 1 : 0)
      .query(`
        INSERT INTO StaffSalary
        (StaffID, BasicSalary, Allowances, Deductions, NetSalary, SalaryMonth, PaymentDate, IsPaid)
        OUTPUT INSERTED.*
        VALUES
        (@StaffID, @BasicSalary, @Allowances, @Deductions, @NetSalary, @SalaryMonth, @PaymentDate, @IsPaid)
      `);

    return result.recordset[0];
  },

  async getAll() {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT ss.*, s.FullName
      FROM StaffSalary ss
      JOIN Staffs s ON s.StaffID = ss.StaffID
      ORDER BY ss.CreatedAt DESC
    `);
    return result.recordset;
  },

  async getById(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("SalaryID", sql.Int, id)
      .query(`SELECT * FROM StaffSalary WHERE SalaryID = @SalaryID`);
    return result.recordset[0];
  },

  async getByStaffId(staffId) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("StaffID", sql.Int, staffId)
      .query(`
        SELECT *
        FROM StaffSalary
        WHERE StaffID = @StaffID
        ORDER BY SalaryMonth DESC
      `);
    return result.recordset;
  },

  async update(id, data) {
    const pool = await poolPromise;

    const netSalary =
      Number(data.basicSalary) +
      Number(data.allowances || 0) -
      Number(data.deductions || 0);

    const result = await pool.request()
      .input("SalaryID", sql.Int, id)
      .input("BasicSalary", sql.Decimal(10, 2), data.basicSalary)
      .input("Allowances", sql.Decimal(10, 2), data.allowances || 0)
      .input("Deductions", sql.Decimal(10, 2), data.deductions || 0)
      .input("NetSalary", sql.Decimal(10, 2), netSalary)
      .input("PaymentDate", sql.Date, data.paymentDate || null)
      .input("IsPaid", sql.Bit, data.isPaid ? 1 : 0)
      .query(`
        UPDATE StaffSalary
        SET
          BasicSalary = @BasicSalary,
          Allowances = @Allowances,
          Deductions = @Deductions,
          NetSalary = @NetSalary,
          PaymentDate = @PaymentDate,
          IsPaid = @IsPaid
        WHERE SalaryID = @SalaryID;

        SELECT * FROM StaffSalary WHERE SalaryID = @SalaryID;
      `);

    return result.recordset[0];
  },

  async delete(id) {
    const pool = await poolPromise;
    await pool.request()
      .input("SalaryID", sql.Int, id)
      .query(`DELETE FROM StaffSalary WHERE SalaryID = @SalaryID`);
  }
};
