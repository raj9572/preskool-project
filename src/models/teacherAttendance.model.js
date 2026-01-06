import { poolPromise, sql } from "../config/db.js";

export const TeacherAttendanceModel = {

  // Get today's attendance (dynamic date column)
  async getToday() {
    const pool = await poolPromise;

    const today = new Date().toISOString().slice(0, 10); // yyyy-MM-dd

    const result = await pool.request().query(`
      SELECT TeacherID, [Name], [${today}] AS Status
      FROM dbo.TeacherAttendance
      ORDER BY [Name]
    `);

    return result.recordset;
  }
};
