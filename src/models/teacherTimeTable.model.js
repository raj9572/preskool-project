import { poolPromise, sql } from "../config/db.js";

function parseTime(timeString) {
  if (!timeString) return null;

  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, seconds || 0, 0);
  return date;
}

export const TeacherTimeTableModel = {

  async create(data) {
    const pool = await poolPromise;

    const result = await pool.request()
      .input("TeacherID", sql.Int, data.teacherId)
      .input("DayOfWeek", sql.NVarChar, data.dayOfWeek)
      .input("PeriodNo", sql.Int, data.periodNo)
      .input("StartTime", sql.VarChar(8), data.startTime)
      .input("EndTime", sql.VarChar(8), data.endTime)
      .input("ClassID", sql.NVarChar, data.classId)
      .input("SectionID", sql.NVarChar, data.sectionId)
      .input("SubjectID", sql.Int, data.subjectId)
      .input("RoomID", sql.Int, data.roomId)
      .input("IsActive", sql.Bit, data.isActive ? 1 : 0)
      .query(`
        INSERT INTO TeacherTimeTable
        (TeacherID, DayOfWeek, PeriodNo, StartTime, EndTime, ClassID, SectionID, SubjectID, RoomID, IsActive)
        OUTPUT INSERTED.*
        VALUES
        (@TeacherID, @DayOfWeek, @PeriodNo, @StartTime, @EndTime, @ClassID, @SectionID, @SubjectID, @RoomID, @IsActive)
      `);

    return result.recordset[0];
  },

  async getAll() {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT t.*, tr.FullName
      FROM TeacherTimeTable t
      JOIN Teachers tr ON tr.TeacherID = t.TeacherID
      ORDER BY DayOfWeek, PeriodNo
    `);
    return result.recordset;
  },

  async getById(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("TimeTableID", sql.Int, id)
      .query(`SELECT * FROM TeacherTimeTable WHERE TimeTableID = @TimeTableID`);
    return result.recordset[0];
  },

  async getByTeacher(teacherId) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("TeacherID", sql.Int, teacherId)
      .query(`
        SELECT *
        FROM TeacherTimeTable
        WHERE TeacherID = @TeacherID
        ORDER BY DayOfWeek, PeriodNo
      `);
    return result.recordset;
  },

  async update(id, data) {
     const pool = await poolPromise;
    const request = pool.request();

    request.input("TimeTableID", sql.Int, id);

    const allowedFields = {
      dayOfWeek: { column: "DayOfWeek", type: sql.NVarChar(20) },
      periodNo: { column: "PeriodNo", type: sql.Int },
      startTime: { column: "StartTime", type: sql.Time },
      endTime: { column: "EndTime", type: sql.Time },
      classId: { column: "ClassID", type: sql.VarChar(10) },
      sectionId: { column: "SectionID", type: sql.VarChar(10) },
      subjectId: { column: "SubjectID", type: sql.Int },
      roomId: { column: "RoomID", type: sql.Int },
      isActive: { column: "IsActive", type: sql.Bit }
    };

    const updates = [];

    for (const key in data) {
      if (allowedFields[key]) {
        const field = allowedFields[key];
        updates.push(`${field.column} = @${field.column}`);
        request.input(field.column, field.type, data[key]);
      }
    }

    if (updates.length === 0) {
      throw new Error("No valid fields provided for update.");
    }

    const query = `
      UPDATE dbo.TeacherTimeTable
      SET ${updates.join(", ")}
      WHERE TimeTableID = @TimeTableID
    `;

    await request.query(query);

    return { message: "Updated successfully" };
  },

  async delete(id) {
    const pool = await poolPromise;
    await pool.request()
      .input("TimeTableID", sql.Int, id)
      .query(`DELETE FROM TeacherTimeTable WHERE TimeTableID = @TimeTableID`);
  }
};
