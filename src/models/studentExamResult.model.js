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
      .input("Class", sql.Int, data.class || null)
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
  const request = pool.request();

  request.input("ResultId", sql.Int, resultId);

  const fields = [];
  const fieldMap = {
    studentId: { column: "StudentID", type: sql.Int },
    class: { column: "Class", type: sql.NVarChar(20) },
    section: { column: "Section", type: sql.NVarChar(10) },
    examType: { column: "ExamType", type: sql.NVarChar(50) },
    subject: { column: "Subject", type: sql.NVarChar(50) },
    maxMarks: { column: "MaxMarks", type: sql.Int },
    minMarks: { column: "MinMarks", type: sql.Int },
    marksObtained: { column: "MarksObtained", type: sql.Int }
  };

  for (const key in data) {
    if (fieldMap[key] !== undefined) {
      const paramName = key;
      const columnName = fieldMap[key].column;

      request.input(paramName, fieldMap[key].type, data[key]);
      fields.push(`${columnName} = @${paramName}`);
    }
  }

  if (fields.length === 0) {
    return { affectedRows: 0 };
  }

  const query = `
    UPDATE dbo.StudentExamResult
    SET ${fields.join(", ")}
    WHERE ResultId = @ResultId;

    SELECT @@ROWCOUNT AS affectedRows;
  `;

  const result = await request.query(query);

  return result.recordset[0];
}
,

 
  
  
  async delete(resultId) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("ResultId", sql.Int, resultId)
      .query(`
        DELETE FROM dbo.StudentExamResult
        WHERE ResultId = @ResultId
      `);

    return result.rowsAffected[0] > 0;
  },


    async updateMany(results) {
    const pool = await poolPromise;
    const transaction = new sql.Transaction(pool);

    try {
      await transaction.begin();

      for (const item of results) {

        const request = new sql.Request(transaction);

        request.input("ResultId", sql.Int, item.resultId);
        request.input("StudentID", sql.Int, item.result.studentId);
        request.input("Class", sql.NVarChar(20), item.class);
        request.input("Section", sql.NVarChar(10), item.section);
        request.input("ExamType", sql.NVarChar(50), item.examType);
        request.input("Subject", sql.NVarChar(50), item.subject);
        request.input("MaxMarks", sql.Int, item.maxMarks);
        request.input("MinMarks", sql.Int, item.minMarks);
        request.input("MarksObtained", sql.Int, item.result.markObtained);

        await request.query(`
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
          WHERE ResultId = @ResultId
        `);
      }

      await transaction.commit();

      return { message: "Student Exam Results update successful" };

    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async createMany(results) {
  const pool = await poolPromise;
  const transaction = new sql.Transaction(pool);

  try {
    await transaction.begin();

    const request = new sql.Request(transaction);

    for (const item of results) {
      await request
        .input("StudentID", sql.Int, item.studentId)
        .input("Class", sql.NVarChar(20), item.class)
        .input("Section", sql.NVarChar(10), item.section)
        .input("ExamType", sql.NVarChar(50), item.examType)
        .input("Subject", sql.NVarChar(50), item.subject)
        .input("MaxMarks", sql.Int, item.maxMarks)
        .input("MinMarks", sql.Int, item.minMarks)
        .input("MarksObtained", sql.Int, item.marksObtained)
        .query(`
          INSERT INTO dbo.StudentExamResult
          (StudentID, Class, Section, ExamType, Subject, MaxMarks, MinMarks, MarksObtained)
          VALUES
          (@StudentID, @Class, @Section, @ExamType, @Subject, @MaxMarks, @MinMarks, @MarksObtained)
        `);

      request.parameters = {}; // clear parameters for next loop
    }

    await transaction.commit();

    return { success: true };

  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

};
