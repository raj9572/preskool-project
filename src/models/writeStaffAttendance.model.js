import { poolPromise, sql } from "../config/db.js";

const normalizeStatus = (s) => {
  const v = (s || "P").trim().toUpperCase();
  return v === "A" ? "A" : "P";
};

const colNameFor = (date) =>
  date.toISOString().slice(0, 10); // yyyy-MM-dd

export const WriteStaffAttendanceModel = {

  async writeForDate(date, items) {
    const col = colNameFor(date);
    const pool = await poolPromise;
    const conn = await pool.connect();

    // Ensure column exists
    await conn.request().query(`
      IF COL_LENGTH('dbo.StaffAttendance', '${col}') IS NULL
      BEGIN
        ALTER TABLE dbo.StaffAttendance ADD [${col}] NVARCHAR(2) NULL;
      END
    `);

    for (const it of items || []) {
      await conn.request()
        .input("StaffID", sql.Int, it.staffID)
        .input("Status", sql.NVarChar(2), normalizeStatus(it.status))
        .query(`
          UPDATE dbo.StaffAttendance
          SET [${col}] = @Status
          WHERE StaffID = @StaffID
        `);
    }
  },

  async getForDate(date) {
    const col = colNameFor(date);
    const pool = await poolPromise;

    const result = await pool.request().query(`
      SELECT StaffID, [Name], [${col}] AS Status
      FROM dbo.StaffAttendance
      ORDER BY StaffID
    `);

    return result.recordset;
  }
};
