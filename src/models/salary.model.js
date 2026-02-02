import { poolPromise, sql } from "../config/db.js";

export const SalaryModel = {

 
  async getAllEmployeeSalaries() {
    const pool = await poolPromise;
    const result = await pool.request()
      .execute("dbo.GetAllEmployeeSalaries");
    return result.recordset;
  },

   async getTeacherSalaryById(teacherId) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("TeacherID", sql.Int, teacherId)
      .execute("dbo.GetTeacherSalaryById");

    return result.recordset[0];
  },


  async getStaffSalaryById(staffId) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("StaffID", sql.Int, staffId)
      .execute("dbo.GetStaffSalaryById");

    return result.recordset[0];
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
