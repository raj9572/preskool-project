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
  }
};
