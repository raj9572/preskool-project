import { poolPromise, sql } from "../config/db.js";

export const StudentExamResultModel = {

 
  async getAll() {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT * FROM dbo.StudentExamResult
      ORDER BY ResultId DESC
    `);
    return result.recordset;
  },

  
  async getById(resultId) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("ResultId", sql.Int, resultId)
      .query(`
        SELECT * FROM dbo.StudentExamResult
        WHERE ResultId = @ResultId
      `);

    return result.recordset[0];
  },

 
  async getByStudentId(studentId) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input("StudentID", sql.Int, studentId)
    .query(`
      SELECT *
      FROM dbo.StudentExamResult
      WHERE StudentID = @StudentID
      ORDER BY ResultId DESC
    `);

  return result.recordset;
},


 
  async create(data) {
    const pool = await poolPromise;

    const result = await pool.request()
      .input("StudentID", sql.Int, data.studentId)
      .input("Class", sql.NVarChar(20), data.class || null)
      .input("Section", sql.NVarChar(10), data.section || null)
      .input("ExamType", sql.NVarChar(50), data.examType || null)
      .input("Subject", sql.NVarChar(50), data.subject || null)
      .input("MaxMarks", sql.Int, data.maxMarks || null)
      .input("MinMarks", sql.Int, data.minMarks || null)
      .input("MarksObtained", sql.Int, data.marksObtained || null)
      .query(`
        INSERT INTO dbo.StudentExamResult
        (StudentID, Class, Section, ExamType, Subject, MaxMarks, MinMarks, MarksObtained)
        VALUES
        (@StudentID, @Class, @Section, @ExamType, @Subject, @MaxMarks, @MinMarks, @MarksObtained);

        SELECT SCOPE_IDENTITY() AS ResultId;
      `);

    return result.recordset[0];
  },

  
  async update(resultId, data) {
    const pool = await poolPromise;

    const result = await pool.request()
      .input("ResultId", sql.Int, resultId)
      .input("StudentID", sql.Int, data.studentId)
      .input("Class", sql.NVarChar(20), data.class || null)
      .input("Section", sql.NVarChar(10), data.section || null)
      .input("ExamType", sql.NVarChar(50), data.examType || null)
      .input("Subject", sql.NVarChar(50), data.subject || null)
      .input("MaxMarks", sql.Int, data.maxMarks || null)
      .input("MinMarks", sql.Int, data.minMarks || null)
      .input("MarksObtained", sql.Int, data.marksObtained || null)
      .query(`
        UPDATE dbo.StudentExamResult
        SET
          StudentID = @StudentID,
          Class = @Class,
          Section = @Section,
          ExamType = @ExamType,
          Subject = @Subject,
          MaxMarks = @MaxMarks,
          MinMarks = @MinMarks,
          MarksObtained = @MarksObtained
        WHERE ResultId = @ResultId;

        SELECT @@ROWCOUNT AS affectedRows;
      `);

    return result.recordset[0];
  },
  
  
  async delete(resultId) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("ResultId", sql.Int, resultId)
      .query(`
        DELETE FROM dbo.StudentExamResult
        WHERE ResultId = @ResultId
      `);

    return result.rowsAffected[0] > 0;
  }
};
