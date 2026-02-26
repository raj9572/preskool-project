import { poolPromise, sql } from "../config/db.js";
import { brevoClient } from "../config/brevo.js";

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
  },

  async sendTodayAbsentEmails () {
    try {
      
    const pool = await poolPromise;
     // ✅ Generate today's column name in JS
    const today = new Date().toISOString().split("T")[0]; 
    // Example: 2026-02-25

    const query = `
      SELECT TOP 150 sa.StudentID, sa.Name, s.ParentEmail
      FROM StudentAttendence sa
      JOIN Students s ON sa.StudentID = s.StudentID
      WHERE sa.[${today}] = 'A'
      AND NOT EXISTS (
          SELECT 1 FROM EmailNotificationLog l
          WHERE l.StudentID = sa.StudentID
          AND l.Type = 'ABSENT'
          AND l.SentDate = CAST(GETDATE() AS DATE)
      )
    `;

    const result = await pool.request().query(query);

    const students = result.recordset;

    if (!students.length) {
      console.log("No absent students today.");
      return { success: true, message: "No absent students today." };
    }

    // ✅ Send Email
    await brevoClient.transactionalEmails.sendTransacEmail({
      sender: {
        email: "noreply@webbuild.shop",
        name: "Preskool",
      },
      subject: "Attendance Alert",
      htmlContent: `
        <p>Dear Parent,</p>
        <p>Your child was absent today ${today}.</p>
      `,
      to: students.map((s) => ({
        email: s.ParentEmail,
        name: s.Name,
      })),
    });

    // ✅ Insert log
    for (const student of students) {
      await pool.request().query(`
        INSERT INTO EmailNotificationLog (StudentID, Type, SentDate)
        VALUES (${student.StudentID}, 'ABSENT', CAST(GETDATE() AS DATE))
      `);
    }

    return { success: true, count: students.length };

}
     catch (err) {
      console.error("Attendance Email Error:", err.message);
        return { success: false, error: err.message };
    }
}
}
