import { poolPromise, sql } from "../config/db.js";

export const StudentAttendanceMatrixModel = {

  async getAll() {
    const pool = await poolPromise;
    const result = await pool.request()
      .execute("dbo.usp_GetStudentAttendanceMatrix");
    return result.recordset;
  },

  async getByClass(className, section) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("class", sql.NVarChar, className)
      .input("section", sql.NVarChar, section || null)
      .execute("dbo.usp_GetStudentAttendanceMatrix");
    return result.recordset;
  },

  async getById(studentId) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("studentId", sql.Int, studentId)
      .execute("dbo.usp_GetStudentAttendanceMatrix");
    return result.recordset;
  }
};
