import { poolPromise, sql } from "../config/db.js";

export const AttendanceCountModel = {

  async getToday() {
    const pool = await poolPromise;
    const result = await pool.request()
      .execute("dbo.usp_GetAttendance_ByEntity");
    return result.recordset;
  },

  async getByDate(date) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("date", sql.Date, date)
      .execute("dbo.usp_GetAttendance_ByEntity");
    return result.recordset;
  }
};
