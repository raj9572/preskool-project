import { poolPromise, sql } from "../config/db.js";

export const StaffAttendanceMatrixModel = {

  async getAll() {
    const pool = await poolPromise;
    const result = await pool.request()
      .execute("dbo.usp_GetStaffAttendanceMatrix");

    return result.recordset;
  },

  async getById(staffId) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("staffId", sql.Int, staffId)
      .execute("dbo.usp_GetStaffAttendanceMatrix");

    return result.recordset;
  },

  async getMonthlyStaffSummary(staffId, month) {
    const pool = await poolPromise;

    const result = await pool.request()
      .input("StaffID", sql.Int, staffId)
      .input("Month", sql.NVarChar(7), month)
      .execute("dbo.GetStaffMonthlyAttendanceSummary");

    return result.recordset[0];
  }
};
