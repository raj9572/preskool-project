import { poolPromise, sql } from "../config/db.js";

export const StudentExamResultModel = {

  // CREATE
  async create(data) {
    const pool = await poolPromise;

    const result = await pool.request()
      .input("StudentId", sql.NVarChar(50), data.StudentId)
      .input("Class", sql.NVarChar(20), data.Class)
      .input("Section", sql.NVarChar(10), data.Section)
      .input("ExamType", sql.NVarChar(50), data.ExamType)
      .input("Subject", sql.NVarChar(50), data.Subject)
      .input("MaxMarks", sql.Int, data.MaxMarks)
      .input("MinMarks", sql.Int, data.MinMarks)
      .input("MarksObtained", sql.Int, data.MarksObtained)
      .query(`
        INSERT INTO dbo.StudentExamResult
        (StudentId, Class, Section, ExamType, Subject, MaxMarks, MinMarks, MarksObtained)
        VALUES
        (@StudentId, @Class, @Section, @ExamType, @Subject, @MaxMarks, @MinMarks, @MarksObtained);

        SELECT SCOPE_IDENTITY() AS ResultId;
      `);

    return result.recordset[0]; // { ResultId: X }
  },

  // READ ALL
  async getAll() {
    const pool = await poolPromise;
    const result = await pool.request()
      .query(`SELECT * FROM dbo.StudentExamResult ORDER BY ResultId DESC`);
    return result.recordset;
  },

  // READ BY ID
  async getById(resultId) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("ResultId", sql.Int, resultId)
      .query(`SELECT * FROM dbo.StudentExamResult WHERE ResultId=@ResultId`);
    return result.recordset[0];
  },

  // ✅ FILTER (useful for ERP)
  async getByStudent(studentId) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("StudentId", sql.NVarChar(50), studentId)
      .query(`
        SELECT * FROM dbo.StudentExamResult
        WHERE StudentId=@StudentId
        ORDER BY ResultId DESC
      `);
    return result.recordset;
  },

  // UPDATE
  async update(resultId, data) {
    const pool = await poolPromise;
    await pool.request()
      .input("ResultId", sql.Int, resultId)
      .input("StudentId", sql.NVarChar(50), data.StudentId)
      .input("Class", sql.NVarChar(20), data.Class)
      .input("Section", sql.NVarChar(10), data.Section)
      .input("ExamType", sql.NVarChar(50), data.ExamType)
      .input("Subject", sql.NVarChar(50), data.Subject)
      .input("MaxMarks", sql.Int, data.MaxMarks)
      .input("MinMarks", sql.Int, data.MinMarks)
      .input("MarksObtained", sql.Int, data.MarksObtained)
      .query(`
        UPDATE dbo.StudentExamResult
        SET StudentId=@StudentId,
            Class=@Class,
            Section=@Section,
            ExamType=@ExamType,
            Subject=@Subject,
            MaxMarks=@MaxMarks,
            MinMarks=@MinMarks,
            MarksObtained=@MarksObtained
        WHERE ResultId=@ResultId
      `);
  },

  // DELETE
  async delete(resultId) {
    const pool = await poolPromise;
    await pool.request()
      .input("ResultId", sql.Int, resultId)
      .query(`DELETE FROM dbo.StudentExamResult WHERE ResultId=@ResultId`);
  }
};
