import { poolPromise, sql } from "../config/db.js";

export const SalaryModel = {

 
  async getAllEmployeeSalaries() {
    const pool = await poolPromise;
    const result = await pool.request()
      .execute("dbo.GetAllEmployeeSalaries");
    return result.recordset;
  },

  
  async updateTeacherSalary(teacherId, salary) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("TeacherID", sql.Int, teacherId)
      .input("Salary", sql.Decimal(10, 2), salary)
      .execute("dbo.UpdateTeacherSalary");

    return result.recordset[0];
  },

  
  async updateStaffSalary(staffId, salary) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("StaffID", sql.Int, staffId)
      .input("Salary", sql.Decimal(10, 2), salary)
      .execute("dbo.UpdateStaffSalary");

    return result.recordset[0];
  }
};
