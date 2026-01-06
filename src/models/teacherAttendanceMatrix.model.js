import { poolPromise, sql } from "../config/db.js";

export const TeacherAttendanceMatrixModel = {

  async getAll() {
    const pool = await poolPromise;

    const result = await pool.request()
      .execute("dbo.usp_GetTeacherAttendanceMatrix");

    return result.recordset;
  },

  async getById(teacherId) {
    const pool = await poolPromise;

    const result = await pool.request()
      .input("teacherId", sql.Int, teacherId)
      .execute("dbo.usp_GetTeacherAttendanceMatrix");

    return result.recordset;
  }
};
