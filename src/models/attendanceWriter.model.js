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
        name: "Preschool",
      },
      subject: "Attendance Alert",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          
          <p><strong>Dear Parent/Guardian 👋,</strong></p>

          <p>🌸 Greetings from the School Administration! 🌸</p>

          <p>
            This is to inform you that your child was marked 
            <strong>absent today 📅 ${today}</strong>, 
            as per our attendance records.
          </p>

          <p>
            📚 <strong>Regular attendance is important</strong> for your child’s learning 
            and overall development.
          </p>

          <p>
            If the absence was due to a valid reason 🤒🚑✈️, 
            kindly inform the class teacher or submit the leave details at your convenience.
          </p>

          <p>
            📞 For any clarification or support, please feel free to contact the school office.
          </p>

          <p>🙏 Thank you for your cooperation and support.</p>

          <br/>

          <p>
            <strong>Warm regards 🤝,</strong><br/>
            School Administration Team<br/>
            🏫 Preschool
          </p>

        </div>
      `,
      to: students.map((s) => ({
        email: s.ParentEmail,
        name: s.FullName,
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
