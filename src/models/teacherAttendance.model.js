import { poolPromise, sql } from "../config/db.js";

export const TeacherAttendanceModel = {

  async getToday() {
    const todayCol = new Date().toISOString().slice(0, 10); // yyyy-MM-dd
    const pool = await poolPromise;

    const result = await pool.request().query(`
      SELECT TeacherID, [Name], [${todayCol}] AS Status
      FROM dbo.TeacherAttendance
      ORDER BY [Name]
    `);

    return result.recordset;
  }
};
