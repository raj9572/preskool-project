import { poolPromise, sql } from "../config/db.js";

export const AttendanceWriterModel = {

  async setForDate(date, items) {
    const pool = await poolPromise;

    const table = new sql.Table("dbo.AttendanceUpdate");
    table.columns.add("StudentID", sql.Int);
    table.columns.add("Status", sql.Char(1));

    for (const it of items) {
      let status = (it.status || "P").toUpperCase().trim();
      if (!["A", "P", "H"].includes(status)) status = "P";
      table.rows.add(it.studentID, status);
    }

    const result = await pool.request()
      .input("Date", sql.Date, date)
      .input("Items", table)
      .execute("dbo.SetAttendanceForDate");

    return result.recordset[0]; // { UpdatedCount, MissingIDs }
  }
};
