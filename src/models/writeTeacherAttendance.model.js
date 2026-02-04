import { poolPromise, sql } from "../config/db.js";

const normalizeStatus = (s) => {
    const v = s?.trim().toUpperCase();
    return ["A", "P", "L", "H"].includes(v) ? v : "P";
};

const colNameFor = (date) =>
  date.toISOString().slice(0, 10);

export const WriteTeacherAttendanceModel = {

  async writeForDate(date, list) {
    const isoCol = colNameFor(date);
    const pool = await poolPromise;
    const conn = await pool.connect();

    // Add column if missing
    await conn.request().query(`
      IF COL_LENGTH('dbo.TeacherAttendance', '${isoCol}') IS NULL
      BEGIN
        ALTER TABLE dbo.TeacherAttendance ADD [${isoCol}] CHAR(1) NULL;
      END
    `);

    const tx = new sql.Transaction(conn);
    await tx.begin();

    try {
      for (const rec of list) {
        await new sql.Request(tx)
          .input("TeacherID", sql.Int, rec.teacherID)
          .input("Status", sql.Char(1), normalizeStatus(rec.status))
          .query(`
            UPDATE dbo.TeacherAttendance
            SET [${isoCol}] = @Status
            WHERE TeacherID = @TeacherID
          `);
      }

      await tx.commit();
    } catch (err) {
      await tx.rollback();
      throw err;
    }
  },

  async getForDate(date) {
    const isoCol = colNameFor(date);
    const pool = await poolPromise;

    const result = await pool.request().query(`
      SELECT TeacherID, [Name], [${isoCol}] AS Status
      FROM dbo.TeacherAttendance
    `);

    return result.recordset;
  }
};
